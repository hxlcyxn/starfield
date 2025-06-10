import { bind, Variable } from "astal";
import { App, Gtk } from "astal/gtk3";
import AstalBattery from "gi://AstalBattery";
import { BarIcon, BarLabel, makeElement } from "../../util";

const battery = AstalBattery.get_default();

export default function Battery(): Gtk.Widget {
  const percentage = bind(battery, "percentage").as((num) =>
    Math.round(num * 100),
  );
  const charging = bind(battery, "charging");
  const icon = bind(battery, "batteryIconName");
  const state = bind(
    Variable.derive([percentage, charging], (percentage, charging) => {
      if (charging) {
        return "charging";
      }
      if (percentage < 20) {
        return "low";
      }
      return "normal";
    }),
  );

  const IconLabel = BarIcon({
    className: "battery",
    dynamicClassVar: state,
    dynamicClassTransform: (val: string) => val,
    icon: icon,
  });
  const PercentageLabel = BarLabel({
    className: "battery",
    label: percentage,
    dynamicClassVar: state,
    dynamicClassTransform: (val: string) => val,
    transform: (val) => `${val}%`,
  });

  return makeElement({
    type: "labeledIcon",
    name: "Battery",
    icon: IconLabel,
    label: PercentageLabel,
    onClick: () => App.toggle_window("Power"),
  });
}
