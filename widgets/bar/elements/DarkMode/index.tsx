import { bind, Binding, exec, Variable } from "astal";
import { BarIcon, makeElement } from "../../util";
import { App } from "astal/gtk3";

enum ColorScheme {
  Default,
  PreferDark,
}

export default function DarkMode() {
  const state: Variable<ColorScheme> = Variable(ColorScheme.Default).poll(
    1000,
    "dconf read /org/gnome/desktop/interface/color-scheme",
    (out, _) =>
      out == "'default'" ? ColorScheme.Default : ColorScheme.PreferDark,
  );
  const icon = Variable.derive([state], (s) =>
    s == ColorScheme.Default
      ? "daytime-sunset-symbolic"
      : "daytime-sunrise-symbolic",
  );
  const IconLabel = BarIcon({
    className: "solo darkmode",
    icon: Binding.bind(icon),
  });
  function onClick() {
    const val = state.get();
    const wallpaper =
      val == ColorScheme.Default
        ? "~/Pictures/Wallpapers/sui_bg.png"
        : "~/Pictures/Wallpapers/sui_gray.png";
    const dconfScheme =
      val == ColorScheme.Default ? "'prefer-dark'" : "'default'";
    const shaderbgFile =
      val == ColorScheme.Default
        ? "~/Pictures/Wallpapers/balatro_dark.frag"
        : "~/Pictures/Wallpapers/balatro_gray.frag";
    const css = val == ColorScheme.Default ? "/tmp/dark.css" : "/tmp/light.css";

    const swwwCmd = `sh -c 'swww img ${wallpaper} --transition-type wipe --transition-angle 180 --transition-fps 60'`;
    const dconfCmd = `dconf write /org/gnome/desktop/interface/color-scheme "${dconfScheme}"`;
    const shaderbgCmd = `sh -c 'rm ~/Pictures/Wallpapers/shaderbg.frag && ln -s ${shaderbgFile} ~/Pictures/Wallpapers/shaderbg.frag && systemctl --user restart shaderbg'`;

    exec("niri msg action do-screen-transition");
    exec(dconfCmd);
    exec(swwwCmd);
    exec(shaderbgCmd);
    App.apply_css(css);
  }

  return makeElement({
    type: "icon",
    name: "DarkMode",
    icon: IconLabel,
    onClick,
  });
}
