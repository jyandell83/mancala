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
        if (game.currentHoleNum + this.seedsInHand <= 13)  {
            while (this.seedsInHand)  {
                game.masterBoardArray[game.currentHoleNum]++;
                this.seedsInHand--;
                game.currentHoleNum++;
            }}
        else if (game.playerOne.isTurn)  {
            while (this.seedsInHand)  {
                if (game.currentHoleNum === 13) {
                    game.currentHoleNum = 0;
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
                game.masterBoardArray[game.currentHoleNum]++;
                this.seedsInHand--;
                game.currentHoleNum++;
            }
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
        this.playerOne.isTurn = !this.playerOne.isTurn;
        this.playerTwo.isTurn = !this.playerTwo.isTurn;
    }
}

