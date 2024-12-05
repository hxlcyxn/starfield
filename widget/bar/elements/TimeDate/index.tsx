import { Variable, GLib, bind } from "astal";
import { BarElement, BarIcon, BarLabel } from "../../util";

export default function TimeDate(): BarElement {
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
  return {
    component: (
      <box>
        {IconLabel}
        {TimeLabel}
      </box>
    ),
    class: "TimeDate",
  };
}
