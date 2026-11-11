var compras = JSON.parse(localStorage.getItem("comprasCrypto")) || [];

function mostrarCarteira() {
    var lista = document.getElementById("listaCarteira");
    var totalGeral = 0;

    lista.innerHTML = "";

    if (compras.length == 0) {
        lista.innerHTML = "<tr><td colspan='5' class='text-center'>Você ainda não comprou nenhuma criptomoeda.</td></tr>";
    }

    for (var i = 0; i < compras.length; i++) {

        var total = compras[i].valorCompra;

        if (total == undefined) {
            total = compras[i].quantidade * compras[i].preco;
        }

        totalGeral = totalGeral + total;

        var linha = document.createElement("tr");

        var nome = document.createElement("td");
        nome.textContent = compras[i].nome;

        var quantidade = document.createElement("td");
        quantidade.textContent = compras[i].quantidade.toLocaleString("pt-BR", {
            maximumFractionDigits: 12
        });

        var preco = document.createElement("td");
        preco.textContent = compras[i].preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        var valor = document.createElement("td");
        valor.textContent = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        var botao = document.createElement("button");
        botao.textContent = "Remover";
        botao.className = "botao-remover";
        botao.onclick = function() {
            removerCompra(this);
        };

        var colunaBotao = document.createElement("td");
        colunaBotao.appendChild(botao);

        linha.appendChild(nome);
        linha.appendChild(quantidade);
        linha.appendChild(preco);
        linha.appendChild(valor);
        linha.appendChild(colunaBotao);

        lista.appendChild(linha);

        botao.setAttribute("data-indice", i);
    }

    document.getElementById("totalCarteira").textContent =
        totalGeral.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

function removerCompra(botao) {
    var indice = botao.getAttribute("data-indice");

    compras.splice(indice, 1);

    localStorage.setItem("comprasCrypto", JSON.stringify(compras));

    mostrarCarteira();
}

mostrarCarteira();
