import { App, Astal, Gdk } from "astal/gtk3";
import Middle from "./sections/Middle";
import Right from "./sections/Right";

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
