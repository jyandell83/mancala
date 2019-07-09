//some variable to work with
const gameboard = document.querySelector('#gameboard');
const playerHoles = document.querySelectorAll('.hole');
const stores = document.querySelectorAll('.store');
const info = document.querySelector('#info');
let activePlayer ='';

class Player  {
    constructor(name, isTurn) {
        this.name = name;
        this.boardArray = [4,4,4,4,4,4,0];
        this.isTurn = isTurn;
        this.score = 0;
        this.seedsInHand = 0;
    }
    pickUpSeeds ()  {
        this.seedsInHand = game.masterBoardArray[game.currentHoleNum];
        game.masterBoardArray[game.currentHoleNum] = 0;
        game.currentHoleNum++;
        this.dropSeeds();
    }
    dropSeeds ()  {
         if (game.playerOne.isTurn)  {
            while (this.seedsInHand)  {
                if (game.currentHoleNum === 13) {
                    game.currentHoleNum = 0;
                  }
                if(this.seedsInHand === 1 && game.currentHoleNum === 6)  {
                    game.extraTurn = true;
                }
                game.masterBoardArray[game.currentHoleNum]++;
                this.seedsInHand--;
                game.currentHoleNum++;
            }
            
        }
        else if (game.playerTwo.isTurn)  {
            while (this.seedsInHand)  {
                if (game.currentHoleNum === 14) {
                    game.currentHoleNum = 0;
                }
                if (game.currentHoleNum === 6) {
                    game.currentHoleNum = 7;}
                if(this.seedsInHand === 1 && game.currentHoleNum === 13)  {
                    game.extraTurn = true;
                }
                game.masterBoardArray[game.currentHoleNum]++;
                this.seedsInHand--;
                game.currentHoleNum++;
            }

        }
        if (game.currentHoleNum !== 7 && game.currentHoleNum !== 14 && game.masterBoardArray[game.currentHoleNum - 1] === 1)  {
           game.captureSeeds(game.currentHoleNum - 1);
        }
        game.switchTurn();
        game.render();
        
    }
}

gameboard.addEventListener('click', e =>  {
    if (e.target.id !== 'gameboard' && e.target.id !== 'p1store' && e.target.id !== 'p2store')  {
        let strId = e.target.id;
        let arrId = strId.split('');
        arrId.shift();
        game.currentHoleNum = parseInt(arrId.join(''));
        if (game.playerOne.isTurn)  {
            if (e.target.classList.contains('p1')){
            game.playerOne.pickUpSeeds();
            }
        }
        else if (game.playerTwo.isTurn)  {
            if (e.target.classList.contains('p2')){
                game.playerTwo.pickUpSeeds();
            }
        }
    }
})

const game = {
    masterBoardArray: [],
    playerOne: undefined,
    playerTwo: undefined,
    currentHoleNum: undefined,
    oppoHole: undefined,
    extraTurn: false,
    render()  {
        for (let i = 0; i < 6; i++)  {
            let elem = document.getElementById('h'+i);
            elem.innerText = this.masterBoardArray[i];
        }
        for (let i = 7; i < 13; i++)  {
            let elem = document.getElementById('h'+i);
            elem.innerText = this.masterBoardArray[i];
        }
        stores[1].innerText = this.masterBoardArray[6];
        stores[0].innerText = this.masterBoardArray[13];
        if (this.playerOne.isTurn)  {
            activePlayer = this.playerOne.name;
        }
        else if (this.playerTwo.isTurn)  {
            activePlayer = this.playerTwo.name;
        }
        info.innerText = `It is ${activePlayer}'s turn.`;
    },
    startGame()  {
        this.playerOne = new Player('Bob', true);
        this.playerTwo = new Player('Tom', false);
        this.masterBoardArray = this.playerOne.boardArray.concat(this.playerTwo.boardArray);
        this.render();
    },
    switchTurn()  {
        if (!this.extraTurn) {
        this.playerOne.isTurn = !this.playerOne.isTurn;
        this.playerTwo.isTurn = !this.playerTwo.isTurn;
        }
        else {this.extraTurn = false;}
    },
    captureSeeds(num1)  {
        if ((this.playerOne.isTurn && num1 > -1 && num1 < 6) || (this.playerTwo.isTurn && num1 > 6 && num1 < 13) )  {
        let num2 = this.getOppositeHole(num1);
        let sum = 0;
        sum = this.masterBoardArray[num1] + this.masterBoardArray[num2];
        console.log(sum);
        if (this.playerOne.isTurn)  {
            this.masterBoardArray[6] += sum;
        }
        if (this.playerTwo.isTurn)  {
            this.masterBoardArray[13] += sum;
        }
        this.masterBoardArray[num1] = 0;
        this.masterBoardArray[num2] = 0;
        this.render();
    }
    },
    getOppositeHole (num)  {
        switch (num) {
            case 0:
                    return 12;
            case 1:
                    return 11;
            case 2:
                    return 10;
            case 3:
                    return 9;
            case 4:
                    return 8;
            case 5:
                    return 7;
            case 7:
                    return 5;
            case 8:
                    return 4;
            case 9:
                    return 3;
            case 10:
                    return 2;
            case 11:
                    return 1;
            case 12:
                    return 0;
          }
    }
}

