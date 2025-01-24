const filenameInput = document.getElementById('filename');
const saveButton = document.getElementById('save');

saveButton.addEventListener('click', () => {
    const filename = filenameInput.value;
    if (!filename) {
        alert('ファイル名を入力してください');
        return;
    }

    const dataURL = canvas.toDataURL('image/png');

    // ダウンロードリンクを作成
    const link = document.createElement('a');
    link.download = filename + '.png';
    link.href = dataURL;
    link.click();
});
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        
        link.download = 'canvas.png';
        link.href = dataURL;
        link.click();
    }
  });

