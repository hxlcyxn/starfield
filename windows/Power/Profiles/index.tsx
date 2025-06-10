import AstalPowerProfiles from "gi://AstalPowerProfiles";
import { bind } from "astal";
import { Gtk, Widget } from "astal/gtk3";
import { BarIcon } from "../../../widgets/bar/util";

const powerprofiles = AstalPowerProfiles.get_default();
const availableProfiles = powerprofiles.get_profiles();

function activateNextProfile() {
  const currentProfile = powerprofiles.get_active_profile();
  const currentIndex = availableProfiles.findIndex(
    (profile) => profile.profile === currentProfile,
  );
  const nextIndex = (currentIndex + 1) % availableProfiles.length;

  powerprofiles.set_active_profile(availableProfiles[nextIndex].profile);
}

export default function Profiles(): Gtk.Widget {
  const icon = bind(powerprofiles, "iconName");
  const currentProfile = bind(powerprofiles, "activeProfile");
  const IconLabel = BarIcon({
    className: "solo powerprofiles",
    dynamicClassVar: currentProfile,
    dynamicClassTransform: (val) => val,
    icon: icon,
  });
  return (
    <button
      className="BarElementButton PowerProfiles"
      onClick={activateNextProfile}
    >
      <box>{IconLabel}</box>
    </button>
  );
}
