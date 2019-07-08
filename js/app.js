//some variable to work with
const gameboard = document.querySelector('#gameboard');
const playerHoles = document.querySelectorAll('.hole');
const stores = document.querySelectorAll('.store');

gameboard.addEventListener('click', e =>  {
    console.log(e.target);
})

const game = {
    boardArray: [],
    stores: [],
    render()  {
        for (let i = 0; i < playerHoles.length; i++)  {
            playerHoles[i].innerText = this.boardArray[i];
        }
        stores[0].innerText = this.stores[0];
        stores[1].innerText = this.stores[1];
    },
    startGame()  {
        const len = playerHoles.length;
        for (let i = 0; i < len; i++)  {
            this.boardArray.push(4);
        }
        this.stores.push(0);
        this.stores.push(0);
        this.render();
    }
}

