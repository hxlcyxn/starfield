import Binding from "astal/binding";
import { Gtk } from "astal/gtk3";

export type BarIconProps<C> = {
  className: string;
  dynamicClassVar?: Binding<C>;
  dynamicClassTransform?: (val: C) => string;
  icon: string | Binding<string>;
};

export function BarIcon<C>(props: BarIconProps<C>) {
  let className: string | Binding<string>;
  let staticName = "BarIcon " + props.className;
  className = staticName;
  if (props.dynamicClassVar && props.dynamicClassTransform) {
    className = props.dynamicClassVar.as(
      (val) => staticName + " " + props.dynamicClassTransform!(val),
    );
  }
  return <icon className={className} icon={props.icon} />;
}

export type BarLabelProps<C, L> = {
  className: string;
  dynamicClassVar?: Binding<C>;
  dynamicClassTransform?: (val: C) => string;
  label: string | Binding<L>;
  transform?: (val: L) => string;
};

export function BarLabel<C, L>(props: BarLabelProps<C, L>) {
  let className: string | Binding<string>;
  let staticName = "BarLabel " + props.className;
  className = staticName;
  if (props.dynamicClassVar && props.dynamicClassTransform) {
    className = props.dynamicClassVar.as(
      (val) => staticName + " " + props.dynamicClassTransform!(val),
    );
  }
  return (
    <label
      className={className}
      label={
        props.transform && props.label instanceof Binding
          ? props.label.as(props.transform)
          : props.label
      }
    />
  );
}

export type Icon = {
  type: "icon";
  name: string;
  icon: Gtk.Widget;
  onClick?: () => void;
};

export type LabeledIcon = {
  type: "labeledIcon";
  name: string;
  icon: Gtk.Widget;
  label: Gtk.Widget;
  onClick?: () => void;
};

export type Custom = {
  type: "custom";
  name: string;
  component: Gtk.Widget;
  onClick?: () => void;
};

export type Element = Icon | LabeledIcon | Custom;

export function makeElement(e: Element) {
  switch (e.type) {
    case "icon":
      return (
        <button className={`BarElementButton ${e.name}`} onClick={e.onClick}>
          <box>{e.icon}</box>
        </button>
      );
    case "labeledIcon":
      return (
        <button className={`BarElementButton ${e.name}`} onClick={e.onClick}>
          <box>
            {e.icon}
            {e.label}
          </box>
        </button>
      );
    case "custom":
      return (
        <button className={`BarElementButton ${e.name}`} onClick={e.onClick}>
          {e.component}
        </button>
      );
    default:
      return <button className="BarElementButton">lol</button>;
  }
}
