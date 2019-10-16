//some global variable to work with
const gameboard = document.querySelector('#gameboard');
const playerHoles = document.querySelectorAll('.hole');
const stores = document.querySelectorAll('.store');
const info = document.querySelector('#info');
const p1store = document.querySelector('#p1store');
const p2store = document.querySelector('#p2store');
const welcomeForm = document.querySelector('#welcome-form');
const welcomeFormSubmit = document.querySelector('#welcome-form-submit');
const singlePlayerSubmit = document.querySelector('#single-player-submit');
const welcomeModal = document.querySelector('#welcome-modal');
const winnerModal = document.querySelector('#winner-modal');
const winnerContent = document.querySelector('#winner');
let activePlayer ='';
let p1Name = '';
let p2Name = '';
//Class creator for each player
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
                    p1store.classList.add('glow');
                    setTimeout(function(){p1store.classList.remove('glow')}, 400);
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
                    p2store.classList.add('glow');
                    setTimeout(function(){p2store.classList.remove('glow')}, 400);
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
        game.checkEndGame();
        if(game.playerTwo.name === 'The Computer') {
            console.log('computer should take a turn')
        }
        
    }
}
//Event Listeners
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
welcomeFormSubmit.addEventListener('click', e=>  {
    e.preventDefault();
    p1Name = document.querySelector('#p1name').value;
    p2Name = document.querySelector('#p2name').value;
    welcomeModal.style.cssText = "display: none;";
    game.startGame();
})
singlePlayerSubmit.addEventListener('click', e=>  {
    e.preventDefault();
    p1Name = 'The Challenger';
    p2Name = 'The Computer';
    welcomeModal.style.cssText = "display: none;";
    game.startGame();
})
//Game object
const game = {
    masterBoardArray: [],
    playerOne: undefined,
    playerTwo: undefined,
    currentHoleNum: undefined,
    oppoHole: undefined,
    extraTurn: false,
    //This renders the array values to each spot on the gameboard
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
        this.renderSeeds();
    },
    //this starts the game, is called when the modal form is submitted with player names
    startGame()  {
        this.playerOne = new Player(p1Name, true);
        this.playerTwo = new Player(p2Name, false);
        this.masterBoardArray = this.playerOne.boardArray.concat(this.playerTwo.boardArray);
        this.render();
    },
    //switches turns between players unless they have an extra turn banked
    switchTurn()  {
        if (!this.extraTurn) {
        this.playerOne.isTurn = !this.playerOne.isTurn;
        this.playerTwo.isTurn = !this.playerTwo.isTurn;
        }
        else {this.extraTurn = false;}
    },
    //when player puts last seed in empty hole, captures opponents seeds in opposite hole and renders to gameboard
    captureSeeds(num1)  {
        if ((this.playerOne.isTurn && num1 > -1 && num1 < 6) || (this.playerTwo.isTurn && num1 > 6 && num1 < 13) )  {
        let num2 = this.getOppositeHole(num1);
        let sum = 0;
        sum = this.masterBoardArray[num1] + this.masterBoardArray[num2];
        if (this.masterBoardArray[num2] !== 0)  {
        if (this.playerOne.isTurn)  {
            this.masterBoardArray[6] += sum;
        }
        if (this.playerTwo.isTurn)  {
            this.masterBoardArray[13] += sum;
        }
        this.masterBoardArray[num1] = 0;
        this.masterBoardArray[num2] = 0;
        }
        this.render();
        }
    },
    //checks if any player has zero seeds and adds remaining seeds to their store, then calls end game function
    checkEndGame()  {
        let sumEndGameP1 = 0;
        let sumEndGameP2 = 0;
        for (let i = 0; i < 6; i++)  {
            sumEndGameP1 = sumEndGameP1 + this.masterBoardArray[i];
        }
        for (let j = 7; j < 13; j++)  {
            sumEndGameP2 = sumEndGameP2 + this.masterBoardArray[j];
        }
        if (sumEndGameP1 === 0)  {
            this.masterBoardArray[6] += sumEndGameP2;
        }
        if (sumEndGameP2 === 0)  {
            this.masterBoardArray[13] += sumEndGameP1;
        }
        if (sumEndGameP1 === 0 || sumEndGameP2 === 0)  {
            this.commenceEndGame();
        }
    },
    //end game function that fills winner modal with winner message and determines winner
    commenceEndGame()  {
        this.playerOne.score = this.masterBoardArray[6];
        this.playerTwo.score = this.masterBoardArray[13];
        while (winnerContent.firstChild) {
            winnerContent.removeChild(winnerContent.firstChild);
        }
        if (this.playerOne.score > this.playerTwo.score) {
            this.fillWinnerModal(`${p1Name} wins! ${this.playerOne.score} to ${this.playerTwo.score}`);
            winnerModal.style.display = 'block';
        }
        else if (this.playerOne.score < this.playerTwo.score)  {
            this.fillWinnerModal(`${p2Name} wins! ${this.playerTwo.score} to ${this.playerOne.score}`);
            winnerModal.style.display = 'block';
        }
        else {
            this.fillWinnerModal(`Game is a draw! ${this.playerTwo.score} to ${this.playerOne.score}`);
            winnerModal.style.display = 'block';
        }
    },
    //creates content in winner modal including restart button and space for winner message
    fillWinnerModal (text)  {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.setAttribute('id', 'winnerP');
        p.innerText = text;
        const btn = document.createElement('button');
        btn.innerText = "Play Again?";
        btn.setAttribute('class', 'button');
        btn.addEventListener('click', () =>  {
                this.startGame();
                winnerModal.style.display = 'none';
        })
        div.append(p);
        div.append(btn);
        document.querySelector('#winner').appendChild(div);
    },
    //renders seeds, appends divs depending on number on screen so it looks more like game pieces
    renderSeeds()  {
        for (let j = 0; j < 6; j++)  {
        let element = document.querySelector('#h' + j);
        let integer = parseInt(element.innerText);
        for(let i = 0; i < integer; i++)  {
            const div = document.createElement('div');
            div.style.cssText = 'height: 10px; width: 10px; background-color: #F6F5FD; margin: 5px; border-radius: 50%; display; inline; float: left;';
            element.append(div);
        }
        }
        for (let h = 0; h < 6; h++)  {
            let element = document.querySelector('#h' + h);
            element.removeChild(element.childNodes[0]);
        }
        for (let jj = 7; jj < 13; jj++)  {
            let element = document.querySelector('#h' + jj);
            let integer = parseInt(element.innerText);
            for(let ii = 0; ii < integer; ii++)  {
                const div = document.createElement('div');
                div.style.cssText = 'height: 10px; width: 10px; background-color: #F6F5FD; margin: 5px; border-radius: 50%; display; inline; float: left;';
                element.append(div);
            }
            }
            for (let hh = 7; hh < 13; hh++)  {
                let element = document.querySelector('#h' + hh);
                element.removeChild(element.childNodes[0]);
            }

    },
    //switch statement used in the capture seeds method
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

