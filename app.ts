import { App, Gdk } from "astal/gtk3";
import TopBar from "./windows/TopBar";
import Power from "./windows/Power";
import { exec } from "astal";

exec("sass ./dark.scss /tmp/dark.css");
exec("sass ./light.scss /tmp/light.css");
const scheme =
  exec("dconf read /org/gnome/desktop/interface/color-scheme") == "'default'"
    ? "light"
    : "dark";

App.start({
  css: `/tmp/${scheme}.css`,
  icons: `${SRC}/icons`,
  main() {
    App.get_monitors().map((monitor: Gdk.Monitor) => {
      TopBar(monitor);
      Power(monitor);
    });
  },
});
