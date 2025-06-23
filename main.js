window.addEventListener('load', () => {
  const gridContainer = document.querySelector('#grid-container');

  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const cell = document.createElement('div');
      cell.id = `cell-${row}-${col}`;
      cell.classList.add('cell');
      gridContainer.appendChild(cell);
    }
  }
});

const grid = document.querySelector('#etch-a-sketch');
const handle = document.querySelector('.resize-handle');
const h1 = document.querySelector('h1');
const gridContainer = document.querySelector('#grid-container');

let isResizing = false;
let isPainting = false;
let lastPaintedCell = null;

function paintCell(cell) {
  if (!cell.classList.contains('cell')) return;

  let currentOpacity = parseFloat(cell.dataset.opacity) || 0;
  if (currentOpacity < 1) {
    currentOpacity = Math.min(currentOpacity + 0.1, 1);
    let randomR = Math.floor(Math.random() * 255);
    let randomG = Math.floor(Math.random() * 255);
    let randomB = Math.floor(Math.random() * 255);
    cell.style.backgroundColor = `rgba(${randomR}, ${randomG}, ${randomB}, ${currentOpacity})`;
    cell.dataset.opacity = currentOpacity;
  }
}

gridContainer.addEventListener('mousedown', (e) => {
  e.preventDefault(); //prevent cell from being draggable
  console.log(e.target.id);
  isPainting = true;
  paintCell(e.target);
});

gridContainer.addEventListener('mousemove', (e) => {
  console.log(e.target.id);
  if (isPainting && e.target !== lastPaintedCell) {
    paintCell(e.target);
    lastPaintedCell = e.target;
  }
});

document.addEventListener('mouseup', () => {
  isPainting = false;
  lastPaintedCell = null;
});

handle.addEventListener('mousedown', (e) => {
  e.preventDefault(); // prevent text selection, etc.
  isResizing = true;
  document.body.style.userSelect = 'none'; // optional: prevent selection outside the grid
});

document.addEventListener('mouseup', () => {
  if (isResizing) {
    isResizing = false;
    document.body.style.userSelect = ''; // restore selection
  }
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  // Calculate new width and height based on mouse position
  // relative to the top-left corner of the grid container
  const rect = grid.getBoundingClientRect();

  let newWidth = e.clientX - rect.left;
  let newHeight = e.clientY - rect.top;

  //set minimum sizes
  newWidth = Math.max(newWidth, 235);

  //set maximum sizes if needed
  newWidth = Math.min(newWidth, 700);

  grid.style.width = newWidth + 'px';
  h1.style.fontSize = newWidth * 0.05 + 'px';
});
