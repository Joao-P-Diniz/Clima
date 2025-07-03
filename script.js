const temperatura = document.getElementById("temp");
const temperaturaf = document.getElementById("tempf");
const cidadeNomeEl = document.getElementById("name");

async function buscarclima(cidade = "Buriti dos Lopes") {
    try {
        const resposta = await fetch(`https://wttr.in/${cidade}?format=j1`);
        const dados = await resposta.json();

        const condicoesatuais = dados.current_condition[0];

        const celsius = condicoesatuais.temp_C;
        const fahrenheit = condicoesatuais.temp_F;
        const cidadeNome = dados.nearest_area[0].areaName[0].value;

        temperatura.textContent = celsius;
        temperaturaf.textContent = fahrenheit;
        cidadeNomeEl.textContent = cidadeNome;

    } catch (erro) {
        console.error("Erro ao buscar clima:", erro);
        alert("Não foi possível encontrar o clima para essa cidade.");
    }
}


buscarclima();


function buscarCidade() {
    const cidadeInput = document.getElementById("cidade").value.trim();
    if (cidadeInput !== "") {
        buscarclima(cidadeInput);
    } else {
        alert("Por favor, digite o nome de uma cidade.");
    }
}
