import { bind, subprocess, Variable } from "astal";
import { BarElement, BarIcon, BarLabel } from "../../util";

const availableLayouts: Variable<string[]> = Variable([]);
const currentLayout = Variable(0);

const proc = subprocess("niri msg --json event-stream");
proc.connect("stdout", (_, out) => {
  const msg = JSON.parse(out);
  if (msg.KeyboardLayoutsChanged) {
    availableLayouts.set(msg.KeyboardLayoutsChanged.keyboard_layouts.names);
  }
  if (msg.KeyboardLayoutSwitched) {
    currentLayout.set(msg.KeyboardLayoutSwitched.idx);
  }
});

export default function NiriLanguage() {
  const IconLabel = BarIcon({
    icon: "input-keyboard-symbolic",
    className: "nirilanguage",
  });
  const LanguageLabel = BarLabel({
    label: bind(
      Variable.derive(
        [availableLayouts, currentLayout],
        (layouts, layoutIndex) => layouts[layoutIndex] ?? "no layout detected",
      ),
    ),
    transform: (val) => {
      if (val === "") {
        return "";
      }
      if (val.toLowerCase().includes("german")) {
        return "de";
      }
      if (val.toLowerCase().includes("englis")) {
        return "en";
      }
      return val;
    },
    className: "language",
  });
  return {
    component: (
      <box>
        {IconLabel}
        {LanguageLabel}
      </box>
    ),
    class: "NiriLanguage",
  };
}
