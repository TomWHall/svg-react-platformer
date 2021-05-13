# SVG / React platformer

A PoC of a retro 2D platform game using SVG, React, and dynamic JavaScript modules.

![Screenshot](https://tomwhall.github.io/svg-react-platformer/screenshot.png)

[Play online](https://tomwhall.github.io/svg-react-platformer/)

### Objectives

* Bask in the nostalgia of some 80s classic platform games such as Jet Set Willy, Dynamite Dan and Montezuma's Revenge, but with a vector flavour
* Use dynamic JavaScript modules to load screens on demand
* Avoid any build tools such as Webpack
* Keep it simple enough to be fun to develop

### Build process

* Run npm install to install Node packages for development (TypeScript, and types for React)
* Run build.cmd. This compiles the TypeScript files by invoking tsc from /node_modules, and then copies the deployment files into /build

## Overview of classes / interfaces

### App (React component)

* Hosts a Game object instance
* Manages the requestAnimationFrame loop, and ticks the Game instance
* Renders SVG scaled to fit the screen, with SVG elements mapped from Nodes in Game instance
* Handles keyboard input

### Game

* Uses a simple physics world built of "Nodes" which map to the SVG Rect, Circle, and Group elements
* Can be ticked independently of the UI
* World speed is designed around ticking at 60fps. Game applies a multiplier during the tick to account for uneven tick duration
* Composed of "GameObjects" which are containers for Nodes

### GameObject

* Abstract class for Player, monsters, elevators, static terrain etc
* Defines "update" method which is invoked during Game tick

### GameSnapshot

* Represents the current state of the game - screen, position, speed etc
* Game instance can export, or be initialized with, a GameSnapshot
* Could be used to save / load games

### CollisionUtil

* Simple collision detection using non-rotated rectangles and circles
* Respects offsets of nested groups
* Rects can be defined as "pass-through" so the player can jump up through them

### GameScreen

* Interface for screens, e.g. "The Ballroom"
* Defines a name and list of GameObjects

### GameScreenFunc

* Function type which takes a Game and returns a GameScreen
* Exported by each dynamically loaded screen module