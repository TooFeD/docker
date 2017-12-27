"use strict";
var Player = (function () {
    function Player(name) {
        this.wins = 0;
        this.name = name;
        this.wins = 0;
    }
    return Player;
}());
var players = [];
players.push(new Player('Player 1'));
players.push(new Player('Player 2'));
var Game = (function () {
    function Game() {
        this.names = [];
        this.gameCount = 0;
        this.names.push(document.querySelector('[data-player-one]'));
        this.names.push(document.querySelector('[data-player-two]'));
        this.players = players;
        this.table = document.querySelector('.table');
        this.counter = document.querySelector('h1');
        this.gamefield = document.querySelector('.gamefield');
        this.wins = document.querySelectorAll('[data-wins]');
        this.setName();
        this.step(this.firstStep());
    }
    Game.prototype.setName = function () {
        for (var i = 0; i < this.names.length; i++) {
            this.names[i].innerHTML = this.players[i].name;
            this.wins[i].innerHTML = this.players[i].wins;
        }
    };
    Game.prototype.firstStep = function () {
        var playerId = Math.floor(Math.random() * (1 + 1));
        var currentSymb = document.querySelectorAll('[data-move]');
        this.gameCount++;
        this.counter.innerHTML = 'Game ' + this.gameCount;
        if (playerId == 1) {
            this.players[playerId].symb = 'X';
            this.players[0].symb = 'O';
            currentSymb[0].innerHTML = 'O';
            currentSymb[1].innerHTML = 'X';
        }
        else {
            this.players[playerId].symb = 'X';
            this.players[1].symb = 'O';
            currentSymb[0].innerHTML = 'X';
            currentSymb[1].innerHTML = 'O';
        }
        return playerId;
    };
    Game.prototype.mark = function (symb) {
        var chosenCell = this.table.querySelector('.chosen');
        if (chosenCell.innerHTML == '') {
            chosenCell.innerHTML = symb;
            return true;
        }
        else
            return false;
    };
    Game.prototype.checkWin = function () {
        var _this = this;
        for (var i = 0; i <= this.players.length - 1; i++) {
            if (this.lookWinRow(this.players[i].symb) === true ||
                this.lookWinLine(this.players[i].symb) === true ||
                this.lookWinMainDiag(this.players[i].symb) === true ||
                this.lookWinAntiDiag(this.players[i].symb) === true) {
                this.players[i].wins++;
                setTimeout(function () { _this.reload(); }, 1000);
            }
            else if (this.lookFull() === true) {
                setTimeout(function () { _this.reload(); }, 1000);
            }
        }
    };
    Game.prototype.lookFull = function () {
        var count = 0;
        var limit = this.table.rows.length;
        for (var row = 0; row <= limit - 1; row++) {
            for (var cell = 0; cell <= limit - 1; cell++) {
                if (this.table.rows[row].cells[cell].innerHTML != '') {
                    count++;
                    if (count == limit * limit) {
                        return true;
                    }
                }
                else
                    break;
            }
        }
    };
    Game.prototype.lookWinMainDiag = function (winSymb) {
        var count = 0;
        var combination = [];
        for (var i = 0; i <= this.table.rows.length - 1; i++) {
            this.table.rows[i].cells[i];
            if (this.table.rows[i].cells[i].innerHTML == winSymb) {
                count++;
                combination.push(this.table.rows[i].cells[i]);
                if (count === this.table.rows.length) {
                    this.showWinCombination(combination);
                    this.hideWinCombination(combination);
                    return true;
                }
            }
        }
    };
    Game.prototype.lookWinAntiDiag = function (winSymb) {
        var count = 0;
        var lastIndex = this.table.rows.length - 1;
        var combination = [];
        for (var i = 0; i <= this.table.rows.length - 1; i++) {
            if (this.table.rows[i].cells[lastIndex - i].innerHTML == winSymb) {
                count++;
                combination.push(this.table.rows[i].cells[lastIndex - i]);
                if (count === this.table.rows.length) {
                    this.showWinCombination(combination);
                    this.hideWinCombination(combination);
                    return true;
                    ;
                }
            }
        }
    };
    Game.prototype.lookWinLine = function (winSymb) {
        var count;
        var limit = this.table.rows.length - 1;
        var combination = [];
        for (var row = 0; row <= limit; row++) {
            count = 0;
            combination = [];
            for (var cell = 0; cell <= limit; cell++) {
                if (this.table.rows[row].cells[cell].innerHTML === winSymb) {
                    count++;
                    combination.push(this.table.rows[row].cells[cell]);
                    if (count == limit + 1) {
                        this.showWinCombination(combination);
                        this.hideWinCombination(combination);
                        return true;
                        ;
                    }
                }
                else
                    break;
            }
        }
    };
    Game.prototype.lookWinRow = function (winSymb) {
        var count;
        var limit = this.table.rows.length - 1;
        var combination = [];
        for (var cell = 0; cell <= limit; cell++) {
            count = 0;
            combination = [];
            for (var row = 0; row <= limit; row++) {
                if (this.table.rows[row].cells[cell].innerHTML === winSymb) {
                    count++;
                    combination.push(this.table.rows[row].cells[cell]);
                    if (count == limit + 1) {
                        this.showWinCombination(combination);
                        this.hideWinCombination(combination);
                        return true;
                    }
                }
                else
                    break;
            }
        }
    };
    Game.prototype.showWinCombination = function (combination) {
        for (var _i = 0, combination_1 = combination; _i < combination_1.length; _i++) {
            var item = combination_1[_i];
            item.classList.add('combination');
        }
    };
    Game.prototype.hideWinCombination = function (combination) {
        setTimeout(function () {
            for (var _i = 0, combination_2 = combination; _i < combination_2.length; _i++) {
                var item = combination_2[_i];
                item.classList.remove('combination');
            }
        }, 1000);
    };
    Game.prototype.reload = function () {
        for (var i = 0; i <= this.table.rows.length - 1; i++) {
            for (var j = 0; j <= this.table.rows.length - 1; j++) {
                this.table.rows[i].cells[j].innerHTML = '';
            }
        }
        //let gameCount: number=0;
        this.wins[0].innerHTML = this.players[0].wins;
        this.wins[1].innerHTML = this.players[1].wins;
        this.firstStep();
    };
    Game.prototype.step = function (activePlayer) {
        var _this = this;
        document.addEventListener('keydown', function (event) {
            if (_this.players[0] === _this.players[activePlayer]) {
                if (event.keyCode === 68) {
                    _this.goRight();
                }
                if (event.keyCode === 65) {
                    _this.goLeft();
                }
                if (event.keyCode === 87) {
                    _this.goUp();
                }
                if (event.keyCode === 83) {
                    _this.goDown();
                }
                if (event.keyCode === 88) {
                    if (_this.mark(_this.players[activePlayer].symb)) {
                        activePlayer = 1;
                        _this.checkWin();
                    }
                }
            }
            else {
                if (event.keyCode === 39) {
                    _this.goRight();
                }
                if (event.keyCode === 37) {
                    _this.goLeft();
                }
                if (event.keyCode === 38) {
                    _this.goUp();
                }
                if (event.keyCode === 40) {
                    _this.goDown();
                }
                if (event.keyCode === 57) {
                    if (_this.mark(_this.players[activePlayer].symb)) {
                        activePlayer = 0;
                        _this.checkWin();
                    }
                }
            }
        });
    };
    Game.prototype.goUp = function () {
        var chosenCell = this.table.querySelector('.chosen');
        var nextCell;
        if ((chosenCell.parentNode.rowIndex - 1) < 0) {
            nextCell = this.table.rows[this.table.rows.length - 1].cells[chosenCell.cellIndex];
            nextCell.classList.add('chosen');
            chosenCell.classList.remove('chosen');
        }
        else {
            nextCell = this.table.rows[chosenCell.parentNode.rowIndex - 1].cells[chosenCell.cellIndex];
            nextCell.classList.add('chosen');
            chosenCell.classList.remove('chosen');
        }
    };
    Game.prototype.goDown = function () {
        var chosenCell = this.table.querySelector('.chosen');
        var nextCell;
        if (this.table.rows.length <= (chosenCell.parentNode.rowIndex + 1)) {
            nextCell = this.table.rows[0].cells[chosenCell.cellIndex];
            nextCell.classList.add('chosen');
            chosenCell.classList.remove('chosen');
        }
        else {
            nextCell = this.table.rows[chosenCell.parentNode.rowIndex + 1].cells[chosenCell.cellIndex];
            nextCell.classList.add('chosen');
            chosenCell.classList.remove('chosen');
        }
    };
    Game.prototype.goLeft = function () {
        var chosenCell = this.table.querySelector('.chosen');
        var nextCell;
        var length = this.table.rows.length - 1;
        if ((chosenCell.cellIndex - 1) < 0) {
            if ((chosenCell.parentNode.rowIndex - 1) < 0) {
                nextCell = this.table.rows[length].cells[length];
                nextCell.classList.add('chosen');
                chosenCell.classList.remove('chosen');
            }
            else {
                nextCell = this.table.rows[chosenCell.parentNode.rowIndex - 1].cells[length];
                nextCell.classList.add('chosen');
                chosenCell.classList.remove('chosen');
            }
        }
        else {
            nextCell = chosenCell.parentNode.cells[chosenCell.cellIndex - 1];
            nextCell.classList.add('chosen');
            chosenCell.classList.remove('chosen');
        }
    };
    Game.prototype.goRight = function () {
        var chosenCell = this.table.querySelector('.chosen');
        var nextCell;
        if (chosenCell.parentNode.cells.length <= (chosenCell.cellIndex + 1)) {
            if (this.table.rows.length <= (chosenCell.parentNode.rowIndex + 1)) {
                nextCell = this.table.rows[0].cells[0];
                nextCell.classList.add('chosen');
                chosenCell.classList.remove('chosen');
            }
            else {
                nextCell = this.table.rows[chosenCell.parentNode.rowIndex + 1].cells[0];
                nextCell.classList.add('chosen');
                chosenCell.classList.remove('chosen');
            }
        }
        else {
            nextCell = chosenCell.parentNode.cells[chosenCell.cellIndex + 1];
            nextCell.classList.add('chosen');
            chosenCell.classList.remove('chosen');
        }
    };
    return Game;
}());
module.exports = Game;
