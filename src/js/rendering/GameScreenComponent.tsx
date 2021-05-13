declare const React: typeof import("react");
import { FunctionComponent } from "react";
import { GameScreen } from "../types.js";
import GameObjectComponent from "./GameObjectComponent.js";

interface GameScreenComponentProps {
    gameScreen: GameScreen;
}

const GameScreenComponent: FunctionComponent<GameScreenComponentProps> = (props: GameScreenComponentProps) => {
    const gameObjectsFragment = props.gameScreen.gameObjects.map((gameObject, index) => <GameObjectComponent gameObject={gameObject} key={index} />);

    return <>{gameObjectsFragment}</>;
}

export default GameScreenComponent;