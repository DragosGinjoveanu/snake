//game board
var table = [];
for (var i = 1; i <= 9; i++) {
    table[i] = [];
    for (var j = 1; j <= 9; j++) {
        table[i][j] = 0;
    }
}

var score = 0;
var snakeRow = [];
var snakeColumn = [];
var timeout;

//checks if the snake is in table
function isInTable(row, column) {
  if (row >= 1 && row <= 9 && column >= 1 && column <= 9) {
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

//generates the next "apple" you need to eat
function generateFood() {
  var i = Math.floor(Math.random() * 9 + 1);
  var j = Math.floor(Math.random() * 9 + 1);
  if (isInSnake(i, j) == 0) {
    table[i][j] = 2;
    var id = i + " " + String(j);
    document.getElementById(id).innerHTML = ('󠀠󠀠<i class="las la-apple-alt"></i>');
    document.getElementById(id).className = "btn btn-danger btn-lg"; 
  } else {
    generateFood();
  }
}

function lengthenSnake(id) {
    document.getElementById(id).innerHTML = ('󠀠󠀠<i class="las la-horse-head"></i>');
    document.getElementById(id).className = "btn btn-success btn-lg"; 
}

//generates snake + initial snake position
function loadSnake() {
  for (var i = 1; i <= 9; i++) {
    $('#table').append(`
      <tr></tr>
    `)
    for (var j = 1; j <= 9; j++) {
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

//moves snake's head
function updateSnakeHead(row, column) {
  score++;
  document.getElementById("score").innerHTML = "Score: " + score; 
  generateFood();
}

//moves snake's tail
function updateSnakeTail(row, column) {
  table[snakeRow[0]][snakeColumn[0]] = 0;
  var id = snakeRow[0] + " " + String(snakeColumn[0]);
  document.getElementById(id).innerHTML = ('󠀠󠀠<i class="las la-stop"></i>');
  document.getElementById(id).className = "btn btn-secondary btn-lg"; 
  snakeRow.shift();
  snakeColumn.shift();
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
  var arrow = {
    ArrowUp: [row - 1, column],
    ArrowDown: [row + 1, column],
    ArrowLeft: [row, column - 1],
    ArrowRight: [row, column + 1]
  };
  var cell = arrow[key];
  timeout = setTimeout(function(){checkSnake(parseInt(cell[0]), parseInt(cell[cell.length - 1]), key)}, 500);
}

function lostGame() {
    document.getElementById("status").innerHTML = "You lost! Please restart!";
    document.getElementById("status").style.color = "red";
    document.getElementById("table").innerHTML = " ";
}

//checks if snake is on the game board
function checkSnake(row, column, key) {
  if (isInTable(row, column) && isInSnake(row, column) == 0) {
    updateSnake(row, column, key);
  } else {
    lostGame();
  }
}

//changes the snake's direction
document.addEventListener('keyup', (event) => {
    var headRow = snakeRow[snakeRow.length - 1];
    var headColumn = snakeColumn[snakeColumn.length - 1];
    clearTimeout(timeout);
    var arrow = {
      ArrowUp: [headRow - 1, headColumn],
      ArrowDown: [headRow + 1, headColumn],
      ArrowLeft: [headRow, headColumn - 1],
      ArrowRight: [headRow, headColumn + 1]
    };
    for (const [key, value] of Object.entries(arrow)) {
      if(event.key == `${key}`) {
        var cell = `${value}`;
        checkSnake(parseInt(cell[0]), parseInt(cell[cell.length - 1]), event.key);
      }
    }
});

function restartGame() {
  location.reload();
}
