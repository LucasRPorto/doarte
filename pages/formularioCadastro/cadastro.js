const cep = document.getElementById("cep");
const form = document.querySelector('.formularioCadastro');
const urlApi = "http://localhost:8080/doador";
const mp = new MercadoPago("TEST-807af6f1-f1ee-4cda-8914-10d67510f88f");

document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".form-step");
    const progressSteps = document.querySelectorAll(".progress-bar__step");
    const nextStepBtn = document.querySelector(".next-step");
    const prevStepBtn = document.querySelector(".prev-step");
    const form = document.getElementById("formularioCadastro");
    let currentStep = 0;

    function updateSteps() {
        steps.forEach((step, index) => {
            step.style.display = index === currentStep ? "block" : "none";
        });
        progressSteps.forEach((step, index) => {
            step.classList.toggle("progress-bar__step--active", index <= currentStep);
        });
    }

    function validateStep(stepIndex) {
        const inputs = steps[stepIndex].querySelectorAll("input[required]");
        for (const input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    }

    nextStepBtn.addEventListener("click", () => {
        if (validateStep(currentStep)) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateSteps();
            }
        }
    });

    prevStepBtn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateSteps();
        }
    });

    form.addEventListener("submit", (event) => {
        if (!validateStep(currentStep)) {
            event.preventDefault();
        }
    });

    updateSteps();
});

async function cadastraDoador(doador) {
    try {
        console.log('Corpo da requisição:', JSON.stringify(doador));

        const resposta = await fetch(urlApi, {
            method: "POST",
            body: JSON.stringify(doador),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const codigoResposta = resposta.status;

        console.log(`Código de resposta: ${codigoResposta}`);

        if (resposta.ok) {
            const dadosResposta = await resposta.json(); 
            console.log('Dados recebidos:', dadosResposta);

            localStorage.setItem('qrCode', dadosResposta.qrCode);
            localStorage.setItem('qrCodeBase64', dadosResposta.qrCodeBase64);

            window.location.href = '../../pages/conclusaoCadastro/conclusaoCadastro.html';
        } else {
            console.error('Erro na requisição:', resposta.statusText);
            apresentaToastr("erroCadastro");
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro.message);
    }
}

cep.addEventListener('blur', () => {
    requisicaoViaCep();
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';

    const nome = form.elements['nome'].value;
    const sobrenome = form.elements['sobrenome'].value;
    const email = form.elements['email'].value;
    const telefone = form.elements['telefone'].value;
    const nascimento = form.elements['dataNascimento'].value;
    const cpf = form.elements['identificationNumber'].value;
    const cep = form.elements['cep'].value;
    const rua = form.elements['rua'].value;
    const bairro = form.elements['bairro'].value;
    const cidade = form.elements['cidade'].value;
    const uf = form.elements['uf'].value;
    const numero = form.elements['numero'].value;
    const complemento = form.elements['complemento'].value;

    const nomeProduto = localStorage.getItem('nomeProduto');
    const valor = localStorage.getItem('valor');

    if (!nomeProduto || !valor) {
        console.error('Erro: nomeProduto ou valor não definidos no localStorage.');
        loadingIndicator.style.display = 'none'; 
        return;
    }

    const doador = {
        "nome": nome,
        "sobrenome": sobrenome,
        "email": email,
        "telefone": telefone,
        "nascimento": nascimento,
        "cpf": cpf,
        "valor": parseFloat(valor),
        "nomeProduto": nomeProduto,
        "endereco": {
            "cep": cep,
            "rua": rua,
            "bairro": bairro,
            "cidade": cidade,
            "uf": uf,
            "numero": numero,
            "complemento": complemento
        }
    };

    try {
        await cadastraDoador(doador);
    } catch (error) {
        console.error('Erro ao cadastrar doador:', error);
    } finally {
        loadingIndicator.style.display = 'none'; 
    }
});

async function requisicaoViaCep() {
    if (cep.value && cep.value.length == 8) {
        const requisicao = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

        if (!requisicao.ok) {
            throw new Error('Erro ao realizar requisição');
        }
        const data = await requisicao.json();
        console.log(data);

        form.elements['rua'].value = data.logradouro;
        form.elements['bairro'].value = data.bairro;
        form.elements['cidade'].value = data.localidade;
        form.elements['uf'].value = data.uf;
    }
}
