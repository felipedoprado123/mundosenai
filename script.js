
// === QUIZ INTERATIVO ===
const todasPerguntas = [
  { texto: "Mais de 400 motoristas dormiram ao volante e causaram acidentes nas rodovias de Santa Catarina entre janeiro de 2021 e abril de 2023.", resposta: "V" },
  { texto: "Os acidentes nas rodovias federais de Santa Catarina em 2024 tiveram um aumento de 14% nas mortes em relação a 2023.", resposta: "V" },
  { texto: "Os acidentes de trânsito relacionados à sonolência ao volante não representam risco significativo para a segurança nas rodovias.", resposta: "F" },
  { texto: "A sonolência ao volante compromete o tempo de reação, a atenção e a tomada de decisões rápidas, aumentando o risco de colisões graves.", resposta: "V" },
  { texto: "Em 2024, a BR-101 foi a rodovia com mais acidentes em Santa Catarina.", resposta: "V" },
  { texto: "O sistema de detecção de cansaço é um recurso presente em todos os carros fabricados no Brasil.", resposta: "F" },
  { texto: "A ideia do projeto é tornar a tecnologia de detecção de sonolência acessível a motoristas de veículos mais antigos.", resposta: "V" },
  { texto: "Carros fabricados antes de 2000 geralmente possuem sistemas de detecção de fadiga.", resposta: "F" },
  { texto: "O sistema de detecção de cansaço do projeto desacelera ou para o veículo automaticamente caso o motorista esteja com sinais de sonolência.", resposta: "V" },
  { texto: "A tecnologia de detecção de cansaço é um recurso que surgiu com os carros de luxo após os anos 2000.", resposta: "V" },
  { texto: "O projeto Direção Segura pretende salvar vidas ao levar a tecnologia de detecção de cansaço a motoristas com veículos menos tecnológicos.", resposta: "V" },
  { texto: "O sistema de detecção de cansaço detecta apenas o movimento do volante, sem verificar os sinais do motorista.", resposta: "F" },
  { texto: "O Direção Segura é um projeto que visa aumentar a segurança nas rodovias por meio de tecnologia acessível para todos os motoristas.", resposta: "V" },
  { texto: "Em carros modernos, a tecnologia de detecção de fadiga é uma inovação que já salva muitas vidas.", resposta: "V" },
  { texto: "O JavaScript não é utilizado para criar interatividade nas páginas da web.", resposta: "F" },
  { texto: "O HTML é responsável pela estrutura e conteúdo de uma página web.", resposta: "V" },
  { texto: "O CSS é utilizado para criar a interatividade nas páginas web.", resposta: "F" }
];

const perguntasSelecionadas = [...todasPerguntas]
  .sort(() => Math.random() - 0.5)
  .slice(0, 10);

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("perguntas-container");
  if (container) {
    perguntasSelecionadas.forEach((p, i) => {
      const div = document.createElement("div");
      div.classList.add("pergunta");
      div.id = `pergunta-${i}`;
      div.innerHTML = `
        <p><strong>${i + 1}.</strong> ${p.texto}</p>
        <label><input type="radio" name="q${i}" value="V" required> Verdadeiro</label>
        <label><input type="radio" name="q${i}" value="F"> Falso</label>
      `;
      container.appendChild(div);
    });

    const formulario = document.getElementById("formulario");
    const mensagemEncerrada = document.getElementById("mensagem-encerrada");
    const barra = document.getElementById("barra");
    const pontuacaoBarra = document.getElementById("pontuacao-barra");
    const reiniciar = document.getElementById("reiniciar");

    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      let pontos = 0;
      perguntasSelecionadas.forEach((p, i) => {
        const resposta = document.querySelector(`input[name="q${i}"]:checked`);
        const div = document.getElementById(`pergunta-${i}`);
        if (resposta && resposta.value === p.resposta) {
          pontos++;
          div.classList.add("correta");
        } else {
          div.classList.add("errada");
        }
      });

      const porcentagem = Math.round((pontos / perguntasSelecionadas.length) * 100);
      mensagemEncerrada.textContent = `🎉 Você acertou ${pontos} de ${perguntasSelecionadas.length} (${porcentagem}%).`;
      mensagemEncerrada.style.display = "block";
      barra.style.width = `${porcentagem}%`;
      pontuacaoBarra.style.display = "block";

      formulario.querySelectorAll("input[type=radio]").forEach(el => el.disabled = true);
      formulario.querySelector("button[type=submit]").disabled = true;
      reiniciar.style.display = "block";
    });

    reiniciar.addEventListener("click", () => {
      location.reload();
    });
  }
});

// === SISTEMA SOLAR - BOTÕES DE PLANETAS ===
function toggleInfo(planetId) {
  const cards = document.querySelectorAll('.planet-card');
  cards.forEach(card => {
    card.style.display = (card.id === planetId && card.style.display !== 'block') ? 'block' : 'none';
  });
}

// === SISTEMA SOLAR - COMETA ===
function cometInfo() {
  alert("🌠 Este é um cometa! Cometas são corpos celestes de gelo e poeira que passam perto do Sol.");
}
