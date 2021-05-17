import { Direction, GameScreen, GameScreenFunc } from "./types.js";
import Logger from "./Logger.js";
import Player from "./game-objects/Player.js";
import { CollectedItem, GameSnapshot } from "./types.js";
import GameObject from "./game-objects/GameObject.js";
import Collectable from "./game-objects/Collectable.js";

const baseTickTime = 1000 / 60;
const startTime = performance.now();

export default class Game {

    initialized = false;
    gameOver = false;

    player: Player;

    screens: GameScreen[][];
    screenX: number;
    screenY: number;
    lives: number;

    screenCollectables: Collectable[];

    time = startTime;
    previousTime = startTime;
    tickTimeFactor = 1;

    isLoadingScreen: boolean;

    collectedItems: CollectedItem[] = [];

    constructor() {
        this.player = new Player(this);
    }

    initialize(gameState: GameSnapshot): void {
        this.screens = [];
        this.screenX = gameState.screenX;
        this.screenY = gameState.screenY;
        this.lives = gameState.lives;

        this.player.x = gameState.x;
        this.player.y = gameState.y;
        this.player.speedX = gameState.speedX;
        this.player.speedY = gameState.speedY;
        this.player.displayDirection = gameState.displayDirection;
        this.player.animationPhase = gameState.animationPhase;

        this.previousTime = gameState.time;
        this.collectedItems = gameState.collectedItems;

        this.handleRequestScreen(this.screenX, this.screenY);

        this.initialized = true;
    }

    tick(time: number): void {
        if (this.gameOver || this.player.lostLife || this.isLoadingScreen) return;

        const deltaTime = time - (this.previousTime || time);

        if (deltaTime > 500) {
            this.previousTime = time;
            return;
        }

        this.previousTime = time;
        this.time = time;
        this.tickTimeFactor = deltaTime / baseTickTime;

        const screen = this.getCurrentScreen();
        screen.gameObjects.forEach(gameObject => gameObject.update());

        this.player.update();
    }

    getScreen(screenX: number, screenY: number): GameScreen {
        return (this.screens[screenX] && this.screens[screenX][screenY]) || null;
    }

    getCurrentScreen(): GameScreen {
        return this.getScreen(this.screenX, this.screenY);
    }

    handleRequestScreen(screenX: number, screenY: number): void {
        const screen = this.getScreen(screenX, screenY);
        if (screen) {
            this.screenX = screenX;
            this.screenY = screenY;

            this.screenCollectables = screen.gameObjects.filter(go => go instanceof Collectable) as Collectable[];
        } else {
            this.loadScreen(screenX, screenY);
        }

        const player = this.player;
        player.screenEntryGameSnapshot = this.getState();
    }

    handleItemCollected(collectable: Collectable): void {
        this.markItemCollected(collectable);

        this.collectedItems.push({
            screenX: this.screenX,
            screenY: this.screenY,
            x: collectable.x,
            y: collectable.y
        });
    }

    markItemCollected(collectable: Collectable): void {
        collectable.collected = true;
        collectable.node.className += ' collected';
    }

    isItemCollected(gameObject: GameObject): boolean {
        return !!this.collectedItems.find(item => item.screenX === this.screenX && item.screenY === this.screenY && item.x === gameObject.x && item.y === gameObject.y);
    }

    getState(): GameSnapshot {
        return {
            screenX: this.screenX,
            screenY: this.screenY,
            x: this.player.x,
            y: this.player.y,
            speedX: this.player.speedX,
            speedY: this.player.speedY,
            displayDirection: this.player.displayDirection,
            animationPhase: this.player.animationPhase,
            lives: this.lives,
            time: this.time,
            collectedItems: this.collectedItems
        };
    }

    getDefaultGameState(): GameSnapshot {
        return {
            screenX: 100,
            screenY: 100,
            x: 64,
            y: 704,
            speedX: 0,
            speedY: 0,
            displayDirection: Direction.Right,
            animationPhase: 0,
            lives: 10,
            time: performance.now(),
            collectedItems: []
        };
    }

    private loadScreen(screenX: number, screenY: number): void {
        Logger.log(`Loading screen ${screenX}-${screenY}`);

        this.isLoadingScreen = true;

        const modulePath = `./game-screens/screen-${screenX}-${screenY}.js`;
        import(modulePath).then(Module => {
            const gameScreenFunc = Module.default as GameScreenFunc;
            const screen = gameScreenFunc(this);

            const screens = this.screens;
            screens[screenX] = screens[screenX] || [];
            screens[screenX][screenY] = screen;

            this.screenX = screenX;
            this.screenY = screenY;

            this.screenCollectables = screen.gameObjects.filter(go => go instanceof Collectable) as Collectable[];
            this.screenCollectables.forEach(c => {
                if (this.isItemCollected(c)) {
                    this.markItemCollected(c);
                }
            });

            this.isLoadingScreen = false;
        });
    }
}