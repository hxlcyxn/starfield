import { Binding, exec, Variable } from "astal";
import { BarIcon, makeElement } from "../../util";

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
    className: "solo tailscale",
    icon: Binding.bind(icon),
  });
  function onClick() {
    const val = state.get();
    if (val == ColorScheme.Default) {
      exec(
        "dconf write /org/gnome/desktop/interface/color-scheme \"'prefer-dark'\"",
      );
      exec("sh -c 'swww img ~/Pictures/sui_bg.png'");
    } else {
      exec(
        "dconf write /org/gnome/desktop/interface/color-scheme \"'default'\"",
      );
      exec("sh -c 'swww img $HOME/Pictures/sui_gray.png'");
    }
  }

  return makeElement({
    type: "icon",
    name: "Tailscale",
    icon: IconLabel,
    onClick,
  });
}
