import { Gtk } from "astal/gtk3";
import { Variable } from "astal";

import { BarElementButton } from "../util";
import Battery from "../elements/Battery";
import PowerProfiles from "../elements/PowerProfiles";
import NiriLanguage from "../elements/NiriLanguage";
import Audio from "../elements/Audio";

export default function Right() {
  return (
    <box halign={Gtk.Align.END}>
      {BarElementButton(Audio())}
      {BarElementButton(NiriLanguage())}
      {BarElementButton(Battery())}
      {BarElementButton(PowerProfiles())}
    </box>
  );
}
