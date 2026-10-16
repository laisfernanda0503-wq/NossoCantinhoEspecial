
const startBtn = document.querySelector('#startBtn');
const surprises = document.querySelector('#surprises');
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modalContent');
const closeModal = document.querySelector('#closeModal');
const hearts = document.querySelector('#hearts');
const toast = document.querySelector('#toast');

let reasonsFound = 0;

const reasons = [
  'Porque você consegue melhorar meu dia.',
  'Porque eu amo seu jeitinho, até nas pequenas coisas.',
  'Porque estar com você faz os momentos simples valerem muito (me Estressa muito também mas é meu Grude ).',
  'Porque eu posso ser eu mesma ao seu lado.',
  'Porque ainda quero viver muitas histórias com você.'
];

startBtn.addEventListener('click', () => {
  surprises.scrollIntoView({ behavior: 'smooth' });
  showToast('Sua primeira surpresa está aqui ❤️');
  burstHearts(12);
});

function openModal(content) {
  modalContent.innerHTML = content;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function hideModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

closeModal.addEventListener('click', hideModal);

modal.addEventListener('click', event => {
  if (event.target === modal) hideModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') hideModal();
});

document.querySelectorAll('[data-open]').forEach(card => {
  card.addEventListener('click', () => {
    const type = card.dataset.open;

    if (type === 'letter') {
      openModal(`
        <div style="font-size:2.5rem">💌</div>
        <h2>Uma cartinha pra você</h2>
        <p>
          Feliz aniversário, meu amor! ❤️
          Hoje é seu dia, mas quem ganhou um presente
          fui eu por ter você na minha vida.
        </p>
        <p>
          Espero que seu novo ciclo seja cheio de
          felicidade, conquistas e motivos pra sorrir.
          Quero continuar construindo memórias lindas
          ao seu lado. Você é muito especial pra mim.
        </p>
        <p>Com todo meu amor (Ass. Batman). </p>
      `);
    }

    if (type === 'reasons') {
      reasonsFound = 0;
      showReason();
    }

    if (type === 'secret') {
      openModal(`
        <div style="font-size:2.5rem">🔐</div>
        <h2>Missão secreta</h2>
        <p>Qual é a máquina de quatro rodas que você ama?</p>
        <button class="primary-btn" id="golBtn">
          Meu Golzinho 
        </button>
      `);

      document.querySelector('#golBtn').addEventListener('click', () => {
        openModal(`
          <div style="font-size:3rem"></div>
          <h2>Segredo desbloqueado!</h2>
          <p>
            Eu sei que tem um Gol G6 ocupando
            um espacinho no seu coração...
            mas espero ter conquistado meu lugar também. KKKK ❤️
          </p>
          <p>Feliz aniversário, Gol tem um Piloto e tanto</p>
        `);
        burstHearts(25);
      });
    }
  });
});

function showReason() {
  if (reasonsFound >= reasons.length) {
    openModal(`
      <div style="font-size:3rem">❤️</div>
      <h2>E ainda tem muito mais!</h2>
      <p>Não caberia tudo em uma página. Feliz aniversário, meu amor!</p>
      <button class="primary-btn" id="finishReasons">Awn ❤️</button>
    `);
    document.querySelector('#finishReasons').addEventListener('click', hideModal);
    burstHearts(12);
    return;
  }

  openModal(`
    <div class="reason-number">${reasonsFound + 1}/${reasons.length}</div>
    <h2>Um motivo pra te amar</h2>
    <p>${reasons[reasonsFound]}</p>
    <button class="primary-btn" id="nextReason">
      Próximo motivo ❤️
    </button>
  `);

  document.querySelector('#nextReason').addEventListener('click', () => {
    reasonsFound++;
    showReason();
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function burstHearts(amount = 15) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = Math.random() > .5 ? '♥' : '❤';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (14 + Math.random() * 25) + 'px';
    heart.style.animationDuration = (2 + Math.random() * 3) + 's';
    hearts.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  }
}

document.querySelector('#celebrateBtn').addEventListener('click', () => {
  burstHearts(45);
  showToast('Feliz aniversário, meu amor! ❤️🎉');
});

setInterval(() => {
  if (document.hidden) return;
  if (Math.random() > .55) burstHearts(1);
}, 1800);



/* CRIA UM CORAÇÃO GIGANTE COM MINI CORAÇÕES */
const heartCloud = document.querySelector('#heartCloud');

function createHeartCloud() {
  const total = 180;

  for (let i = 0; i < total; i++) {
    const t = Math.random() * Math.PI * 2;

    // Equação matemática do formato de um coração
    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    const heart = document.createElement('span');

    heart.className = 'heart-particle';
    heart.textContent = '♥';

    // Distribui os corações pelo interior da forma
    const fill = Math.sqrt(Math.random());

    heart.style.left = `${50 + (x * fill / 34) * 100}%`;
    heart.style.top = `${50 - (y * fill / 34) * 100}%`;

    heart.style.fontSize = `${7 + Math.random() * 12}px`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    heart.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;

    heartCloud.appendChild(heart);
  }
}

createHeartCloud();
