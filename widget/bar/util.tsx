import { Box } from "astal/gtk3/widget";
import { Astal, Gtk, Widget } from "astal/gtk3";
import Binding, { type Subscribable } from "astal/binding";

export type BarIconProps = {
  className: string;
  dynamicClassVar?: Binding<any>;
  dynamicClassTransform?: (val: any) => string;
  icon: string | Binding<string>;
};

export function BarIcon(props: BarIconProps) {
  let className: string | Binding<string>;
  let staticName = "BarIcon " + props.className;
  className = staticName;
  if (props.dynamicClassVar && props.dynamicClassTransform) {
    className = props.dynamicClassVar.as(
      (val) => staticName + " " + props.dynamicClassTransform(val),
    );
    print(className.get());
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
      (val) => staticName + " " + props.dynamicClassTransform(val),
    );
    print(className.get());
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

export type BarElement = {
  component: Gtk.Widget;
  isVisible?: boolean;
  class: string;
  onClick?: () => void;
};

export function BarElementButton(element: BarElement): Partial<Astal.Button> {
  const className = `BarElementButton ${element.class}`;
  return (
    <button
      className={className}
      onClick={element.onClick ? element.onClick : () => {}}
    >
      {element.component}
    </button>
  );
}
