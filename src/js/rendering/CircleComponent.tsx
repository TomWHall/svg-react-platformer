declare const React: typeof import("react");
import { FunctionComponent } from "react";
import { Circle } from "../types";

const CircleComponent: FunctionComponent<Circle> = (props: Circle) => {
    const angle = (props.angle || 0) * 180 / Math.PI;
    const transform = `rotate(${angle})`;

    return <circle cx={props.x} cy={props.y} r={props.radius} transform={transform} className={props.className}></circle>
}

export default CircleComponent;