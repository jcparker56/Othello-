const resetButton = document.getElementById('resetButton')

var player = 1; //1 for White, 2 for Black
var grid = [
  [0, 0, 0, 0, 0, 0, 0, 0], //0    what is the name of this row: grid[0][2] = 9
  [0, 0, 0, 0, 0, 0, 0, 0], //1
  [0, 0, 0, 0, 0, 0, 0, 0], //2
  [0, 0, 0, 1, 2, 0, 0, 0], //3
  [0, 0, 0, 2, 1, 0, 0, 0], //4
  [0, 0, 0, 0, 0, 0, 0, 0], //5
  [0, 0, 0, 0, 0, 0, 0, 0], //6
  [0, 0, 0, 0, 0, 0, 0, 0] //7
]; //0,1 ,2, 3, 4, 5, 6, 7

function otherPlayer() {
  if (player == 1) {
    return (2)
  } else {
    return (1)
  }
}

function north(row, col) {
  var y
  for (y = row - 1; y >= 0; y--) {
    //check for brother piece
    if (grid[y][col] == player) {
      break;
    }
    if (grid[y][col] == 0) {
      break;
    }
  }
  //brother is at grid(i, col)
  if (y >= 0 && grid[y][col] == player) {
    y++
    while (y < row) {
      if (grid[y][col] != player) {
        grid[y][col] = player
      }
      y++
    }
  }
}

function south(row, col) {
  var y
  for (y = row + 1; y <= 7; y++) {
    //check for brother piece
    if (grid[y][col] == player) {
      break;
    }
    if (grid[y][col] == 0) {
      break;
    }
  }
  //brother is at grid(i, col)
  if (y <= 7 && grid[y][col] == player) {
    y--
    while (y > row) {
      if (grid[y][col] != player) {
        grid[y][col] = player
      }
      y--
    }
  }
}


function east(row, col) {
  var x
  for (x = col + 1; x <= 7; x++) {
    //check for brother piece
    if (grid[row][x] == player) {
      break;
    }
    if (grid[row][x] == 0) {
      break;
    }
  }
  //brother is at grid(i, col)
  if (x <= 7 && grid[row][x] == player) {
    x--
    while (x > col) {
      if (grid[row][x] != player) {
        grid[row][x] = player
      }
      x--
    }
  }
}

function west(row, col) {
  var x
  for (x = col - 1; x >= 0; x--) {
    //check for brother piece
    if (grid[row][x] == player) {
      break;
    }
    if (grid[row][x] == 0) {
      break;
    }
  }
  //brother is at grid(i, col)
  if (x >= 0 && grid[row][x] == player) {
    x++
    while (x < col) {
      if (grid[row][x] != player) {
        grid[row][x] = player
      }
      x++
    }
  }
}

function northE(row, col) {
  var r = row
  var c = col

  while (true) {
    r--
    c++
    if (r < 0) {
      return;
    }
    if (c > 7) {
      return;
    }
    if (grid[r][c] == 0) {
      return;
    }
    if (grid[r][c] == player) {
      break;
    }
  }
  while (true) {
    r++
    c--
    if (r == row) {
      break;
    }
    grid[r][c] = player
  }
}

function northW(row, col) {
  var r = row
  var c = col

  while (true) {
    r--
    c--
    if (r < 0) {
      return;
    }
    if (c > 7) {
      return;
    }
    if (grid[r][c] == 0) {
      return;
    }
    if (grid[r][c] == player) {
      break;
    }
  }
  while (true) {
    r++
    c++
    if (r == row) {
      break;
    }
    grid[r][c] = player
  }
}

function southW(row, col) {
  var r = row
  var c = col

  while (true) {
    r++
    c--
    if (r > 7) {
      return;
    }
    if (c < 0) {
      return;
    }
    if (grid[r][c] == 0) {
      return;
    }
    if (grid[r][c] == player) {
      break;
    }
  }
  while (true) {
    r--
    c++
    if (r == row) {
      break;
    }
    grid[r][c] = player
  }
}

function southE(row, col) {
  var r = row
  var c = col

  while (true) {
    r++
    c++
    if (r > 7) {
      return;
    }
    if (c > 7) {
      return;
    }
    if (grid[r][c] == 0) {
      return;
    }
    if (grid[r][c] == player) {
      break;
    }
  }
  while (true) {
    r--
    c--
    if (r == row) {
      break;
    }
    grid[r][c] = player
  }
}





resetButton.addEventListener('click', refreshBoard)

function selectCell(row, col) {
  console.log('selectCell:' + row + ',' + col)
  if ((player == 1) && (grid[row][col] == 0)) {
    grid[row][col] = 1;
    document.getElementById("colorTurn").innerHTML = "Black Turn";
  } else if ((player == 2) && (grid[row][col] == 0)) {
    grid[row][col] = 2;
    document.getElementById("colorTurn").innerHTML = "White Turn";
  }

  flankMove(row, col)
  endgame()
  player = otherPlayer()
  refreshBoard();
}



function refreshBoard() {
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      if (grid[row][col] == 0) {
        document.getElementById("cell" + row + col).childNodes[1].style.backgroundColor = "#129104";
      } else if (grid[row][col] == 1) { //1 for white
        document.getElementById("cell" + row + col).childNodes[1].style.backgroundColor = "#FFFFFF";
      } else if (grid[row][col] == 2) { //2 for black
        document.getElementById("cell" + row + col).childNodes[1].style.backgroundColor = "#000000";
      }
    }
  }
}


function flankMove(row, col) {
  north(row, col)
  south(row, col)
  east(row, col)
  west(row, col)
  northE(row, col)
  northW(row, col)
  southE(row, col)
  southW(row, col)
}

function tallyscore() {
  var scores = {
    0:0,
    1:0,
    2:0
  }

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (grid[i][j] == 0) {
        scores[0]++
      }
      if (grid[i][j] == 1) {
        scores[1]++
      }
      if (grid[i][j] == 2) {
        scores[2]++
      }
    }
  }

  return scores
}

function endgame() {
  const winningMessageTextElement = document.getElementById('data-congrats-message-text')
  var scores = tallyscore()

  if (scores[0] == 0) {
    if (scores[1] > scores[2]) {
      winningMessageTextElement.innerText = "White Wins"
    }
    else
      winningMessageTextElement.innerText = "Black Wins"
    }
  }


refreshBoard()