import { Circle, Group, Node, NodeType, Rect } from "./types.js";
import config from './config.js';

function getGroup(children: Node[], x = 0, y = 0, className: string = null, angle = 0): Group {
    return {
        type: NodeType.Group,
        children: children,
        x: x,
        y: y,
        angle: angle,
        className: className
    } as Group;
}

function getRect(x: number, y: number, width: number, height: number, className: string, passThrough = false, angle = 0): Rect {
    return {
        type: NodeType.Rect, x: x,
        y: y,
        width: width,
        height: height,
        angle: angle,
        className: className,
        passThrough: passThrough || undefined
    };
}

function getCircle(x: number, y: number, radius: number, className: string, angle = 0): Circle {
    return {
        type: NodeType.Circle,
        x: x,
        y: y,
        radius: radius,
        angle: angle,
        className: className
    };
}

function getBackground(className: string): Rect {
    return getRect(0, 0, config.viewportWidth, config.viewportHeight, className);
}

function getBlock(x: number, y: number, width: number, height: number, className: string): Rect {
    return getRect(x, y, width, height, className);
}

function getBricks(x: number, y: number, width: number, height: number): Rect {
    return getRect(x, y, width, height, 'bricks');
}

// x, y is at center of capsule shape. Capsule is upright when angle = 0
function getCapsule(x: number, y: number, width: number, height: number, className: string, angle = 0): Group {
    const halfWidth = width / 2;

    const rectHeight = height - width;
    const rectX = -(width / 2);
    const rectY = -(rectHeight / 2);

    return getGroup([
        getCircle(0, rectY, halfWidth, className),
        getCircle(0, -rectY, halfWidth, className),
        getRect(rectX, rectY, width, rectHeight, className)
    ], x, y, className, angle);
}

export default {
    getGroup,
    getRect,
    getCircle,
    getBackground,
    getBlock,
    getBricks,
    getCapsule
};