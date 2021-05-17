// Shared

import Game from "./Game";
import GameObject from "./game-objects/GameObject";

enum Direction {
    Left = 1,
    Right = 2
}



// GameScreen

interface GameScreen {
    name: string;
    gameObjects: GameObject[];
}

type GameScreenFunc = (game: Game) => GameScreen;



// Nodes / GameObject

enum NodeType {
    Group = 1,
    Rect = 2,
    Circle = 3
}

enum GameObjectType {
    Background = 0,
    Solid = 1,
    Fatal = 2,
    Collectable = 3
}

interface Node {
    type: NodeType;

    x: number;
    y: number;

    angle?: number;

    className?: string;

    ignoreCollision?: boolean;
}

interface Rect extends Node {
    width: number;
    height: number;

    // If true, we can overlap with the Rect and jump up through it, and only collide from above
    passThrough?: boolean;
}

interface Circle extends Node {
    radius: number;
}

type Shape = Rect | Circle;

interface Group extends Node {
    children?: Node[];
    flipHorizontal?: boolean;
}



// Game

interface CollectedItem {
    screenX: number;
    screenY: number;
    x: number;
    y: number;
}

interface GameSnapshot {
    screenX: number;
    screenY: number;
    x: number;
    y: number;

    speedX: number;
    speedY: number;
    displayDirection: Direction;
    animationPhase: number;

    time: number;
    lives: number;
    collectedItems: CollectedItem[];
}



// Player

interface PlayerNodeData {
    group: Group;
    armFront: Group;
    armBack: Group;
    legFront: Group;
    legBack: Group;
    width: number;
    height: number;
}



export {
    Direction,
    GameScreen, GameScreenFunc,
    NodeType, GameObjectType,
    Node, Rect, Circle, Shape, Group,
    CollectedItem, GameSnapshot,
    PlayerNodeData
};