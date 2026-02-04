// --- AUDIO & CONFIG ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    if (type === 'tick') { osc.frequency.setValueAtTime(800, now); gain.gain.setValueAtTime(0.05, now); osc.start(now); osc.stop(now + 0.05); }
    else if (type === 'spin') { osc.type = 'triangle'; osc.frequency.setValueAtTime(200, now); gain.gain.setValueAtTime(0.1, now); osc.start(now); osc.stop(now + 0.08); }
    else if (type === 'win') { osc.type = 'triangle'; osc.frequency.setValueAtTime(500, now); gain.gain.linearRampToValueAtTime(0, now + 1); osc.start(now); osc.stop(now + 1); }
}

// --- MEGA DICIONÁRIO IA (COMPLETO) ---
const aiDict = {
    cores: ["azul", "amarelo", "amarela", "vermelho", "vermelha", "verde", "violeta", "vinho", "branco", "branca", "bege", "bordo", "ciano", "cinza", "dourado", "fucsia", "indigo", "laranja", "lilas", "marrom", "magenta", "preto", "preta", "prata", "rosa", "roxo", "roxa", "salmao", "turquesa", "ocre", "caramelo", "creme", "gelo", "musgo", "oliva", "pessego", "sepia", "terracota"],
    animais: ["abelha", "aguia", "anta", "arara", "baleia", "boi", "bode", "borboleta", "bufalo", "burro", "cabra", "cachorro", "camelo", "canguru", "cavalo", "capivara", "coelho", "cobra", "coruja", "crocodilo", "dinossauro", "dragao", "elefante", "esquilo", "falcao", "foca", "formiga", "gato", "galo", "galinha", "gaviao", "girafa", "gorila", "hipopotamo", "hiena", "hamster", "iguana", "jacare", "jabuti", "javali", "joaninha", "leao", "leopardo", "lhama", "lobo", "lula", "macaco", "mamute", "morcego", "mosca", "naja", "onca", "orangotango", "ovelha", "panda", "pantera", "pato", "pavao", "peixe", "peru", "pinguim", "polvo", "pombo", "porco", "preguica", "quati", "raposa", "rato", "rinoceronte", "sapo", "sardinha", "tamandua", "tartaruga", "tatu", "tigre", "tubarao", "tucano", "urso", "urubu", "vaca", "veado", "zebra"],
    frutas: ["abacate", "abacaxi", "acerola", "ameixa", "amora", "banana", "cacau", "caju", "caqui", "carambola", "cereja", "coco", "cupuacu", "damasco", "figo", "framboesa", "goiaba", "graviola", "groselha", "jabuticaba", "jaca", "kiwi", "laranja", "limao", "lima", "maca", "mamao", "manga", "maracuja", "melancia", "melao", "mexerica", "mirtilo", "morango", "pera", "pessego", "pitanga", "roma", "tamarindo", "tangerina", "uva", "coco"],
    lugares: ["acre", "alagoas", "amapa", "amazonas", "bahia", "ceara", "distrito federal", "espirito santo", "goias", "maranhao", "mato grosso", "mato grosso do sul", "minas gerais", "para", "paraiba", "parana", "pernambuco", "piaui", "rio de janeiro", "rio grande do norte", "rio grande do sul", "rondonia", "roraima", "santa catarina", "sao paulo", "sergipe", "tocantins", "aracaju", "belem", "belo horizonte", "boa vista", "brasilia", "campo grande", "cuiaba", "curitiba", "florianopolis", "fortaleza", "goiania", "joao pessoa", "macapa", "maceio", "manaus", "natal", "palmas", "porto alegre", "porto velho", "recife", "rio branco", "salvador", "sao luis", "teresina", "vitoria", "brasil", "argentina", "chile", "uruguai", "paraguai", "bolivia", "peru", "colombia", "venezuela", "equador", "estados unidos", "canada", "mexico", "espanha", "portugal", "franca", "italia", "alemanha", "inglaterra", "japao", "china", "russia", "australia", "africa do sul", "angola"],
    nomes: ["alice", "amanda", "ana", "andre", "antonio", "arthur", "beatriz", "bernardo", "bianca", "bruna", "bruno", "caio", "camila", "carlos", "carol", "catarina", "cecilia", "cesar", "clara", "claudio", "daniel", "daniela", "davi", "david", "debora", "diego", "diogo", "douglas", "eduarda", "eduardo", "elias", "elisa", "emanuel", "enzo", "erick", "esther", "fabio", "fabricio", "felipe", "fernanda", "fernando", "flavia", "gabriel", "gabriela", "giovana", "guilherme", "gustavo", "heitor", "helena", "henrique", "hugo", "igor", "isabela", "isadora", "isis", "joao", "joana", "jonas", "jorge", "jose", "julia", "juliana", "julio", "kamila", "karina", "kauan", "kevin", "larissa", "laura", "lavinia", "leonardo", "leticia", "livia", "lorena", "lorenzo", "lucas", "lucca", "luana", "luis", "luiza", "maite", "manuela", "marcela", "marcelo", "marcos", "maria", "mariana", "marina", "matheus", "melissa", "miguel", "murilo", "natalia", "nicolas", "nicole", "olivia", "otavio", "paola", "paulo", "pedro", "pietra", "rafael", "rafaela", "raissa", "rebeca", "renan", "renata", "ricardo", "roberto", "rodrigo", "rogerio", "ryan", "samuel", "sarah", "sergio", "sophia", "stefany", "tatiane", "theo", "thiago", "thomas", "tiago", "tomaz", "valentina", "vanessa", "vicente", "vinicius", "vitor", "vitoria", "vivian", "willian", "yasmin", "yuri"],
    objetos: ["anel", "apito", "armario", "bacia", "banco", "balde", "bola", "boneca", "borracha", "botao", "brinco", "cadeira", "caderno", "caixa", "caneta", "caneca", "carro", "celular", "chave", "colher", "computador", "copo", "dado", "dente", "diamante", "disco", "escada", "escova", "espelho", "faca", "fita", "fogao", "foice", "garfo", "garrafa", "gaveta", "geladeira", "janela", "jarra", "joia", "lampada", "lapis", "livro", "lixeira", "luva", "mala", "martelo", "mesa", "mochila", "moeda", "mola", "navio", "oculos", "ovo", "panela", "papel", "pedra", "pente", "pia", "pilha", "pincel", "pipa", "porta", "prato", "prego", "quadro", "queijo", "radio", "relogio", "remo", "roda", "roupa", "sabao", "sacola", "sapato", "sino", "sofa", "taca", "tapete", "teclado", "televisao", "tesoura", "tijolo", "toalha", "torneira", "vaso", "vela", "vidro", "violao", "xadrez", "xicara", "ziper"],
    // GEEK & FUTEBOL
    futebol_times: ["flamengo", "corinthians", "palmeiras", "sao paulo", "vasco", "santos", "gremio", "internacional", "atletico mineiro", "cruzeiro", "botafogo", "fluminense", "bahia", "vitoria", "sport", "ceara", "fortaleza", "real madrid", "barcelona", "liverpool", "manchester united", "city", "psg", "bayern", "juventus", "milan", "chelsea", "arsenal", "boca juniors", "river plate"],
    futebol_jogadores: ["neymar", "messi", "cristiano ronaldo", "pele", "maradona", "zico", "ronaldo", "ronaldinho", "rivaldo", "romario", "kaká", "bebeto", "garrincha", "socrates", "vinicius junior", "rodrigo", "richarlison", "alisson", "ederson", "casemiro", "modric", "mbappe", "haaland", "lewandowski", "benzema", "salah", "de bruyne", "kane"],
    futebol_estadios: ["maracana", "itaquerao", "morumbi", "mineirao", "beira rio", "arena do gremio", "fonte nova", "castelao", "mane garrincha", "allianz parque", "sao januario", "vila belmiro", "camp nou", "bernabeu", "wembley", "old trafford", "anfield", "san siro"],
    geek_herois: ["homem aranha", "batman", "superman", "mulher maravilha", "thor", "hulk", "capitao america", "homem de ferro", "viuva negra", "flash", "aquaman", "wolverine", "deadpool", "pantera negra", "doutor estranho", "naruto", "goku", "luffy", "ichigo", "saitama", "deku", "tanjiro", "edward elric", "pikachu"],
    geek_games: ["mario", "zelda", "sonic", "pokemon", "minecraft", "fortnite", "gta", "call of duty", "fifa", "league of legends", "dota", "valorant", "cs go", "overwatch", "the last of us", "god of war", "halo", "resident evil", "final fantasy", "street fighter", "mortal kombat", "tetris", "pacman"],
    geek_vilao: ["coringa", "thanos", "darth vader", "voldemort", "bowser", "ganondorf", "sephiroth", "freeza", "cell", "madara", "dio", "team rocket", "magneto", "loki", "ultron", "venom", "duende verde", "lex luthor"]
};

// MAPEAMENTO
const categoryMap = {
    "Nome": "nomes", "CEP": "lugares", "Animal": "animais", "Cor": "cores", "Objeto": "objetos", "Fruta/Comida": "frutas", "Comida": "frutas",
    "Time": "futebol_times", "Jogador": "futebol_jogadores", "Lenda": "futebol_jogadores", "Estádio": "futebol_estadios", "País": "lugares",
    "Herói": "geek_herois", "Vilão": "geek_vilao", "Game": "geek_games", "Anime": "geek_herois", "Personagem": "geek_herois"
};

const themesDB = {
    classico: ["Nome", "CEP", "Animal", "Cor", "Objeto", "Fruta/Comida", "Profissão", "Marca"],
    futebol: ["Time", "Jogador", "Lenda", "Técnico", "Estádio", "Gíria", "País", "Marca Esportiva"],
    geek: ["Herói", "Vilão", "Game", "Anime", "App", "Star Wars", "Tech", "Filme Sci-Fi"],
    zoeira: ["Sogra", "Divórcio", "Cheiro de", "Totó", "Gruda", "Presente Ruim", "Pizza Bizarra", "Medo"]
};

// ESTADO
let peer, myId, myName = "Player", myAvatar = "😎", isHost = false, isSolo = false;
let connections = [], players = [], currentMode = 'classico';
let gameInterval, cooldownInterval;
let allPlayerAnswers = [], judgmentQueue = [], currentVote = null, voteCounts = { yes: 0, no: 0, total: 0 };
let lastLetter = "";

// --- REDE ---
function initPeer() {
    if (peer) peer.destroy();
    peer = new Peer(null, { config: { 'iceServers': [{ url: 'stun:stun.l.google.com:19302' }] } });
    peer.on('open', id => { myId = id; const d = document.querySelector('.code-display span'); if (d) d.innerText = id; if (isHost && !isSolo) { players = [{ id: myId, name: myName, avatar: myAvatar, score: 0 }]; renderPlayers(); } });
    peer.on('connection', conn => {
        connections.push(conn);
        conn.on('data', d => handleData(d, conn));
        conn.on('close', () => { players = players.filter(p => p.id !== conn.peer); broadcast({ type: 'UPDATE_PLAYERS', players }); renderPlayers(); });
    });
}
initPeer();

// --- UI HELPERS ---
function switchScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); }
function goToLobby() { myName = document.getElementById('my-name').value || "Player"; switchScreen('screen-lobby'); document.getElementById('lobby-setup').classList.remove('hidden'); document.getElementById('lobby-room').classList.add('hidden'); }
function selectAvatar(av) { myAvatar = av; document.querySelectorAll('.avatar-opt').forEach(e => e.classList.remove('selected')); event.currentTarget.classList.add('selected'); }
function forceNewID() { if (confirm("Novo código?")) initPeer(); }
function shareOnWhatsapp() { if (!myId) return alert("Aguarde..."); window.open(`https://wa.me/?text=${encodeURIComponent('NeoStop: ' + myId)}`, '_blank'); }
function copyRoomCode() { if (!myId) return; navigator.clipboard.writeText(myId); alert("Copiado!"); }

// --- LOGICA SALA ---
function createRoom() { isHost = true; isSolo = false; setupLobby(); players = [{ id: myId, name: myName, avatar: myAvatar, score: 0 }]; renderPlayers(); }
function startSoloGame() { isHost = true; isSolo = true; setupLobby(); players = [{ id: myId, name: myName, avatar: myAvatar, score: 0 }, { id: 'bot', name: 'Bot 🤖', avatar: '🤖', score: 0 }]; renderPlayers(); }
function setupLobby() { document.getElementById('lobby-setup').classList.add('hidden'); document.getElementById('lobby-room').classList.remove('hidden'); document.getElementById('host-controls').classList.remove('hidden'); }
function joinRoom() { const c = document.getElementById('room-code-input').value.trim(); if (!c) return; isHost = false; isSolo = false; const conn = peer.connect(c); conn.on('open', () => { conn.send({ type: 'JOIN', name: myName, avatar: myAvatar }); document.getElementById('lobby-setup').classList.add('hidden'); document.getElementById('lobby-room').classList.remove('hidden'); document.getElementById('host-controls').classList.add('hidden'); document.getElementById('guest-waiting').classList.remove('hidden'); }); conn.on('data', handleData); peer.hostConn = conn; }
function renderPlayers() { document.getElementById('players-grid').innerHTML = players.map(p => `<div class="player-chip ${p.id === myId ? 'me' : ''}"><span class="av">${p.avatar}</span><span>${p.name}</span></div>`).join(''); document.getElementById('player-count').innerText = players.length; }

// --- DATA ---
function broadcast(data) { if (isHost && !isSolo) connections.forEach(c => c.send(data)); }
function handleData(data, conn) {
    if (isHost) {
        if (data.type === 'JOIN') { players.push({ id: conn.peer, name: data.name, avatar: data.avatar, score: 0 }); broadcast({ type: 'UPDATE_PLAYERS', players }); renderPlayers(); }
        else if (data.type === 'STOP') { broadcast({ type: 'GAME_OVER', name: data.name }); endGameLogic(data.name); }
        else if (data.type === 'ANSWERS') {
            if (!allPlayerAnswers.find(a => a.id === data.id)) allPlayerAnswers.push(data);
            if (allPlayerAnswers.length >= players.length - (isSolo ? 0 : 0)) startTribunal();
        }
        else if (data.type === 'VOTE') {
            if (data.vote) voteCounts.yes++; else voteCounts.no++;
            voteCounts.total++;
            if (voteCounts.total >= players.length) finishVote();
        }
        else if (data.type === 'SCORE_CONFIRM') {
            const p = players.find(x => x.id === data.id);
            if (p) { p.score += data.pts; p.submitted = true; }
            checkAllScores();
        }
    } else {
        if (data.type === 'UPDATE_PLAYERS') { players = data.players; renderPlayers(); }
        else if (data.type === 'START') { startGame(data.letter, data.themes); }
        else if (data.type === 'ROULETTE') { showRoulette(data.letter); }
        else if (data.type === 'GAME_OVER') { sendMyAnswers(); }
        else if (data.type === 'VOTE_START') { showVoting(data.word, data.theme, data.author); }
        else if (data.type === 'RESULTS') { showResults(data.data); }
        else if (data.type === 'SHOW_RANKING') { showRanking(data.players); }
    }
}

// --- JOGO ---
function setMode(m) { currentMode = m; document.querySelectorAll('.mode-pill').forEach(b => b.classList.remove('selected')); event.currentTarget.classList.add('selected'); }

function hostStartGame() {
    const abc = "ABCDEFGHILMNOPQRSTUVZ";
    const themes = themesDB[currentMode];
    let letter;

    // ANTI-REPETIÇÃO
    do { letter = abc[Math.floor(Math.random() * abc.length)]; }
    while (letter === lastLetter && players.length > 0);
    lastLetter = letter;

    players.forEach(p => p.submitted = false);
    broadcast({ type: 'ROULETTE', letter: letter });
    showRoulette(letter, () => {
        broadcast({ type: 'START', letter: letter, themes: themes });
        startGame(letter, themes);
    });
}

function showRoulette(finalLetter, callback) {
    switchScreen('screen-roulette');
    const display = document.getElementById('roulette-letter');
    const abc = "ABCDEFGHILMNOPQRSTUVZ";
    let speed = 50, cycles = 0;

    const spinLoop = () => {
        display.innerText = abc[Math.floor(Math.random() * abc.length)];
        playSound('spin');
        if (cycles > 20) speed += 20;
        if (speed > 400) {
            display.innerText = finalLetter;
            playSound('win');
            setTimeout(() => { if (callback) callback(); }, 2000);
        } else { cycles++; setTimeout(spinLoop, speed); }
    };
    spinLoop();
}

function startGame(l, t) {
    switchScreen('screen-game');
    document.getElementById('game-letter').innerText = l;
    const f = document.getElementById('game-form'); f.innerHTML = '';
    t.forEach(th => f.innerHTML += `<div class="game-input-group"><label>${th}</label><input type="text" data-theme="${th}" autocomplete="off"></div>`);

    let sec = 0;
    clearInterval(gameInterval);

    // TIMER AJUSTADO PARA 90 SEGUNDOS (1:30)
    gameInterval = setInterval(() => {
        sec++;
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        document.getElementById('game-timer').innerText = `${m}:${s < 10 ? '0' + s : s}`;

        const pct = Math.max(0, 100 - (sec / 0.9));
        document.getElementById('progress-fill').style.width = `${pct}%`;

        // AUTO-STOP DO JOGO
        if (sec >= 90) { if (isHost) sendStop(); }
    }, 1000);
}

function sendStop() {
    if (isHost) { broadcast({ type: 'GAME_OVER', name: myName }); endGameLogic(myName); }
    else { peer.hostConn.send({ type: 'STOP', name: myName }); }
}

// --- FASE 1: STOP ---
function endGameLogic(stopperName) {
    clearInterval(gameInterval);
    if (navigator.vibrate) navigator.vibrate(500);
    switchScreen('screen-ai');
    document.getElementById('loading-msg').innerText = "Coletando...";

    if (isHost) {
        allPlayerAnswers = [];
        const myAns = getInputs();
        allPlayerAnswers.push({ id: myId, answers: myAns });

        if (isSolo) {
            allPlayerAnswers.push({ id: 'bot', answers: [{ theme: 'Nome', val: 'Bot', letter: 'X' }] });
            setTimeout(startTribunal, 1000);
        } else {
            // TIMEOUT DE SEGURANÇA (4s)
            setTimeout(() => { if (allPlayerAnswers.length < players.length) startTribunal(); }, 4000);
        }
    } else {
        sendMyAnswers();
    }
}

function getInputs() {
    const l = document.getElementById('game-letter').innerText;
    let arr = [];
    document.querySelectorAll('#game-form input').forEach(i => arr.push({ theme: i.dataset.theme, val: i.value.trim(), letter: l }));
    return arr;
}

function sendMyAnswers() {
    switchScreen('screen-ai');
    document.getElementById('loading-msg').innerText = "Aguardando...";
    if (peer.hostConn) peer.hostConn.send({ type: 'ANSWERS', id: myId, answers: getInputs() });
}

// --- TRIBUNAL ---
function startTribunal() {
    judgmentQueue = [];
    allPlayerAnswers.forEach(pData => {
        pData.answers.forEach(ans => {
            const status = analyze(ans.val, ans.letter, ans.theme);
            ans.status = status;
            if (status === 'warn') judgmentQueue.push({ word: ans.val, theme: ans.theme, author: players.find(p => p.id === pData.id)?.name || "Alguém", ref: ans });
        });
    });
    if (judgmentQueue.length > 0) nextVote(); else finishTribunal();
}

function analyze(word, letter, theme) {
    if (!word) return 'empty';
    const clean = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!clean.startsWith(letter.toLowerCase())) return 'invalid';
    let key = categoryMap[theme];
    if (key && aiDict[key]) { if (aiDict[key].includes(clean)) return 'valid'; return 'warn'; }
    return 'warn';
}

function nextVote() {
    if (judgmentQueue.length === 0) { finishTribunal(); return; }
    currentVote = judgmentQueue.shift();
    voteCounts = { yes: 0, no: 0, total: 0 };
    const payload = { type: 'VOTE_START', word: currentVote.word, theme: currentVote.theme, author: currentVote.author };
    broadcast(payload);
    showVoting(payload.word, payload.theme, payload.author);
}

function showVoting(w, t, a) {
    switchScreen('screen-voting');
    document.getElementById('vote-word').innerText = w;
    document.getElementById('vote-theme').innerText = t;
    document.getElementById('vote-player-name').innerText = a;
    const bar = document.getElementById('vote-progress');
    bar.style.width = '100%'; setTimeout(() => bar.style.width = '0%', 50);
}

function castVote(verdict) {
    switchScreen('screen-ai');
    document.getElementById('loading-msg').innerText = "Voto enviado...";
    if (isHost) {
        if (verdict) voteCounts.yes++; else voteCounts.no++;
        voteCounts.total++;
        if (isSolo) { if (Math.random() > 0.5) voteCounts.yes++; else voteCounts.no++; voteCounts.total++; }
        if (voteCounts.total >= players.length) finishVote();
    } else {
        peer.hostConn.send({ type: 'VOTE', vote: verdict });
    }
}

function finishVote() {
    const approved = voteCounts.yes >= voteCounts.no;
    currentVote.ref.status = approved ? 'valid' : 'invalid';
    setTimeout(nextVote, 500);
}

function finishTribunal() {
    if (isHost) {
        broadcast({ type: 'RESULTS', data: allPlayerAnswers });
        showResults(allPlayerAnswers);
    }
}

// --- RESULTADOS ---
function showResults(data) {
    let myData = data.find(d => d.id === myId);
    if (!myData && data.length > 0) myData = data[0];

    switchScreen('screen-check');
    const list = document.getElementById('check-list');
    list.innerHTML = '';

    if (myData && myData.answers) {
        myData.answers.forEach(a => {
            let cls = 'ai-invalid', icon = '❌', txt = 'Inválido', check = '';
            if (a.status === 'valid') { cls = 'ai-valid'; icon = '✅'; txt = 'Aceito'; check = 'checked'; }
            if (a.status === 'empty') { cls = 'ai-invalid'; icon = '⚪'; txt = 'Vazio'; }
            if (a.status === 'warn') { cls = 'ai-warn'; icon = '⚠️'; txt = 'Dúvida'; }

            list.innerHTML += `
            <div class="check-row ${cls}" onclick="this.querySelector('input').click()">
                <div><small style="color:#aaa">${a.theme}</small><b>${a.val || '---'}</b></div>
                <div style="text-align:right">
                    <span style="display:block;font-size:0.7rem">${txt}</span>
                    <span style="font-size:1.2rem">${icon}</span>
                </div>
                <input type="checkbox" class="check-toggle" ${check} onclick="event.stopPropagation()">
            </div>`;
        });
    }

    document.getElementById('btn-submit-score').disabled = false;
    document.getElementById('btn-submit-score').innerText = "CONFIRMAR PONTOS";
}

function submitScore() {
    const validRows = document.querySelectorAll('.check-row.ai-valid').length;
    const score = validRows * 10;

    const btn = document.getElementById('btn-submit-score');
    btn.disabled = true;
    btn.innerText = "Aguardando todos...";

    if (isHost) {
        const me = players.find(p => p.id === myId);
        if (me) { me.score += score; me.submitted = true; }
        if (isSolo) {
            const bot = players.find(p => p.id === 'bot');
            if (bot) { bot.score += Math.floor(Math.random() * 5) * 10 + 20; bot.submitted = true; }
        }
        checkAllScores();
    } else {
        peer.hostConn.send({ type: 'SCORE_CONFIRM', id: myId, pts: score });
    }
}

function checkAllScores() {
    const pending = players.filter(p => !p.submitted);
    if (pending.length === 0) {
        players.sort((a, b) => b.score - a.score);
        broadcast({ type: 'SHOW_RANKING', players });
        showRanking(players);
    }
}

function showRanking(pl) {
    switchScreen('screen-ranking');
    const list = document.getElementById('ranking-list');
    list.innerHTML = '';
    playSound('win');
    if (window.confetti) confetti();

    pl.forEach((p, i) => {
        list.innerHTML += `<div class="rank-card ${i === 0 ? 'top1' : ''}"><div style="display:flex;align-items:center"><span class="av-big">${p.avatar}</span><div><b style="font-size:1.1rem">${p.name}</b><small>#${i + 1}</small></div></div><div class="rank-score">${p.score}</div></div>`;
    });

    clearInterval(cooldownInterval);
    let cd = 15;
    const el = document.getElementById('cooldown-timer');
    if (el) el.innerText = cd;

    cooldownInterval = setInterval(() => {
        cd--;
        if (el) el.innerText = cd;
        if (cd <= 0) {
            clearInterval(cooldownInterval);
            if (isHost) hostStartGame();
        }
    }, 1000);
}

function copyRoomCode() { if (!myId) return; navigator.clipboard.writeText(myId); alert("Copiado!"); }