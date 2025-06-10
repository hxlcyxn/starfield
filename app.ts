import { App, Gdk } from "astal/gtk3";
import style from "./style.scss";
import TopBar from "./windows/TopBar";
import Power from "./windows/Power";

App.start({
  css: style,
  icons: `${SRC}/icons`,
  main() {
    App.get_monitors().map((monitor: Gdk.Monitor) => {
      TopBar(monitor);
      Power(monitor);
    });
  },
});
