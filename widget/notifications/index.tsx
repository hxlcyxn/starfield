import { bind } from "astal";
import { App, Astal, Gdk } from "astal/gtk3";
import { NotifiationMap } from "./NotifiationMap";

export default function Notifications(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor;
  const notifs = new NotifiationMap();

  return (
    <window
      name="Notifications"
      className="Notifications"
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={TOP | RIGHT}
      application={App}
    >
      <box vertical hexpand>
        {bind(notifs)}
      </box>
    </window>
  );
}
