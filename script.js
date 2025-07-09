const temperatura = document.getElementById("temp");
const temperaturaf = document.getElementById("tempf");
const cidadeNomeEl = document.getElementById("name");
const area = document.getElementById('area');
const loadingEl = document.getElementById("loading");
const cidadeInputEl = document.getElementById("cidade");


area.style.display = 'none';
loadingEl.style.display = 'none';


async function buscarclima(cidade = "") {
    try {
        area.style.display = "none";
        loadingEl.style.display = "block"; 

        const resposta = await fetch(`https://wttr.in/${cidade}?format=j1`);
        const dados = await resposta.json();

        
        if (!dados.current_condition || !dados.nearest_area) {
            throw new Error("Dados de clima não encontrados.");
        }

        const condicoesatuais = dados.current_condition[0];
        const celsius = condicoesatuais.temp_C;
        const fahrenheit = condicoesatuais.temp_F;
        const cidadeNome = dados.nearest_area[0].areaName[0].value;

        temperatura.textContent = celsius;
        temperaturaf.textContent = fahrenheit;
        cidadeNomeEl.textContent = cidadeNome;

        area.style.display = "block"; 
    } catch (erro) {
        console.error("Erro ao buscar clima:", erro);
        alert("Não foi possível encontrar o clima para essa cidade.");
        area.style.display = "none"; 
    } finally {
        loadingEl.style.display = "none";
    }
}


function buscarCidade() {
    const cidadeInput = cidadeInputEl.value.trim();

    if (cidadeInput !== "") {
        buscarclima(cidadeInput);
        cidadeInputEl.value = "";
    } else {
        alert("Por favor, digite o nome de uma cidade.");
        area.style.display = 'none';
        cidadeInputEl.value = "";
    }
}


cidadeInputEl.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        buscarCidade();
    }
});


