import AstalNetwork from "gi://AstalNetwork";
import { bind, Variable } from "astal";
import { BarElement, BarIcon, BarLabel } from "../../util";

const network = AstalNetwork.get_default();

export default function Audio(): BarElement | undefined {
  const NetworkIcon = BarIcon({
    icon: bind(network.wifi, "iconName"),
    className: "network",
  });
  const NetworkLabel = BarLabel({
    label: bind(network.wifi, "ssid"),
    className: "network",
  });
  return {
    component: (
      <box>
        {NetworkIcon}
        {NetworkLabel}
      </box>
    ),
    isVisible: true,
    class: "Network",
  };
}
