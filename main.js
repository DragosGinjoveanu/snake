//game board
var table = [];
for (var i = 1; i <= 15; i++) {
    table[i] = [];
    for (var j = 1; j <= 15; j++) {
        table[i][j] = 0;
    }
}

var score = 0;
var snakeRow = [];
var snakeColumn = [];
var timeout;

//generates the next "apple" you need to eat
function generateFood() {
  var i = Math.floor(Math.random() * (15) + 1);
  var j = Math.floor(Math.random() * (15) + 1);
  var ok = 1;
  for (var a = 0; a < snakeRow.length; a++) {
    if (snakeRow[a] == i && snakeColumn[a] == j) {
      ok = 0;
    }
  }
  if (ok == 1) {
    table[i][j] = 2;
    var id = i + String(j);
    document.getElementById(id).innerHTML = ('󠀠󠀠<i class="las la-apple-alt"></i>');
    document.getElementById(id).className = "btn btn-danger btn-lg"; 
  } else {
    generateFood();
  }
}

//generates snake + initial snake position
function loadSnake() {
  for (var i = 1; i <= 15; i++) {
    $('#table').append(`
      <tr></tr>
    `)
    for (var j = 1; j <= 15; j++) {
      $('#table').append(`
        <td><button type="button" class="btn btn-secondary btn-lg" id = "` + i + + j +`"><i class="las la-stop"></i></button></td>
      `);
      if ((i == 1 && j == 1) || (i == 1 && j == 2) || (i == 1 && j == 3)) {
        var id = i + String(j);
        lengthenSnake(id);
        snakeRow.push(i);
        snakeColumn.push(j);
        table[i][j] = 1;
      }
    }
  }
  generateFood();
}

//changes the snake's direction
document.addEventListener('keyup', (event) => {
    var headRow = snakeRow[snakeRow.length - 1];
    var headColumn = snakeColumn[snakeColumn.length - 1];
    if (event.key == 'ArrowUp') {
      if (headRow - 1 >= 1 && table[headRow - 1][headColumn] != 1) {
        clearTimeout(timeout);
        updateSnake(headRow - 1, headColumn, "down");
      } else {
        lostGame();
      }
    } else if (event.key == 'ArrowDown') {
      if (headRow + 1 <= 15 && table[headRow + 1][headColumn] != 1) {
        clearTimeout(timeout);
        updateSnake(headRow + 1, headColumn, "up");
      } else {
        lostGame();
      }
    } else if (event.key == 'ArrowLeft') {
      if (headColumn - 1 >= 1 && table[headRow][headColumn - 1] != 1) {
        clearTimeout(timeout);
        updateSnake(headRow, headColumn - 1, "left");
      } else {
        lostGame();
      }
    } else if (event.key == 'ArrowRight') {
      if (headColumn + 1 <= 15 && table[headRow][headColumn + 1] != 1) {
        clearTimeout(timeout);
        updateSnake(headRow, headColumn + 1, "right");
      } else {
        lostGame();
      }
    }
});

//makes the snake move in the wanted direction every half a second.
function updateSnake(row, column, key) {
  //trb sa pun conditia daca e in tablea sau nu
  if (table[row][column] == 0) {
    table[snakeRow[0]][snakeColumn[0]] = 0;
    var firstId = snakeRow[0] + String(snakeColumn[0]);
    document.getElementById(firstId).innerHTML = ('󠀠󠀠<i class="las la-stop"></i>');
    document.getElementById(firstId).className = "btn btn-secondary btn-lg"; 
    snakeRow.shift();
    snakeColumn.shift();
    snakeRow.push(row);
    snakeColumn.push(column);
    table[row][column] = 1;
    var secondId = row + String(column);
    lengthenSnake(secondId);
  } else if (table[row][column] == 2) {
    snakeRow.push(row);
    snakeColumn.push(column);
    table[row][column] = 1;
    var id = row + String(column);
    lengthenSnake(id);
    score++;
    document.getElementById("score").innerHTML = "Score: " + score; 
    generateFood();
  }
  if (key == "right") {
    timeout = setTimeout(function(){updateSnake(row, column + 1, "right")}, 500);
  }
  if (key == "left") {
    timeout = setTimeout(function(){updateSnake(row, column - 1, "left")}, 500);
  }
  if (key == "up") {
    timeout = setTimeout(function(){updateSnake(row + 1, column, "up")}, 500);
  }
  if (key == "down") {
    timeout = setTimeout(function(){updateSnake(row - 1, column, "down")}, 500);
  }
}

function lengthenSnake(id) {
    document.getElementById(id).innerHTML = ('󠀠󠀠<i class="las la-horse-head"></i>');
    document.getElementById(id).className = "btn btn-success btn-lg"; 
}

function lostGame() {
    document.getElementById("status").innerHTML = "You lost! Please restart!";
    document.getElementById("status").style.color = "red";
}

function restartGame() {
  location.reload();
}