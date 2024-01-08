const urlApi = "http://localhost:8080/doador";
const btnDoacao = document.querySelectorAll('.kit__botao');
const btnCadastroDoador = document.querySelector('.cadastrar-form');
const formularioCadastro = document.querySelector('.formularioCadastro');

btnDoacao.forEach((btnDoado) => {
    btnDoado.addEventListener('click', (evento)=> {
        evento.preventDefault();
        
        window.location.href = '../pages/form-cadastro.html';
    })
})
 
async function buscaDoadores(){
    const retornoGet = await fetch('http://localhost:8080/doador');
    const retornoJson = await retornoGet.json()
    console.log(retornoJson);
}
// Testando GET da API doarte

async function cadastraDoador(doador) {
    try {
        const resposta = await fetch('http://localhost:8080/doador', {
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
        } else {
            console.error('Erro na requisição:', resposta.statusText);
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro.message);
    }
}


formularioCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = document.querySelector('.formularioCadastro');

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
    formularioCadastro.reset();
});
