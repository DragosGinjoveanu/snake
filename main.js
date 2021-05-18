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
      clearTimeout(timeout);
      checkSnake(headRow - 1, headColumn, "up");
    } else if (event.key == 'ArrowDown') {
      clearTimeout(timeout);
      checkSnake(headRow + 1, headColumn, "down");
    } else if (event.key == 'ArrowLeft') {
      clearTimeout(timeout);
      checkSnake(headRow, headColumn - 1, "left");
    } else if (event.key == 'ArrowRight') {
      clearTimeout(timeout);
      checkSnake(headRow, headColumn + 1, "right");
    }
});

//makes the snake move in the wanted direction every half a second.
function updateSnake(row, column, key) {
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
    timeout = setTimeout(function(){checkSnake(row, column + 1, "right")}, 500);
  }
  if (key == "left") {
    timeout = setTimeout(function(){checkSnake(row, column - 1, "left")}, 500);
  }
  if (key == "up") {
    timeout = setTimeout(function(){checkSnake(row - 1, column, "up")}, 500);
  }
  if (key == "down") {
    timeout = setTimeout(function(){checkSnake(row + 1, column, "down")}, 500);
  }
}

//checks if snake is on the game board
function checkSnake(row, column, key) {
  if (row >= 1 && row <= 15 && column >= 1 && column <= 15 && table[row][column] != 1) {
    updateSnake(row, column, key);
  } else {
    lostGame();
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
