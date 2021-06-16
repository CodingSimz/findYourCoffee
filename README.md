# findYourCoffee

This repository contains files for my mini FIND YOUR COFFEE game. It's my interpretation of Codecademy's "Find Your Hat" JavaScript project. 

### Features

![Alt text](find-your-coffee-game-simone-waring.jpg?raw=true "Game Snapshot")

- The size of the field can be altered and the Game has two levels, 1 and 2 that denote the number of holes per game. 
- It is CURRENTLY meant to be played in a Terminal and was tested in VS Code with the Dracula Dark+ extension

## Installation
This project requires you to have node.js and npm installed.

Once unzipped

```bash
npm install prompt-sync
npm install colors
```

## To Play

```bash
node main.js
```

## Project Goals
We were tasked with making a mini js game to test our understanding of Classes. 

Project mandatories:
- Constructor to take 2D array to represent the field as a grid
- Player begins on upper-left of the field
- Class should take a single arg representing the field
- Class should include a static method, generateField()
- The location of the prize (a hat or in my case coffee) should be random
- The location of the holes should also be random

## Project Status
The Game works as a stand-alone, however, I would like to run it from a webpage and include functionality for the Players to select their own initial input parameters. 

I would also like to increase the degree of difficulty upon a WIN and include a Player score

## Author
Simone Waring, June 2021
