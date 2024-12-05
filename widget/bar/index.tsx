import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import Right from "./sections/Right";
import Middle from "./sections/Midle";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name="Bar"
      className="Bar"
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
    >
      <centerbox
        hexpand
        startWidget={<box />}
        centerWidget={Middle()}
        endWidget={Right()}
      />
    </window>
  );
}
