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

let isResizing = false;

handle.addEventListener('mousedown', (e) => {
  console.log('Test');
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
  newWidth = Math.min(newWidth, 800);

  grid.style.width = newWidth + 'px';
  h1.style.fontSize = newWidth * 0.05 + 'px';
});
