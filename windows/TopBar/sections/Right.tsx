import { Gtk } from "astal/gtk3";
import { Variable } from "astal";

import { BarElementButton } from "../../../widgets/bar/util";
import Battery from "../../../widgets/bar/elements/Battery";
import NiriLanguage from "../../../widgets/bar/elements/NiriLanguage";
import Audio from "../../../widgets/bar/elements/Audio";
import Network from "../../../widgets/bar/elements/Network";
import Tailscale from "../../../widgets/bar/elements/Tailscale";
import DarkMode from "../../../widgets/bar/elements/DarkMode";

export default function Right() {
  return (
    <box halign={Gtk.Align.END}>
      {DarkMode()}
      {Tailscale()}
      {Network()}
      {Audio()}
      {NiriLanguage()}
      {Battery()}
    </box>
  );
}
