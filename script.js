function abrirPacotesFotografia() {
  var url = 'pdf/portfolio-marcia.pdf';
  var win = window.open(url, '_blank');
  win.focus();
}

$(document).ready(function () {
  var carrinho = [];
  var total = 0;
  var alertaExibido = false;

  function atualizarCarrinho() {
    var itensCarrinho = $("#itens-carrinho");
    itensCarrinho.empty();
    total = 0;

    var contadorFotos = 0;
    carrinho.forEach(function (item) {
      contadorFotos++;
      var precoTotalItem = 0;
      if (contadorFotos > 20) {
        precoTotalItem = 8.0;
      }
      total += precoTotalItem;

      var li = $("<li></li>").text(`${item.nome} - R$${precoTotalItem.toFixed(2)}`);
      var removerBotao = $("<button class='remover-item'>Remover</button>");
      li.append(removerBotao);
      itensCarrinho.append(li);
    });

    $("#total-carrinho").text("Total: R$ " + total.toFixed(2));
    $("#contador-fotos").text("Total de fotos selecionadas: " + contadorFotos);
  }

  function adicionarAoCarrinho(nome) {
    carrinho.push({ nome: nome });
    atualizarCarrinho();
  }

  // Desabilitar o menu de contexto do botão direito
  $(document).on("contextmenu", function (e) {
    e.preventDefault();
  });

  // Função para converter o texto para maiúsculas
  function converterParaMaiusculas(input) {
    input.value = input.value.toUpperCase();
  }

  $("#nome").on("input", function () {
    converterParaMaiusculas(this);
  });

  $(document).on("click", ".portfolio-item a", function (e) {
    e.preventDefault(); // Cancela o comportamento padrão do link

    var nomeFoto = $(this).find("img").attr("alt");
    adicionarAoCarrinho(nomeFoto);
  });

  $("#itens-carrinho").on("click", ".remover-item", function () {
      var li = $(this).closest("li");
      var nomeProduto = li.text().split(" - R$")[0];
      var indice = carrinho.findIndex((item) => item.nome === nomeProduto);

      if (indice !== -1) {
          carrinho.splice(indice, 1);
          li.remove();
          atualizarCarrinho();
      }
  });

  function encomendarFotos() {
      if (carrinho.length >= 20) {
          var nome = $("#nome").val();
          var email = $("#email").val();


          var mensagem = "*ENCOMENDA DE FOTOS REALIZADA*%0A%0A";
          mensagem += "Nome: " + nome + "%0A";
          mensagem += "Email: " + email + "%0A";
          mensagem += "%0AProdutos:%0A";

          carrinho.forEach(function (item) {
              mensagem += `- ${item.nome}%0A`;
          });

          mensagem += "%0A";
          mensagem += "*Valor Total do Carrinho:* R$" + total.toFixed(2) + "%0A";

          var url = "https://wa.me/5531992969244/?text=" + mensagem;
          window.open(url);
      } else if (!alertaExibido) {
          alert("Selecione no mínimo 20 fotos para fazer uma encomenda.");
          alertaExibido = true;
      }
  }

  $("#encomendar").click(function () {
      var nome = $("#nome").val().trim();
      var email = $("#email").val().trim();

      if (nome === '') {
          exibirAvisoCampo("#nome", "Preencha");
          return false;
      }

      if (email === '') {
          exibirAvisoCampo("#email", "Preencha");
          return false;
      }

      encomendarFotos();
      return false; // Impede o envio do formulário
  });

  function exibirAvisoCampo(campo, mensagem) {
      var campoElemento = $(campo);
      campoElemento.addClass("campo-incompleto");
      campoElemento.attr("placeholder", mensagem);
      campoElemento.focus();

      setTimeout(function () {
          campoElemento.removeClass("campo-incompleto");
          campoElemento.removeAttr("placeholder");
      }, 2000);
  }

  $("#formulario").submit(function (e) {
      if (carrinho.length < 20) {
          e.preventDefault();
          alert("Selecione no mínimo 20 fotos para fazer uma encomenda.");
          alertaExibido = true;
      }
  });

  $("#ver-pacotes").click(function(e) {
    e.preventDefault();
    abrirPacotesFotografia();
  });
});



