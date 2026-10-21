const EMAIL_DESTINO = "brunoromani159@gmail.com";
const ENDPOINT = "https://formsubmit.co/ajax/" + EMAIL_DESTINO;
 
const form = document.getElementById("leadForm");
const botao = document.getElementById("enviar");
const erro = document.getElementById("erro");
const sucesso = document.getElementById("sucesso");
 
function mostrarErro(msg, campo) {
  erro.textContent = msg;
  erro.hidden = false;
  if (campo) {
    campo.classList.add("invalid");
    campo.focus();
  }
}
 
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  erro.hidden = true;
  form.querySelectorAll(".invalid").forEach(function (el) { el.classList.remove("invalid"); });
 
  const nome = form.nome, email = form.email, tipo = form.tipo;
  if (!nome.value.trim()) return mostrarErro("Informe seu nome.", nome);
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) return mostrarErro("Informe um e-mail válido.", email);
  if (!tipo.value) return mostrarErro("Escolha onde você quer usar o HelpFlow.", tipo);
 
  const textoOriginal = botao.textContent;
  botao.disabled = true;
  botao.textContent = "Enviando...";
 
  const dados = {
    Nome: nome.value.trim(),
    Email: email.value.trim(),
    WhatsApp: form.telefone.value.trim() || "não informado",
    Tipo_de_espaco: tipo.value,
    Mensagem: form.mensagem.value.trim() || "sem mensagem",
    _honey: form._honey.value,
    _subject: "Novo interessado no HelpFlow: " + nome.value.trim(),
    _template: "table",
    _captcha: "false",
    _replyto: email.value.trim()
  };
 
  try {
    const resposta = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(dados)
    });
    const resultado = await resposta.json();
    if (!resposta.ok || resultado.success === "false" || resultado.success === false) {
      throw new Error(resultado.message || "Falha no envio");
    }
 
    document.getElementById("sucessoNome").textContent = nome.value.trim().split(" ")[0];
    form.hidden = true;
    sucesso.hidden = false;
    sucesso.focus();
  } catch (err) {
    mostrarErro("Não foi possível enviar agora. Tente novamente em instantes.");
    botao.disabled = false;
    botao.textContent = textoOriginal;
  }
});