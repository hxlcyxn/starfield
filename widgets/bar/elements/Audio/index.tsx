import { bind } from "astal";
import Wp from "gi://AstalWp";
import { BarIcon, BarLabel, makeElement } from "../../util";

const audio = Wp.get_default()?.audio;

export default function Audio() {
  if (!audio) {
    return makeElement({
      type: "custom",
      name: "Audio",
      component: <box>No Audio Device detected!</box>,
    });
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

  return makeElement({
    type: "custom",
    name: "Audio",
    component: (
      <box>
        {MicIconLabel}
        {SpeakerIconLabel}
        {PercentageLabel}
      </box>
    ),
  });
}
