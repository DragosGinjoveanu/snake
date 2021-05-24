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
  var i = Math.floor(Math.random() * 15 + 1);
  var j = Math.floor(Math.random() * 15 + 1);
  if (isInSnake(i, j) == 0) {
    table[i][j] = 2;
    var id = i + " " + String(j);
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
        <td><button type="button" class="btn btn-secondary btn-lg" id = "` + i + " " + j +`"><i class="las la-stop"></i></button></td>
      `);
    }
  }
  var i = 1;
  for (var j = 1; j <= 3; j++) {
    var id = i + " " + String(j);
    lengthenSnake(id);
    snakeRow.push(i);
    snakeColumn.push(j);
    table[i][j] = 1;
  }
  generateFood();
}

//changes the snake's direction
document.addEventListener('keyup', (event) => {
    var headRow = snakeRow[snakeRow.length - 1];
    var headColumn = snakeColumn[snakeColumn.length - 1];
    clearTimeout(timeout);
    var arrow = {};
    if (event.key == 'ArrowUp') {
      arrow.head = headRow - 1;
      arrow.column = headColumn;
      //checkSnake(headRow - 1, headColumn, "up");
    } else if (event.key == 'ArrowDown') {
      arrow.head = headRow + 1;
      arrow.column = headColumn;
      //checkSnake(headRow + 1, headColumn, "down");
    } else if (event.key == 'ArrowLeft') {
      arrow.head = headRow;
      arrow.column = headColumn - 1;
     // checkSnake(headRow, headColumn - 1, "left");
    } else if (event.key == 'ArrowRight') {
      arrow.head = headRow;
      arrow.column = headColumn + 1;
      //checkSnake(headRow, headColumn + 1, "right");
    }
    checkSnake(arrow.head, arrow.column, event.key);
});

//moves snake's tail
function updateSnakeTail(row, column) {
  table[snakeRow[0]][snakeColumn[0]] = 0;
  var id = snakeRow[0] + " " + String(snakeColumn[0]);
  document.getElementById(id).innerHTML = ('󠀠󠀠<i class="las la-stop"></i>');
  document.getElementById(id).className = "btn btn-secondary btn-lg"; 
  snakeRow.shift();
  snakeColumn.shift();
}

//moves snake's head
function updateSnakeHead(row, column) {
  score++;
  document.getElementById("score").innerHTML = "Score: " + score; 
  generateFood();
}

//makes the snake move in the wanted direction every half a second.
function updateSnake(row, column, key) {
  snakeRow.push(row);
  snakeColumn.push(column);
  var id = row + " " + String(column);
  lengthenSnake(id);
  if (table[row][column] == 0) {
    updateSnakeTail(row, column);
  } else if (table[row][column] == 2) {
    updateSnakeHead(row, column);
  }
  table[row][column] = 1;
  if (key == "ArrowRight") {
    timeout = setTimeout(function(){checkSnake(row, column + 1, "ArrowRight")}, 500);
  }
  if (key == "ArrowLeft") {
    timeout = setTimeout(function(){checkSnake(row, column - 1, "ArrowLeft")}, 500);
  }
  if (key == "ArrowUp") {
    timeout = setTimeout(function(){checkSnake(row - 1, column, "ArrowUp")}, 500);
  }
  if (key == "ArrowDown") {
    timeout = setTimeout(function(){checkSnake(row + 1, column, "ArrowDown")}, 500);
  }
}

//checks if snake is on the game board
function checkSnake(row, column, key) {
  if (isInTable(row, column) && isInSnake(row, column) == 0) {
    updateSnake(row, column, key);
  } else {
    lostGame();
  }
}

//checks if the snake is in table
function isInTable(row, column) {
  if (row >= 1 && row <= 15 && column >= 1 && column <= 15) {
    return true;
  }
  return false;
}

//checks if the given block is part of the snake
function isInSnake(row, column) {
  if (table[row][column] == 1) {
    return true;
  }
  return false;
}

function lengthenSnake(id) {
    document.getElementById(id).innerHTML = ('󠀠󠀠<i class="las la-horse-head"></i>');
    document.getElementById(id).className = "btn btn-success btn-lg"; 
}

function lostGame() {
    document.getElementById("status").innerHTML = "You lost! Please restart!";
    document.getElementById("status").style.color = "red";
    document.getElementById("table").innerHTML = " ";
}

function restartGame() {
  location.reload();
}
