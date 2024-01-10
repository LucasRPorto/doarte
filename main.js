const urlApi = "http://localhost:8080/doador";
const btnDoacao = document.querySelectorAll('.kit__botao');

btnDoacao.forEach((btnDoado) => {
    btnDoado.addEventListener('click', (evento)=> {
        evento.preventDefault();
        
        window.location.href = '../pages/form-cadastro.html';
    })
})
 
async function buscaDoadores(){
    const retornoGet = await fetch(urlApi);
    const retornoJson = await retornoGet.json()
    console.log(retornoJson);
}

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
        } else {
            console.error('Erro na requisição:', resposta.statusText);
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro.message);
    }
}

export {
    cadastraDoador
}