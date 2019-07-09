//some variable to work with
const gameboard = document.querySelector('#gameboard');
const playerHoles = document.querySelectorAll('.hole');
const stores = document.querySelectorAll('.store');

class Player  {
    constructor(name, isTurn) {
        this.name = name;
        this.boardArray = [4,4,4,4,4,4,0];
        this.isTurn = isTurn;
        this.score = 0;
        this.seedsInHand = 0;
    }
    pickUpSeeds ()  {
        console.log(`${this.name} is picking up ${game.masterBoardArray[game.currentHoleNum]} seeds`);
        this.seedsInHand = game.masterBoardArray[game.currentHoleNum];
        game.masterBoardArray[game.currentHoleNum] = 0;
        for (let i = 1; i <= this.seedsInHand; i++)  {
            game.masterBoardArray[game.currentHoleNum + i]++;
        }
        this.seedsInHand = 0;
        console.log(game.masterBoardArray);
        game.render();
    }
    dropSeeds ()  {
        console.log(`${this.name} is dropping seeds`)
    }
}

gameboard.addEventListener('click', e =>  {
    if (e.target.id !== 'gameboard' && e.target.id !== 'p1store' && e.target.id !== 'p2store')  {
        let strId = e.target.id;
        let arrId = strId.split('');
        arrId.shift();
        game.currentHoleNum = parseInt(arrId.join(''));
        if (game.playerOne.isTurn)  {
            game.playerOne.pickUpSeeds();
        }
        else if (game.playerTwo.isTurn)  {
            game.playerTwo.pickUpSeeds();
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
    }
}

