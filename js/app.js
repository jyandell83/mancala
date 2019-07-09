//some variable to work with
const gameboard = document.querySelector('#gameboard');
const playerHoles = document.querySelectorAll('.hole');
const stores = document.querySelectorAll('.store');

class Player  {
    constructor(name, isTurn) {
        this.name = name;
        this.boardArray = [10,10,10,10,10,10,0];
        this.isTurn = isTurn;
        this.score = 0;
        this.seedsInHand = 0;
    }
    pickUpSeeds ()  {
        console.log(game.currentHoleNum, '<<<<----current hole number');
        this.seedsInHand = game.masterBoardArray[game.currentHoleNum];
        game.masterBoardArray[game.currentHoleNum] = 0;
        game.currentHoleNum++;
        this.dropSeeds();
    }
    dropSeeds ()  {
        if (game.currentHoleNum + this.seedsInHand <= 13)  {
            while (this.seedsInHand)  {
                console.log(this.seedsInHand, game.currentHoleNum, '<first while loop ----')
                game.masterBoardArray[game.currentHoleNum]++;
                this.seedsInHand--;
                game.currentHoleNum++;
            }}
        else if (game.playerOne.isTurn)  {
            while (this.seedsInHand)  {
                console.log(this.seedsInHand, game.currentHoleNum, '<second while loop ----')
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
                console.log(this.seedsInHand, game.currentHoleNum, '<second while loop ----')
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

