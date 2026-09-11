// Registra o Service Worker para permitir a instalação do PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado com sucesso!', reg))
      .catch(err => console.error('Erro ao registrar Service Worker:', err));
  });
}

// Inicializa o player do Video.js
const player = videojs('my-video');
const streamContainer = document.getElementById('stream-container');
const youtubeContainer = document.getElementById('youtube-container');
const youtubeIframe = document.getElementById('youtube-iframe');

// Função para reproduzir links .m3u8 (HLS)
function playStream(url) {
  youtubeContainer.style.display = 'none';
  youtubeIframe.src = ''; // Interrompe o vídeo do YouTube se estiver rodando
  streamContainer.style.display = 'block';

  player.src({
    src: url,
    type: 'application/x-mpegURL'
  });
  player.play();
}

// Função para reproduzir lives do YouTube
function playYouTube(liveId) {
  player.pause(); // Interrompe o player HLS se estiver rodando
  streamContainer.style.display = 'none';
  youtubeContainer.style.display = 'block';

  // Configura a URL de incorporação adaptável do YouTube
  youtubeIframe.src = `https://youtube.com{liveId}?autoplay=1`;
}

