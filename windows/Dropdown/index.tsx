import { Binding } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { WindowProps } from "astal/gtk3/widget";

export interface DropdownProps extends WindowProps {
  name: string;
  child?: Gtk.Widget | Binding<Gtk.Widget>;
  layout?: string;
  transition?: Gtk.RevealerTransitionType | Binding<Gtk.RevealerTransitionType>;
  exclusivity?: Astal.Exclusivity;
  fixed?: boolean;
}

export default function Dropdown({
  name,
  child,
  transition = Gtk.RevealerTransitionType.CROSSFADE,
  exclusivity = Astal.Exclusivity.IGNORE,
  ...props
}: DropdownProps) {
  return (
    <window
      name={name}
      namespace={name}
      className={`Dropdown ${name}`}
      application={App}
      exclusivity={exclusivity}
      layer={Astal.Layer.TOP}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      keymode={Astal.Keymode.ON_DEMAND}
      onKeyPressEvent={(_, e) => {
        const key = e.get_keyval()[1];
        if (key === Gdk.KEY_Escape) {
          App.get_window(name)?.set_visible(false);
        }
      }}
      visible={false}
    >
      <revealer
        revealChild={false}
        setup={(self) => {
          App.connect("window-toggled", (_, window) => {
            self.set_reveal_child(window.visible);
          });
        }}
        transitionType={transition}
        transitionDuration={200}
      >
        <box className={"dropdown-content"} expand canFocus>
          {child}
        </box>
      </revealer>
    </window>
  );
}
