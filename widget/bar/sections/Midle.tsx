import TimeDate from "../elements/TimeDate";
import { BarElementButton } from "../util";

export default function Middle() {
  return <box>{BarElementButton(TimeDate())}</box>;
}
