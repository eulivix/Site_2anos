/* =========================
   CONTADOR (tempo juntos)
   ========================= */

// Coloque aqui a data/hora que o relacionamento começou (formato: YYYY-MM-DD HH:MM:SS)
const inicio = new Date("2022-08-10 00:00:00");

function atualizarTempo(){
  const agora = new Date();
  const diff = agora - inicio;

  const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const dias = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365);
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  const texto = `${anos} anos, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
  document.getElementById("contador").textContent = texto;
}

setInterval(atualizarTempo, 1000);
atualizarTempo();


/* =========================
   CORAÇÕES CAINDO
   ========================= */

const heartsContainer = document.getElementById("hearts-container");

// cria um coração com propriedades aleatórias
function criarCoracao(){
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤";

  // posição horizontal aleatória (dentro da viewport)
  const left = Math.random() * 100; // vw
  heart.style.left = left + "vw";

  // tamanho aleatório
  const size = 12 + Math.random() * 26; // px
  heart.style.fontSize = size + "px";

  // rotação inicial e animaDuration
  const duration = 4 + Math.random() * 4; // 4s a 8s
  heart.style.animationDuration = duration + "s";

  // delay negativo para criar fluxo contínuo (opcional)
  const delay = Math.random() * 2;
  heart.style.animationDelay = delay * -1 + "s";

  heartsContainer.appendChild(heart);

  // remove depois do tempo (segurança)
  setTimeout(() => {
    heart.remove();
  }, (duration + 1) * 1000);
}

// cria vários corações periodicamente
const heartInterval = setInterval(criarCoracao, 300);
// opcional: iniciar com alguns de uma vez
for(let i = 0; i < 6; i++){
  setTimeout(criarCoracao, i * 150);
}


/* =========================
   CONTROLE DE MÚSICA
   ========================= */

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let musicTocando = false;

// Ao clicar no botão, toca/pausa a música
musicBtn.addEventListener("click", async () => {
  try {
    if(!musicTocando){
      await bgMusic.play(); // tenta tocar
      musicBtn.textContent = "⏸ Pausar música";
      musicBtn.setAttribute("aria-pressed", "true");
      musicTocando = true;
    } else {
      bgMusic.pause();
      musicBtn.textContent = "▶ Tocar música";
      musicBtn.setAttribute("aria-pressed", "false");
      musicTocando = false;
    }
  } catch (err) {
    // se o navegador bloquear autoplay, mantemos o botão para o usuário interagir
    console.warn("Erro ao tentar tocar áudio:", err);
  }
});

// Se o usuário tocar qualquer lugar da página e a música não estiver tocando,
// começamos a tocar (boa prática mobile)
document.addEventListener("click", () => {
  if(!musicTocando && bgMusic.paused){
    // não forçar — apenas se quiser que o primeiro toque já comece, descomente:
    // bgMusic.play().then(() => { musicTocando = true; musicBtn.textContent = "⏸ Pausar música"; });
  }
});
