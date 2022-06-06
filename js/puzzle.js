//Umieść logikę gry
const puzzleTiles = document.querySelectorAll(".tile");
const puzzleBoard = document.querySelector("#board");
var TabPos = [
  [0, 0],
  [0, 100],
  [0, 200],
  [0, 300],
  [100, 0],
  [100, 100],
  [100, 200],
  [100, 300],
  [200, 0],
  [200, 100],
  [200, 200],
  [200, 300],
  [300, 0],
  [300, 100],
  [300, 200],
  [300, 300],
];

const puzzleState = [
  [puzzleTiles[0], puzzleTiles[1], puzzleTiles[2], puzzleTiles[3]],
  [puzzleTiles[4], puzzleTiles[5], puzzleTiles[6], puzzleTiles[7]],
  [puzzleTiles[8], puzzleTiles[9], puzzleTiles[10], puzzleTiles[11]],
  [puzzleTiles[12], puzzleTiles[13], puzzleTiles[14], puzzleTiles[15]],
];

function render(puzzleBoard, puzzleState) {
  puzzleState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      column.style.top = `${rowIndex * 100}px`;
      column.style.left = `${columnIndex * 100}px`;

      column.style["background-position-y"] = `-${rowIndex * 100}px`;
      column.style["background-position-x"] = `-${columnIndex * 100}px`;

      puzzleBoard.appendChild(column);
    });
  });
}

function changeTiles(x) {
  var bufor;
  var leftval = x.style.left;
  var leftvala33 = puzzleState[3][3].style.left;
  var topval = x.style.top;
  var topvala33 = puzzleState[3][3].style.top;
  if (
    x.style.top == puzzleState[3][3].style.top &&
    (parseInt(leftvala33) - parseInt(leftval) == 100 ||
      parseInt(leftvala33) - parseInt(leftval) == -100)
  ) {
    bufor = x.style.left;
    x.style.left = puzzleState[3][3].style.left;
    puzzleState[3][3].style.left = bufor;
  }
  if (
    x.style.left == puzzleState[3][3].style.left &&
    (parseInt(topvala33) - parseInt(topval) == 100 ||
      parseInt(topvala33) - parseInt(topval) == -100)
  ) {
    bufor = x.style.top;
    x.style.top = puzzleState[3][3].style.top;
    puzzleState[3][3].style.top = bufor;
  }
}

render(puzzleBoard, puzzleState);

function changePicture(x) {
  console.log(x);
  let clickedID = x.id;
  if (clickedID == "img1") {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        puzzleState[i][j].style.background = "url('../img/puzzle/picture1.png')";
      }
    }
    puzzleState[3][3].style.background = "none";
  } else if (clickedID == "img2") {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        puzzleState[i][j].style.background = "url('../img/puzzle/picture2.png')";
      }
    }
    puzzleState[3][3].style.background = "none";
  } else if (clickedID == "img3") {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        puzzleState[i][j].style.background = "url('../img/puzzle/picture3.png')";
      }
    }
    puzzleState[3][3].style.background = "none";
  } else if (clickedID == "img4") {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        puzzleState[i][j].style.background = "url('../img/puzzle/picture4.png')";
      }
    }
    puzzleState[3][3].style.background = "none";
  }
  render(puzzleBoard, puzzleState);
}

function randomTiles() {
  var i = 0,
    x;
  var TabLos = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  while (i < 16) {
    x = Math.floor(Math.random() * 16);
    if (TabLos[x] == 1) {
      puzzleTiles[i].style.left = TabPos[x][0] + "px";
      puzzleTiles[i].style.top = TabPos[x][1] + "px";
      i++;
      TabLos[x] = 0;
    }
  }
}
