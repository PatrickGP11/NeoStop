# ⚡ NeoStop

> O clássico jogo de Stop (Adedonha), reinventado para a web com Inteligência Artificial Local, Sistema de Julgamento Multiplayer e Design Cyberpunk.

![NeoStop Banner]()

## 🎮 Sobre o Projeto

**NeoStop** é uma aplicação web moderna que leva a competição de palavras para outro nível. Diferente dos jogos tradicionais, ele elimina as brigas sobre "essa palavra existe?" usando um sistema híbrido de **Validação por Dicionário** e **Tribunal dos Jogadores**.

Jogue online com amigos via conexão P2P (sem servidores caros) ou treine sozinho contra um Bot inteligente.

### ✨ Funcionalidades Premium

* **🤖 IA Juíza (Local):** Um dicionário interno com milhares de palavras valida automaticamente as respostas óbvias (ex: "Azul" em Cores).
* **⚖️ O Tribunal:** Palavras desconhecidas ou polêmicas (ex: gírias em "Zoeira") são enviadas para uma **Sessão de Votação**. Todos os jogadores votam em tempo real se aceitam ou não a palavra.
* **🎲 Modo Solo vs BOT:** Ninguém para jogar? Desafie a IA, que joga, pontua e até "vota" no tribunal.
* **📡 Multiplayer P2P:** Conexão direta entre navegadores usando tecnologia WebRTC (PeerJS). Baixa latência e privacidade total.
* **🎨 Visual Imersivo:** Interface "Dark Neon", animações de roleta estilo programa de TV, feedback tátil (vibração) e efeitos sonoros dinâmicos.
* **📱 Mobile First:** Layout 100% adaptado para celulares, com tratamento para teclado virtual e gestos de toque.

---

## 🚀 Como Jogar

### 1. Preparação
* Entre no site e escolha seu **Nick** e **Avatar**.
* **Host:** Cria a sala e envia o código para os amigos.
* **Guest:** Cola o código e entra na sala.

### 2. A Partida
* O Host gira a **Roleta** para definir a letra (ex: "M").
* Todos correm para preencher os temas (Nome, CEP, Animal, etc.).
* O primeiro a terminar aperta **STOP!** e o tempo para para todos.

### 3. O Julgamento (Diferencial)
* O sistema analisa as respostas.
* ✅ **Verde:** Palavra confirmada no dicionário.
* ⚠️ **Amarelo:** Palavra desconhecida. **O Tribunal é convocado!**
    * A palavra aparece na tela de todos.
    * Os jogadores votam 👍 ou 👎.
    * A maioria decide se ganha ponto ou não.

---

## 🛠️ Tecnologias Utilizadas

Projeto construído com a tríade web pura para máxima performance:

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) **Estrutura Semântica**
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) **Glassmorphism & Animações**
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **Lógica de Jogo & Web Audio API**
* **PeerJS:** Para comunicação em tempo real (WebRTC).
* **Canvas Confetti:** Para celebrar a vitória.

---

## 📦 Como Rodar o Projeto

### ☁️ Opção 1: Jogar Online (Recomendado)
Acesse o link oficial: **[]**

### 🏠 Opção 2: Rodar Localmente
Para testar no seu computador, você precisa de um servidor local devido às regras de segurança do WebRTC.

1.  Clone este repositório.
2.  Instale a extensão **Live Server** no VS Code.
3.  Abra o `index.html` e clique em "Go Live".
4.  Abra `http://127.0.0.1:5500` no navegador.

---

## 🤝 Contribuição

Quer adicionar mais palavras ao dicionário da IA?
1.  Abra o arquivo `script.js`.
2.  Procure pela constante `aiDict`.
3.  Adicione novas palavras nas categorias (sem acentos!).
4.  Mande um Pull Request!

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, estudar e modificar.

---

<p align="center">
  Desenvolvido com 💜 e muita lógica por <strong>Patrick</strong>
</p>
