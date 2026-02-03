// --- SISTEMA DE ÁUDIO WEB API ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'tick') {
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.05, now);
        osc.start(now);
        osc.stop(now + 0.05);
    }
    else if (type === 'stop') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(200, now + 0.6);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
    }
    else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554, now + 0.1); // C#
        osc.frequency.setValueAtTime(659, now + 0.2); // E
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
    }
}

// --- DATABASE DE TEMAS ---
const themesDB = {
    classico: ["Nome", "CEP (Lugar)", "Animal", "Cor", "Objeto", "Fruta/Comida", "Profissão", "Marca", "Filme/Série", "Adjetivo"],
    futebol: ["Time Brasil", "Time Europa", "Jogador Atual", "Lenda (Aposentado)", "Técnico", "Estádio", "Gíria Bola", "País Copa", "Marca Esporte", "Posição"],
    geek: ["Super-Herói", "Vilão", "Videogame", "Anime/Desenho", "App/Site", "Personagem Star Wars", "Linguagem Prog", "Youtuber", "Filme Sci-Fi", "Gadget"],
    zoeira: ["Minha Sogra é...", "Motivo Divórcio", "Cheiro de...", "Nome de Totó", "Coisa que Gruda", "Presente Ruim", "Sabor Pizza Bizarro", "Lugar Esconderijo", "Medo Bobo", "Desculpa Atraso"],
    impossivel: ["Elemento Químico", "Capital País", "Raça Cão", "Parte do Corpo", "Instrumento Musical", "Marca Carro Luxo", "Nome de Flor", "Doença", "Palavra Inglês", "Escritor Famoso"]
};

// --- CONFIGURAÇÃO P2P (Google STUN) ---
const peer = new Peer(null, {
    config: { 'iceServers': [{ url: 'stun:stun.l.google.com:19302' }] },
    debug: 1
});

// ESTADO GLOBAL
let myId = null;
let myName = "Player";
let myAvatar = "😎";
let isHost = false;
let connections = []; // Apenas Host usa
let players = [];
let receivedScores = 0;
let currentMode = 'classico';
let gameInterval;

// --- PEERJS EVENTS ---
peer.on('open', (id) => {
    myId = id;
    console.log("ID Gerado:", id);
});

peer.on('connection', (conn) => {
    connections.push(conn);
    conn.on('data', (data) => {
        if (isHost) handleHostData(data, conn);
    });
    conn.on('close', () => {
        players = players.filter(p => p.id !== conn.peer);
        broadcast({ type: 'UPDATE_PLAYERS', players });
    });
});

// --- UI LOGIC ---
function selectAvatar(av) {
    myAvatar = av;
    document.querySelectorAll('.avatar-opt').forEach(e => e.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
}

function goToLobby() {
    // Tenta iniciar audio context no clique do usuário
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const nameInput = document.getElementById('my-name').value.trim();
    if (!nameInput) return alert("Coloque um nome!");

    myName = nameInput;
    document.getElementById('my-avatar-display').innerText = myAvatar;
    document.getElementById('my-name-display').innerText = myName;

    switchScreen('screen-lobby');
}

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// --- HOST LOGIC ---
function createRoom() {
    isHost = true;
    document.getElementById('lobby-setup').classList.add('hidden');
    document.getElementById('lobby-room').classList.remove('hidden');
    document.getElementById('host-controls').classList.remove('hidden');
    document.getElementById('display-room-id').innerText = myId;

    players = [{ id: myId, name: myName, avatar: myAvatar, score: 0 }];
    renderPlayers();
}

function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-pill').forEach(b => b.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
}

function hostStartGame() {
    if (players.length < 2) return alert("Precisa de pelo menos 2 jogadores!");

    const alphabet = "ABCDEFGHILMNOPQRSTUVZ";
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const themes = themesDB[currentMode];

    // Embaralha para Zoeira/Impossivel
    const finalThemes = (currentMode === 'zoeira' || currentMode === 'impossivel')
        ? themes.sort(() => 0.5 - Math.random()).slice(0, 8)
        : themes;

    broadcast({ type: 'START_ROUND', letter, themes: finalThemes });
    startGame(letter, finalThemes);
}

// --- GUEST LOGIC ---
function joinRoom() {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const code = document.getElementById('room-code-input').value.trim();
    if (!code) return alert("Cole o código!");

    isHost = false;
    const conn = peer.connect(code);

    conn.on('open', () => {
        conn.send({ type: 'JOIN', name: myName, avatar: myAvatar });
        document.getElementById('lobby-setup').classList.add('hidden');
        document.getElementById('lobby-room').classList.remove('hidden');
        document.getElementById('guest-waiting').classList.remove('hidden');
        document.getElementById('display-room-id').innerText = code;
    });

    conn.on('data', handleGuestData);
    peer.hostConn = conn; // Salva para uso futuro
}

// --- DATA HANDLING ---
function broadcast(data) {
    if (!isHost) return;
    connections.forEach(c => c.send(data));
}

function handleHostData(data, conn) {
    switch (data.type) {
        case 'JOIN':
            players.push({ id: conn.peer, name: data.name, avatar: data.avatar, score: 0 });
            broadcast({ type: 'UPDATE_PLAYERS', players });
            renderPlayers();
            break;
        case 'STOP_SIGNAL':
            broadcast({ type: 'GAME_OVER', stopper: data.name });
            handleGameOver(data.name);
            break;
        case 'SUBMIT_SCORE':
            const p = players.find(x => x.id === data.id);
            if (p) p.score += data.points;
            receivedScores++;
            checkAllScoresReceived();
            break;
    }
}

function handleGuestData(data) {
    switch (data.type) {
        case 'UPDATE_PLAYERS':
            players = data.players;
            renderPlayers();
            break;
        case 'START_ROUND':
            startGame(data.letter, data.themes);
            break;
        case 'GAME_OVER':
            handleGameOver(data.stopper);
            break;
        case 'SHOW_RANKING':
            showRanking(data.players);
            break;
        case 'COOLDOWN':
            document.getElementById('cooldown-timer').innerText = data.sec;
            break;
    }
}

// --- GAMEPLAY ---
function startGame(letter, themes) {
    switchScreen('screen-game');
    document.getElementById('game-letter').innerText = letter;

    const form = document.getElementById('game-form');
    form.innerHTML = '';
    themes.forEach(t => {
        form.innerHTML += `
            <div class="game-input-group">
                <label>${t}</label>
                <input type="text" data-theme="${t}" autocomplete="off">
            </div>
        `;
    });

    // Timer
    let sec = 0;
    const maxTime = 120;
    clearInterval(gameInterval);

    gameInterval = setInterval(() => {
        sec++;
        playSound('tick'); // Som do relógio
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        document.getElementById('game-timer').innerText = `${m}:${s < 10 ? '0' + s : s}`;

        const pct = Math.max(0, 100 - (sec / maxTime) * 100);
        document.getElementById('progress-fill').style.width = `${pct}%`;
    }, 1000);
}

function sendStop() {
    if (isHost) {
        broadcast({ type: 'GAME_OVER', stopper: myName });
        handleGameOver(myName);
    } else {
        peer.hostConn.send({ type: 'STOP_SIGNAL', name: myName });
    }
}

function handleGameOver(stopperName) {
    clearInterval(gameInterval);
    playSound('stop'); // Som de STOP

    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    alert(`🛑 STOP! ${stopperName} parou o tempo!`);

    // Check List
    const list = document.getElementById('check-list');
    list.innerHTML = '';
    const letter = document.getElementById('game-letter').innerText;

    document.querySelectorAll('#game-form input').forEach(inp => {
        const val = inp.value.trim();
        const isValid = val.toUpperCase().startsWith(letter);

        list.innerHTML += `
            <div class="check-row">
                <div style="flex:1">
                    <div style="font-size:0.8rem; color:#94a3b8">${inp.dataset.theme}</div>
                    <div style="font-size:1.1rem; color:${val ? 'white' : '#555'}">${val || '---'}</div>
                </div>
                <input type="checkbox" class="check-toggle" ${isValid && val ? 'checked' : ''}>
            </div>
        `;
    });

    switchScreen('screen-check');
    const btn = document.getElementById('btn-submit-score');
    btn.innerText = "CONFIRMAR PONTOS";
    btn.disabled = false;
}

function submitScore() {
    const points = document.querySelectorAll('.check-toggle:checked').length * 10;
    const btn = document.getElementById('btn-submit-score');
    btn.innerText = "Aguardando todos...";
    btn.disabled = true;

    if (isHost) {
        const me = players.find(p => p.id === myId);
        me.score += points;
        receivedScores = 1;
        checkAllScoresReceived();
    } else {
        peer.hostConn.send({ type: 'SUBMIT_SCORE', id: myId, points });
    }
}

function checkAllScoresReceived() {
    if (receivedScores >= players.length) {
        receivedScores = 0;
        players.sort((a, b) => b.score - a.score);
        broadcast({ type: 'SHOW_RANKING', players });
        showRanking(players);

        let cd = 15;
        const cdInt = setInterval(() => {
            cd--;
            broadcast({ type: 'COOLDOWN', sec: cd });
            document.getElementById('cooldown-timer').innerText = cd;
            if (cd <= 0) {
                clearInterval(cdInt);
                hostStartGame();
            }
        }, 1000);
    }
}

function showRanking(sortedPlayers) {
    switchScreen('screen-ranking');
    const list = document.getElementById('ranking-list');
    list.innerHTML = '';

    // Efeito Confete e Som
    playSound('win');
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#6366f1', '#f43f5e', '#ffffff'] });

    sortedPlayers.forEach((p, i) => {
        list.innerHTML += `
            <div class="rank-card ${i === 0 ? 'top1' : ''}">
                <div style="font-size:1.5rem; margin-right:15px">${p.avatar}</div>
                <div style="flex:1">
                    <div style="font-weight:bold">${p.name}</div>
                    <div style="font-size:0.8rem; color:#94a3b8">#${i + 1}</div>
                </div>
                <div class="rank-score">${p.score}</div>
            </div>
        `;
    });
}

// --- UTILS ---
function renderPlayers() {
    const grid = document.getElementById('players-grid');
    grid.innerHTML = '';
    document.getElementById('player-count').innerText = players.length;

    players.forEach(p => {
        grid.innerHTML += `
            <div class="player-chip ${p.id === myId ? 'me' : ''}">
                <span class="av">${p.avatar}</span>
                <span>${p.name}</span>
            </div>
        `;
    });
}

function copyRoomCode() {
    navigator.clipboard.writeText(myId);
    const el = document.querySelector('.code-display');
    el.style.borderColor = '#4ade80';
    setTimeout(() => el.style.borderColor = 'transparent', 500);
}