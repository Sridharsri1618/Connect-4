const COLS = 7, ROWS = 6;
let grid = [];
let currentPlayer = 'red';
const gridEl = document.getElementById('grid');
const resetBtn = document.getElementById('reset-btn');

function setup() {
  gridEl.innerHTML = '';
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.addEventListener('click', onCellClick);
      gridEl.append(cell);
    }
  }
}

function onCellClick(e) {
  const col = +e.target.dataset.c;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (grid[r][col] === null) {
      grid[r][col] = currentPlayer;
      const cell = gridEl.children[r * COLS + col];
      cell.classList.add(currentPlayer);
      if (checkWin(r, col)) {
        setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 10);
        disableClicks();
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      }
      return;
    }
  }
}

function disableClicks() {
  [...gridEl.children].forEach(c => {
    c.replaceWith(c.cloneNode(true));
  });
}

function checkWin(r, c) {
  const dirs = [
    { dr: 0, dc: 1 },  
    { dr: 1, dc: 0 },  
    { dr: 1, dc: 1 },  
    { dr: 1, dc: -1 }, 
  ];

  for (let { dr, dc } of dirs) {
    let count = 1 +
      countDir(r, c, dr, dc) +
      countDir(r, c, -dr, -dc);
    if (count >= 4) return true;
  }
  return false;
}
function countDir(r, c, dr, dc) {
  let nr = r + dr, nc = c + dc, cnt = 0;
  while (
    nr >= 0 && nr < ROWS &&
    nc >= 0 && nc < COLS &&
    grid[nr][nc] === currentPlayer
  ) {
    cnt++;
    nr += dr;
    nc += dc;
  }
  return cnt;
}
resetBtn.addEventListener('click', () => {
  currentPlayer = 'red';
  setup();
});
setup();
