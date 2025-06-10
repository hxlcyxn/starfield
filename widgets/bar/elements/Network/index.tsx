import { bind } from "astal";
import AstalNetwork from "gi://AstalNetwork";
import { BarIcon, BarLabel, makeElement } from "../../util";

const network = AstalNetwork.get_default();

export default function Audio() {
  const NetworkIcon = BarIcon({
    icon: bind(network.wifi, "iconName"),
    className: "network",
  });
  const NetworkLabel = BarLabel({
    label: bind(network.wifi, "ssid"),
    className: "network",
  });

  return makeElement({
    type: "labeledIcon",
    name: "Network",
    icon: NetworkIcon,
    label: NetworkLabel,
  });
}
