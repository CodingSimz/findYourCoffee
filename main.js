/**
 * ----- PLEASE READ BEFORE YOU TRY RUNNING THIS GAME ----- 
 * 
 * This game currently runs in the terminal 
 * 
 * This game req user input - to do this with prompt-sync: 
 * - Ensure you have node + npm installed
 * - run $ npm install prompt-sync 
 * 
 * This games uses colors.js (see https://nodejs.org/en/knowledge/command-line/how-to-get-colors-on-the-command-line/ )
 * - run $ npm install colors
 * 
 * - run $ node main.js
 * 
 */
 

const prompt = require('prompt-sync')({sigint: true});

const colors = require('colors');

colors.setTheme({
    grass: 'green',
    water: 'bgBlue',
    bevey: 'yellow',
    path: 'bgRed'
});

const coffee = '\u{26FE}.'.bevey;
const hole = '\u{2652}'.water;
const fieldCharacter = '░░'.grass;
const pathCharacter = '\u{26F9}.'.path;

/**
 * Instructions for Project from Codecademy:
 * Constructor to take 2D array to rep the field
 * Player begins on upper-left of the field
 * Class should take a single arg representing the field
 */
class Field {
    // newField = [[]] Taken from Solution
    constructor(newField = [[]]) {
        this._newField = newField;
    }

    get newField() {
        return this._newField;
    }

    set newField(f) {
        this._newField = f;
    }


    playGame() {

        const welcome = '\n\u{26FE}  Welcome to Find My Coffee \u{26FE}\nTo find your way through the field, use your d r l u keys (down, right, left, up)\nAnd remember to watch out for waterholes';

        console.log(welcome);
        this.chooseMove();
    }

    // method that prints a Str rep of the current state of the field array
    print() {
        
        console.log('\n');
        //Cycles through rows
        for (let row = 0; row < this._newField.length; row++) {
            console.log(this._newField[row].join(''));
        }
        //adapted from Java https://www.codegrepper.com/code-examples/java/how+to+print+a+2d+matrix+of+string
    }


    chooseMove() {
        
        let gameOver = false;
        let currR = 0;
        let currC = 0;
                
        while (!gameOver) {
             this.print();
            // Get user input
            let move = prompt('\nWhich Way? ');

            switch (move) {
                case 'd':
                    currR +=1;
                    break;
                case 'l':
                    currC -=1;
                    break;
                case 'u':
                    currR -=1;
                    break;
                case 'r':
                    currC +=1;
                    break;
                default:
                console.log("Wrong key, see the instructions (and check your Caps lock).");              
            }

            // check for out-of-bounds
            if ((currR < 0 || currR >= this._newField.length) || (currC < 0 || currC >= this._newField[0].length) ) {
                console.log('Oops you\'re out of bounds!'.bold);
                gameOver = true;
                //break;
            }
            // Compare new position to the location of the coffee or a hole and let the user know.
            else if (this._newField[currR][currC] === coffee) {
                console.log('Congrats, you found the Coffee!'.bold);
                gameOver = true;
               // break;
            } else if (this._newField[currR][currC] === hole) {
                console.log('Oh no you fell in a hole!'.bold);
                gameOver = true;
                //break;
            } else {
                this._newField[currR][currC] = pathCharacter;
            }
        }

    } // end chooseMove


    // static method
    static generateField(height, width, lvl) {
        this._height = height;
        this._width = width;
        this._lvl = lvl;

        // init empty field based on height and width from new input
        const freshField = new Array(this._height).fill(null).map(()=>new Array(this._width).fill(null));
       
        //starting point ALWAYS top left
        freshField[0][0] = pathCharacter;
        
        // fill rest of field matrix with grass
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                if (y === 0 && x === 0) {
                    continue;
                }
                freshField[y][x] = fieldCharacter;
            }
        }
        
        // generate random location for the coffee (cannot be starting point)
        let coffeeR = 1;
        let coffeeC = 1;
        
        do {
            coffeeR = Math.floor(Math.random() * this._height);
            coffeeC = Math.floor(Math.random() * this._width);
            if(!(coffeeR === 0 && coffeeC === 0))
            { freshField[coffeeR][coffeeC] = coffee;
            break;}
        } while (coffeeR === 0 && coffeeC === 0);
        
        // determine how many holes per game; lvl 1 = 20% of field, lvl 2 = 40% of field
        let numHoles = 0;
        let holeR = 1;
        let holeC = 1;
        
        if(this._lvl === 1) {
            numHoles = Math.floor((this._height * this._width) * 0.2);
        } else if(this._lvl === 2) {
            numHoles = Math.floor((this._height * this._width) * 0.4);
        }
        
        // generate locations for each hole (cannot be taken by coffee or starting point)
        let k = 0;
        do {
            holeR = Math.floor(Math.random() * this._height);
            holeC = Math.floor(Math.random() * this._width);
            
            if (freshField[holeR][holeC] === fieldCharacter) {	
                freshField[holeR][holeC] = hole;
                k++;
            }
        
        } while(k < numHoles);
        
        return this._newField = freshField;

    } //end generateField method
}

// input parems (height, width, level) take integers
// NOTE level can currently ONLY be 1 or 2;
const myField = new Field(Field.generateField(4,4,1));

myField.playGame();
