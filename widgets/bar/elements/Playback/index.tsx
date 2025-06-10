import { GLib, Variable, bind } from "astal";
import Mpris from "gi://AstalMpris";
import { BarIcon, BarLabel, makeElement } from "../../util";

const mpris = Mpris.get_default();
const players = bind(mpris, "players");

function Player(player: Mpris.Player) {
  const artist = bind(player, "artist");
  const title = bind(player, "title");
  const label = Variable.derive([artist, title], (artist, title) => {
    if (artist === undefined || title === undefined) {
      return "No Player found";
    } else {
      return `${artist} - ${title}`;
    }
  });

  const Icon = BarIcon({
    icon: "folder-music-symbolic",
    className: "player",
  });

  const Label = BarLabel({
    label: bind(label),
    className: "player",
  });

  return makeElement({
    type: "labeledIcon",
    name: "Playback",
    icon: Icon,
    label: Label,
  });
}

export default function Playback() {
  return <box>{bind(mpris, "players").as((p) => p.map(Player))}</box>;
}
