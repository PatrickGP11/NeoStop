# ⚡ NeoStop Multiplayer

> O clássico jogo de Stop (Adedonha), reinventado para a era digital com design Cyberpunk, modo Multiplayer Online e jogabilidade frenética.

![NeoStop Banner](banner.png)

## 🎮 Sobre o Projeto

**NeoStop** é uma aplicação web moderna que leva a experiência do papel e caneta para o navegador. Desenvolvido com foco em **Mobile First** e **User Experience**, o jogo permite que amigos se conectem instantaneamente via internet sem necessidade de servidores complexos ou login.

### ✨ Principais Funcionalidades

* **Multiplayer P2P:** Conexão direta entre jogadores usando tecnologia WebRTC (PeerJS) e servidores STUN do Google para furar bloqueios de rede (funciona 4G vs Wi-Fi).
* **5 Modos de Jogo:**
    * 📚 **Clássico:** Os temas tradicionais que todo mundo ama.
    * ⚽ **Futebol:** Para os boleiros (Times, Jogadores, Estádios).
    * 🤓 **Geek:** Cultura Pop, Games, Animes e Tech.
    * 🤪 **Zoeira:** Temas engraçados para dar risada (ex: "Motivo de Divórcio").
    * 🔥 **Hard:** Apenas para os fortes (Tabela Periódica, Capitais, etc).
* **Design Premium:** Interface "Dark Mode" com elementos Neon, Glassmorphism e responsividade total para celulares.
* **Sistema de Áudio Imersivo:** Efeitos sonoros de tic-tac, alarmes e vitórias gerados via Web Audio API (sem arquivos pesados).
* **Feedback Visual:** Chuva de confetes para o vencedor da rodada e vibração tátil em dispositivos móveis.
* **Experiência de App:** Otimizado para funcionar como um aplicativo nativo no iOS e Android (Tela cheia, sem barras de navegação).

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com a "Tríade Web" pura, garantindo máxima performance e zero dependências de build complexas.

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) **Estrutura Semântica**
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) **Estilização Responsiva & Animações**
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **Lógica de Jogo & Manipulação DOM**
* **PeerJS:** Biblioteca para simplificar conexões WebRTC.
* **Canvas Confetti:** Para os efeitos de partículas.
* **Remix Icon:** Pacote de ícones vetoriais leves.

---

## 🕹️ Como Jogar

### 🏠 Rodando Localmente (Desenvolvimento)

1.  Clone este repositório ou baixe os arquivos.
2.  Você precisa de um "Servidor Local" para que o Multiplayer funcione (devido a regras de segurança do navegador).
    * **Opção A (VS Code):** Instale a extensão "Live Server", abra o `index.html` e clique em "Go Live".
    * **Opção B (Python):** Abra o terminal na pasta e rode `python -m http.server`.
3.  Abra o navegador em `http://localhost:5500` (ou a porta indicada).

### 🌍 Jogando Online (Produção)

Para jogar com amigos em outras casas, hospede o projeto gratuitamente:

1.  Crie uma conta no [Vercel](https://vercel.com) ou [Netlify](https://netlify.com).
2.  Arraste a pasta do projeto para o painel de upload.
3.  Em segundos, você terá um link (ex: `neostop-patrick.vercel.app`).
4.  Mande o link no grupo do WhatsApp!

---

## 📖 Guia do Usuário

1.  **Perfil:** Ao entrar, escolha seu **Apelido** e um **Avatar** (ex: 🦁, 🤖, 👽).
2.  **Lobby:**
    * **Criar Sala:** Você vira o *Host*. Copie o código gerado e mande para os amigos.
    * **Entrar:** Cole o código que seu amigo mandou e conecte-se.
3.  **A Partida:**
    * O Host escolhe o modo (ex: Futebol) e inicia.
    * Todos recebem a mesma **Letra** e os **Temas**.
    * Corra contra o tempo! Quem terminar primeiro aperta **STOP**.
4.  **Conferência:**
    * O jogo para para todos.
    * Marque as respostas que você validou como certas.
    * O sistema soma os pontos e mostra o Ranking com chuva de confetes! 🎉

---

## 🤝 Contribuição

Contribuições são o que fazem a comunidade open source um lugar incrível. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um Fork do projeto
2.  Crie uma Branch para sua Feature (`git checkout -b feature/MinhaFeature`)
3.  Adicione suas mudanças (`git commit -m 'Adicionando tema X'`)
4.  Faça o Push (`git push origin feature/MinhaFeature`)
5.  Abra um Pull Request

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

## 📞 Contato

**Patrick** - [https://www.linkedin.com/public-profile/settings]

Link do Projeto: []

---
*Desenvolvido com 💜 e muito código.*
