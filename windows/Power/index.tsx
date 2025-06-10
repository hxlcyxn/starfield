import { App, Astal, Gdk } from "astal/gtk3";
import PowerProfiles from "./Profiles";
import Dropdown from "../Dropdown";

export default function Power(monitor: Gdk.Monitor) {
  return (
    <Dropdown name="Power">
      <box>
        <PowerProfiles />
      </box>
    </Dropdown>
  );
}
