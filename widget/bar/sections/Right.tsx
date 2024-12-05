import { Gtk } from "astal/gtk3";
import { Variable } from "astal";

import { BarElementButton } from "../util";
import Battery from "../elements/Battery";
import PowerProfiles from "../elements/PowerProfiles";
import NiriLanguage from "../elements/NiriLanguage";

export default function Right() {
  return (
    <box halign={Gtk.Align.END}>
      {BarElementButton(NiriLanguage())}
      {BarElementButton(Battery())}
      {BarElementButton(PowerProfiles())}
    </box>
  );
}
