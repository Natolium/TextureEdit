// カラーパレット用のキャンバス
const colorPalette = document.getElementById('colorPalette');
const paletteCtx = colorPalette.getContext('2d');

PaletteReset();

let selectedColor = null; // 選択中の色の座標を格納

// クリックイベントで選択した色を取得
colorPalette.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const imageData = paletteCtx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;

    // 選択した色をctx.fillStyleに設定
    ctx.fillStyle = color;
    console.log('選択した色:', color);

     // 選択した色のRGB値を取得
    const red = imageData[0];
    const green = imageData[1];
    const blue = imageData[2];

    // 明度を計算
    const luminance = calculateLuminance(red, green, blue);

    RectMaker(x, y, color, luminance);
});


function calculateLuminance(r, g, b) {
  // 相対的な明るさを計算する関数
  const a = 1;
  return (0.299 * r + 0.587 * g + 0.114 * b) * a;
}
function RectMaker(x, y, color, luminance) {
  const cellSize = 50; // セルのサイズ
  x = Math.floor(x / cellSize);
  y = Math.floor(y / cellSize);
  x *= cellSize;
  y *= cellSize;

  console.log(x, y);
  selectedColor = { x, y };
  prevSelectedColor = { x, y };

  // 前回選択していた色の枠を消去
  PaletteReset();

  // 明度が一定値を超えたら枠の色を白にする
  const threshold = 30; // 閾値は調整してください
  const strokeStyle = luminance < threshold ? 'white' : 'black';
  console.log(luminance, luminance < threshold, strokeStyle)

  // 選択中の色に枠を描画 (50pxのセルに合わせて調整)
  paletteCtx.strokeStyle = strokeStyle;
  paletteCtx.lineWidth = 8;
  paletteCtx.strokeRect(selectedColor.x + 4, selectedColor.y + 4, 42, 42); // 枠の内側が白くならないように調整

  // 選択された色を塗りつぶす
  paletteCtx.fillStyle = color;
  paletteCtx.fillRect(selectedColor.x + 4, selectedColor.y + 4, 42, 42);
}
function PaletteReset () {
  // カラーパレットに色を塗りつぶす
  paletteCtx.fillStyle = 'red';
  paletteCtx.fillRect(0, 0, 50, 50);

  paletteCtx.fillStyle = 'green';
  paletteCtx.fillRect(50, 0, 50, 50);

  paletteCtx.fillStyle = 'blue';
  paletteCtx.fillRect(0, 50, 50, 50);

  paletteCtx.fillStyle = 'black';
  paletteCtx.fillRect(50, 50, 50, 50);
}



let isDragging = false;
let offsetX, offsetY;

colorPalette.addEventListener('mousedown', (event) => {
  colorPalette.classList.add('dragging');
  isDragging = true;
  offsetX = event.clientX - colorPalette.offsetLeft;
  offsetY = event.clientY - colorPalette.offsetTop;
});

document.addEventListener('mouseup', () => {
  colorPalette.classList.remove('dragging');
  isDragging = false;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    colorPalette.style.left = event.clientX - offsetX + 'px';
    colorPalette.style.top = event.clientY - offsetY + 'px';
  }
});