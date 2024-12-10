import Wp from "gi://AstalWp";
import { bind, Variable } from "astal";
import { BarElement, BarIcon, BarLabel } from "../../util";

const audio = Wp.get_default()?.audio;

export default function Audio(): BarElement | undefined {
  if (!audio) {
    return;
  }
  const defaultSpeaker = audio.defaultSpeaker;
  const defaultMicrophone = audio.defaultMicrophone;

  const MicIconLabel = BarIcon({
    className: "audio",
    icon: bind(defaultMicrophone, "volumeIcon"),
  });
  const SpeakerIconLabel = BarIcon({
    className: "audio",
    icon: bind(defaultSpeaker, "volumeIcon"),
  });
  const PercentageLabel = BarLabel({
    className: "audio",
    label: bind(defaultSpeaker, "volume"),
    transform: (val) => `${Math.round(val * 100)}%`,
  });
  return {
    component: (
      <box>
        {MicIconLabel}
        {SpeakerIconLabel}
        {PercentageLabel}
      </box>
    ),
    isVisible: true,
    class: "Audio",
  };
}
