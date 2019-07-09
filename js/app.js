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
        console.log(`${this.name} is picking up seeds`)
    }
    dropSeeds ()  {
        console.log(`${this.name} is dropping seeds`)
    }
}

gameboard.addEventListener('click', e =>  {
    if (e.target.id !== 'gameboard' && e.target.id !== 'p1store' && e.target.id !== 'p2store')  {
    let string = e.target.id;
    let newArr = string.split('');
    newArr.shift();
    let newString = newArr.join('');
    let newNumber = parseInt(newString);
    console.log(newNumber);
    }
})

const game = {
    masterBoardArray: [],
    playerOne: undefined,
    playerTwo: undefined,
    render()  {
        for (let i = 0; i < playerHoles.length; i++)  {
            playerHoles[i].innerText = this.boardArray[i];
        }
        stores[0].innerText = this.stores[0];
        stores[1].innerText = this.stores[1];
    },
    startGame()  {
        this.playerOne = new Player('Player 1', true);
        this.playerTwo = new Player('Player 2', false);
        this.masterBoardArray = this.playerOne.boardArray.concat(this.playerTwo.boardArray);
        console.log(this.masterBoardArray);
        // this.render();
    }
}

