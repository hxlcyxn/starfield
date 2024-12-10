import { App, Gdk } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./widget/bar";
import Notifications from "./widget/notifications";
import Launcher from "./widget/launcher";

App.start({
  css: style,
  icons: `${SRC}/icons`,
  main() {
    App.get_monitors().map((monitor: Gdk.Monitor) => {
      Bar(monitor);
      Notifications(monitor);
      // Launcher();
    });
  },
});
