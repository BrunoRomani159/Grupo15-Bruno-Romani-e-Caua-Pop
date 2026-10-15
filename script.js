const botaoInteresse = document.getElementById("interesseBtn");
const mensagemInteresse = document.getElementById("mensagemInteresse");

botaoInteresse.addEventListener("click", function () {
  mensagemInteresse.textContent = "Obrigado pelo interesse no HelpFlow!";
});