<script>
  let currentChannel = 1;

  // 初期化：チャンネル1を表示
  window.onload = () => {
    changeChannel(1);
  };

  // チャンネル切り替え処理
  function changeChannel(channelNumber) {
    currentChannel = channelNumber;

    const videoSource = document.getElementById('videoSource');
    const fallbackSource = document.getElementById('fallbackSource');
    const player = document.getElementById('livePlayer');
    const overlay = document.getElementById('overlay');

    // HLSストリームURLを更新
    const streamUrl = `https://example.com/channel${channelNumber}.m3u8`;
    videoSource.src = streamUrl;
    fallbackSource.removeAttribute('src');
    player.load();

    // 配信ステータスを確認
    fetch(streamUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // 配信中：HLS再生、オーバーレイ非表示
          overlay.style.display = 'none';
          player.load();
          player.play();
        } else {
          // 配信なし：カラーバー再生、オーバーレイ表示
          fallbackSource.src = '/fallback/colorbars.mp4';
          videoSource.removeAttribute('src');
          overlay.style.display = 'flex';
          player.load();
          player.play();
        }
      })
      .catch(() => {
        // エラー時もカラーバー再生
        fallbackSource.src = '/fallback/colorbars.mp4';
        videoSource.removeAttribute('src');
        overlay.style.display = 'flex';
        player.load();
        player.play();
      });
  }

  // OBS配信案内
  function startStreaming() {
    alert(`チャンネル${currentChannel}の配信を開始するには、OBSでストリームキー「channel${currentChannel}-key」を使ってください。`);
  }
</script>
