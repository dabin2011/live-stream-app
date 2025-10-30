const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイル（HTML, CSS, JS, MP4など）を public フォルダから配信
app.use(express.static(path.join(__dirname, 'public')));

// ルートアクセス時に index.html を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// その他のルートは 404
app.use((req, res) => {
  res.status(404).send('ページが見つかりません');
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
});
