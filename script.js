const todasPerguntas = [
  { texto: "Mais de 400 motoristas dormiram ao volante...", resposta: "V" },
  { texto: "Os acidentes nas rodovias federais...", resposta: "V" },
  { texto: "Os acidentes de trânsito relacionados à sonolência...", resposta: "F" },
  { texto: "A sonolência ao volante compromete...", resposta: "V" },
  { texto: "Em 2024, a BR-101 foi a rodovia...", resposta: "V" },
  { texto: "O sistema de detecção de cansaço...", resposta: "F" },
  { texto: "A ideia do projeto é tornar a tecnologia...", resposta: "V" },
  { texto: "Carros fabricados antes de 2000...", resposta: "F" },
  { texto: "O sistema de detecção de cansaço do projeto...", resposta: "V" },
  { texto: "A tecnologia de detecção de cansaço...", resposta: "V" },
  { texto: "O projeto Direção Segura pretende salvar vidas...", resposta: "V" },
  { texto: "O sistema de detecção de cansaço detecta apenas...", resposta: "F" },
  { texto: "O Direção Segura é um projeto que visa...", resposta: "V" },
  { texto: "Em carros modernos, a tecnologia de detecção...", resposta: "V" },
  { texto: "O JavaScript não é utilizado para criar interatividade...", resposta: "F" },
  { texto: "O HTML é responsável pela estrutura...", resposta: "V" },
  { texto: "O CSS é utilizado para criar a interatividade...", resposta: "F" }
];

const perguntasSelecionadas = [...todasPerguntas]
  .sort(() => Math.random() - 0.5)
  .slice(0, 10);

const container = document.getElementById("perguntas-container");
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
const inicio = localStorage.getItem("quizIniciado") ? parseInt(localStorage.getItem("quizIniciado")) : Date.now();
localStorage.setItem("quizIniciado", inicio);

if (localStorage.getItem("quizRespondido") === "true") {
  bloquearFormulario();
}

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  if (localStorage.getItem("quizRespondido") === "true") return;

  let pontos = 0;
  perguntasSelecionadas.forEach((p, i) => {
    const resposta = document.querySelector(`input[name="q${i}"]:checked`);
    const div = document.getElementById(`pergunta-${i}`);
    if (resposta.value === p.resposta) {
      pontos++;
      div.classList.add("correta");
    } else {
      div.classList.add("errada");
    }
  });

  const porcentagem = Math.round((pontos / perguntasSelecionadas.length) * 100);
  const tempo = Math.floor((Date.now() - inicio) / 1000);
  mensagemEncerrada.textContent = `🎉 Você acertou ${pontos} de ${perguntasSelecionadas.length} (${porcentagem}%) em ${tempo} segundos.`;
  mensagemEncerrada.style.display = "block";
  barra.style.width = `${porcentagem}%`;
  pontuacaoBarra.style.display = "block";

  bloquearFormulario();
  localStorage.setItem("quizRespondido", "true");
});

function bloquearFormulario() {
  formulario.querySelectorAll("input[type=radio]").forEach(el => el.disabled = true);
  formulario.querySelector("button[type=submit]").disabled = true;
  reiniciar.style.display = "block";
}

reiniciar.addEventListener("click", () => {
  const senha = prompt("Digite a senha para tentar novamente:");
  if (senha === "senai1234") {
    localStorage.removeItem("quizRespondido");
    localStorage.removeItem("quizIniciado");
    location.reload();
  } else {
    alert("Senha incorreta. Você não pode reiniciar o quiz.");
  }
});
