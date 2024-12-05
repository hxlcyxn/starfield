import AstalBattery from "gi://AstalBattery";
import { BarElement, BarIcon, BarLabel } from "../../util";
import { bind, Variable } from "astal";

const battery = AstalBattery.get_default();

export default function Battery(): BarElement {
  const percentage = bind(battery, "percentage").as((num) =>
    Math.round(num * 100),
  );
  // const percentage = bind(Variable(2));
  const charging = bind(battery, "charging");
  // const charging = bind(Variable(false));
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
  return {
    component: (
      <box>
        {IconLabel}
        {PercentageLabel}
      </box>
    ),
    isVisible: true,
    class: "Battery",
  };
}
