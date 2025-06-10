import { bind, exec, Variable } from "astal";
import { BarIcon, makeElement } from "../../util";

export default function Tailscale() {
  const state: Variable<any> = Variable({}).poll(
    1000,
    "tailscale status --json",
    (out, _) => JSON.parse(out),
  );
  const IconLabel = BarIcon({
    className: "solo tailscale",
    icon: "tailscale-symbolic",
    dynamicClassVar: bind(state),
    dynamicClassTransform: (val) => {
      if (val.BackendState && val.BackendState === "Running") {
        return "active";
      }
      return "inactive";
    },
  });
  function onClick() {
    const val = state.get();
    if (val.BackendState) {
      if (val.BackendState === "Running") {
        exec("tailscale down");
      } else if (val.BackendState === "Stopped") {
        exec("tailscale up");
      }
    }
  }

  return makeElement({
    type: "icon",
    name: "Tailscale",
    icon: IconLabel,
    onClick,
  });
}
