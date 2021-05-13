declare const React: typeof import("react");
import { FunctionComponent } from "react";
import GameObject from "../game-objects/GameObject.js";
import { Group } from "../types.js";
import GroupComponent from "./GroupComponent.js";

interface GameObjectComponentProps {
    gameObject: GameObject;
}

const GameObjectComponent: FunctionComponent<GameObjectComponentProps> = (props: GameObjectComponentProps) => {
    const gameObject = props.gameObject;

    const group = {
        x: gameObject.x,
        y: gameObject.y,
        children: [gameObject.node]
    } as Group;

    return <GroupComponent {...group} />;
}

export default GameObjectComponent;