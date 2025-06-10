import { GLib, Variable, bind } from "astal";
import { BarIcon, BarLabel, makeElement } from "../../util";

export default function TimeDate() {
  const time = Variable("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format("%H:%M:%S | %d.%m.%Y")!,
  );

  const IconLabel = BarIcon({
    icon: "x-office-calendar-symbolic",
    className: "timedate",
  });
  const TimeLabel = BarLabel({
    label: bind(time),
    transform: (val) => val,
    className: "timedate",
  });

  return makeElement({
    type: "labeledIcon",
    name: "TimeDate",
    icon: IconLabel,
    label: TimeLabel,
  });
}
