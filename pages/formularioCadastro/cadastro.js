
const cep = document.getElementById("cep");
const form = document.querySelector('.formularioCadastro');
const urlApi = "http://localhost:8080/doador";


async function cadastraDoador(doador) {
    try {
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
            console.log('Dados recebidos:', doador);
            window.location.href = './pages/conclusaoCadastro.html'
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
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = form.elements['nome'].value;
    const email = form.elements['email'].value;
    const telefone = form.elements['telefone'].value;
    const nascimento = form.elements['dataNascimento'].value;
    const cep = form.elements['cep'].value;
    const rua = form.elements['rua'].value;
    const bairro = form.elements['bairro'].value;
    const cidade = form.elements['cidade'].value;
    const uf = form.elements['uf'].value;
    const numero = form.elements['numero'].value;
    const complemento = form.elements['complemento'].value;

    const doador = {
        "nome": nome,
        "email": email,
        "telefone": telefone,
        "nascimento": nascimento,
        "endereco": {
            "cep": cep,
            "rua": rua,
            "bairro": bairro,
            "cidade": cidade,
            "uf": uf,
            "numero": numero,
            "complemento": complemento
        }
    }
    cadastraDoador(doador);
    form.reset();
});


async function requisicaoViaCep(){

    if(cep.value && cep.value.length == 8){

    const requisicao = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

    if(!requisicao.ok){
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

export function apresentaToastr(tipoToastr){
    
    if(tipoToastr == "erroCadastro"){
        toastr.error('Ocorreu um problema ao processar o seu cadastro. Tente novamente.', {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-full-width',
            timeOut: 0,
            extendedTimeOut: 0,
            tapToDismiss: false
        });
    }else if(tipoToastr == "atencaoCadastro"){
        console.log("")
    }
}

