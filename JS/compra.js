var precos = {
    "Bitcoin": 350000,
    "Ethereum": 18500,
    "Dogecoin": 0.38,
    "Cardano": 2.40,
    "XRP": 12
};

var formulario = document.getElementById("formularioCompra");
var moeda = document.getElementById("moedaCompra");
var valorReais = document.getElementById("valorReais");

moeda.addEventListener("change", function() {
    var nome = moeda.value;

    if (nome != "") {
        document.getElementById("precoUnidade").textContent =
            precos[nome].toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        calcularCompra();
    } else {
        document.getElementById("precoUnidade").textContent = "Selecione uma moeda";
        calcularCompra();
    }
});

valorReais.addEventListener("input", calcularCompra);

function calcularCompra() {
    var nome = moeda.value;
    var valor = Number(valorReais.value);

    if (nome != "" && valor > 0) {
        var quantidade = valor / precos[nome];

        document.getElementById("quantidadeRecebida").textContent =
            quantidade.toLocaleString("pt-BR", { maximumFractionDigits: 12 });
        document.getElementById("valorCompra").textContent =
            valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    } else {
        document.getElementById("quantidadeRecebida").textContent = "0";
        document.getElementById("valorCompra").textContent = "R$ 0,00";
    }
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    var nome = moeda.value;
    var valor = Number(valorReais.value);
    var mensagem = document.getElementById("mensagemCompra");

    if (nome == "" || valor < 0.01) {
        mensagem.textContent = "Escolha uma moeda e informe um valor válido em reais.";
        mensagem.className = "erro mt-3";
    } else {
        var compras = JSON.parse(localStorage.getItem("comprasCrypto")) || [];
        var quantidade = valor / precos[nome];

        compras.push({
            nome: nome,
            quantidade: quantidade,
            preco: precos[nome],
            valorCompra: valor
        });

        localStorage.setItem("comprasCrypto", JSON.stringify(compras));

        mensagem.textContent = "Compra realizada! A moeda foi adicionada à sua carteira.";
        mensagem.className = "sucesso mt-3";

        formulario.reset();
        document.getElementById("precoUnidade").textContent = "Selecione uma moeda";
        document.getElementById("quantidadeRecebida").textContent = "0";
        document.getElementById("valorCompra").textContent = "R$ 0,00";
    }
});
