import { GObject, property, register, subprocess } from "astal";

export type KeyboardLayouts = {
  names: string[];
  current_idx: number;
};

export type Overview = {
  is_open: boolean;
};

@register({ GTypeName: "Niri" })
export class Niri extends GObject.Object {
  @property(Object)
  declare keyboardLayouts: KeyboardLayouts;

  @property(Object)
  declare overview: Overview;

  constructor() {
    super();
    this.keyboardLayouts = {
      names: ["none"],
      current_idx: 0,
    };
    this.overview = {
      is_open: false,
    };

    subprocess(
      ["niri", "msg", "--json", "event-stream"],
      (out) => this.handleMsg(JSON.parse(out)),
      (err) => console.error(err),
    );
  }

  handleMsg(msg: object) {
    for (const [key, val] of Object.entries(msg)) {
      switch (key) {
        case "KeyboardLayoutsChanged":
          this.onKeyboardLayoutsChanged(val.keyboard_layouts);
          break;
        case "KeyboardLayoutSwitched":
          this.onKeyboardLayoutSwitched(val.idx);
          break;
        case "OverviewOpenedOrClosed":
          this.onOverviewOpenedOrClosed(val.is_open);
          break;
        default:
          // console.log("[Niri] msg not implemented:", msg);
          break;
      }
    }
  }

  onKeyboardLayoutsChanged(layouts: KeyboardLayouts) {
    console.log("[Niri] keyboard layouts changed:", layouts);
    this.keyboardLayouts = layouts;
  }

  onKeyboardLayoutSwitched(idx: number) {
    console.log("[Niri] keyboard layout switched:", idx);
    this.keyboardLayouts = {
      names: this.keyboardLayouts.names,
      current_idx: idx,
    };
  }

  onOverviewOpenedOrClosed(is_open: boolean) {
    console.log("[Niri] overview is open:", is_open);
    this.overview = {
      is_open,
    };
  }
}

export default new Niri();
