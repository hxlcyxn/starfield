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

    const swwwArgs =
      "--transition-type wipe --transition-angle 180 --transition-fps 60";
    if (val == ColorScheme.Default) {
      exec(
        "dconf write /org/gnome/desktop/interface/color-scheme \"'prefer-dark'\"",
      );
      exec(`sh -c 'swww img ~/Pictures/sui_bg.png ${swwwArgs}'`);
      App.apply_css("/tmp/dark.css");
    } else {
      exec(
        "dconf write /org/gnome/desktop/interface/color-scheme \"'default'\"",
      );
      exec(`sh -c 'swww img $HOME/Pictures/sui_gray.png ${swwwArgs}'`);
      App.apply_css("/tmp/light.css");
    }
  }

  return makeElement({
    type: "icon",
    name: "DarkMode",
    icon: IconLabel,
    onClick,
  });
}
