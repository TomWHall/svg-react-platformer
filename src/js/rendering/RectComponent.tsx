declare const React: typeof import("react");
import * as react from "react";
import { Rect } from "../types";

const RectComponent: react.FunctionComponent<Rect> = (props: Rect) => {
    const angle = (props.angle || 0) * 180 / Math.PI;
    const transform: string = 'rotate(' + angle + ')';

    return <rect x={props.x} y={props.y} width={props.width} height={props.height} transform={transform} className={props.className}></rect>
}

export default RectComponent;