var canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d', { willReadFrequently: true });
let history = []; // 描画履歴を格納する配列
let redoHistory = []; // リドゥ用の履歴


drawCheckeredPattern(canvas, ctx, 10);
let isDrawing = false; // 描画中のフラグ

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    drawDot(event.offsetX, event.offsetY);
    redoHistory = [];
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        drawDot(event.offsetX, event.offsetY);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    var context = ctx;
    history.push(context.getImageData(0, 0, canvas.width, canvas.height));
    console.log(history, redoHistory);
});

function drawDot(x, y) {
    // 10px単位に丸める処理
    x = Math.round(x / 10) * 10;
    y = Math.round(y / 10) * 10;

    ctx.fillRect(x, y, 10, 10);
}

document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'z') {
    undo();
  } else if (event.ctrlKey && event.shiftKey && event.key === 'y') {
    redo();
  }
});

const MAX_HISTORY_LENGTH = 24;

// アンドゥ処理
function undo() {
    if (history.length > 0) {
      console.log(history, redoHistory);
      redoHistory.push(history.pop());
      ctx.putImageData(history[history.length - 1], 0, 0);

      // 履歴数が最大を超えたら、古い履歴を削除
      if (history.length > MAX_HISTORY_LENGTH) {
      history.shift();
      }
    }
  }
  // リドゥ処理
  function redo() {
    if (redoHistory.length > 0) {
      history.push(redoHistory.pop());
      ctx.putImageData(history[history.length - 1], 0, 0);
    }
  }
  
function drawCheckeredPattern(canvas, ctx, cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      for (let y = 0; y < canvas.height; y += cellSize) {
        ctx.fillStyle = (x + y) % 2 === 0 ? 'gray' : 'white';
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
  }