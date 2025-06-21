import { bind, subprocess, Variable } from "astal";
import { BarIcon, BarLabel, makeElement } from "../../util";
import niri from "../../../../util/niri";

export default function NiriLanguage() {
  const IconLabel = BarIcon({
    icon: "input-keyboard-symbolic",
    className: "nirilanguage",
  });
  const LanguageLabel = BarLabel({
    label: bind(niri, "keyboardLayouts").as((kb) => kb.names[kb.current_idx]),
    transform: (val) => {
      console.log("changed in ags", val);
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

  return makeElement({
    type: "labeledIcon",
    name: "NiriLanguage",
    icon: IconLabel,
    label: LanguageLabel,
  });
}
