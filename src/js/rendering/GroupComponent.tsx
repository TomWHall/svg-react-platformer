declare const React: typeof import("react");
import { FunctionComponent, ReactNode } from "react";
import { Node, Group, NodeType, Rect, Circle } from "../types.js";
import CircleComponent from "./CircleComponent.js";
import RectComponent from "./RectComponent.js";

function renderNodes(nodes: Node[]): ReactNode {
    return nodes && nodes.length > 0
        ? nodes.map((node, index) => {
            switch (node.type) {
                case NodeType.Group:
                    return <GroupComponent {...node as Group} key={index} />;

                case NodeType.Rect:
                    return <RectComponent {...node as Rect} key={index} />;

                case NodeType.Circle:
                    return <CircleComponent {...node as Circle} key={index} />;
            }
        })
        : null;
}

const GroupComponent: FunctionComponent<Group> = (props: Group) => {
    const children = renderNodes(props.children);

    const x = props.x;
    const y = props.y;
    const angle = (props.angle || 0) * (180 / Math.PI);

    const flipHorizontalTranslation = props.flipHorizontal
        ? ' scale (-1, 1)'
        : '';

    const transform = `translate(${x} ${y}) rotate(${angle})${flipHorizontalTranslation}`;

    return <g transform={transform} className={props.className}>{children}</g>;
}

export default GroupComponent;