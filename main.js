const urlApi = "http://localhost:8080/doador"
const btnDoacao = document.querySelectorAll('.kit__botao')
const btnCadastroDoador = document.querySelector('.cadastrar-form')

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

async function cadastraDoador(doador){
    const retornoPost = await fetch('http://localhost:8080/doador', {
    method: "POST",
    body: JSON.stringify(doador),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })
    const retornoJson = await retornoPost.json();
    //await console.log(retornoJson);
}

const doador = {
    "nome": "Lucas Teste",
    "email": "lucasteste@hotmail.com",
    "telefone": "62986390017",
    "nascimento": "1902-08-06",
	"endereco":{
		"cep": "74610320",
    	"rua": "Dom Jao",
    	"bairro": "Bairro De Teste",
   	 	"cidade": "Terezina",
    	"uf": "PI",
    	"numero": "32",
    	"complemento": "ap 100"
	} 
}

//cadastraDoador(doador); // COMENTADO POIS O MÉTODO ESTÁ REALIZANDO POST PARA A API E ENCHENDO O BD

console.log("LISTANDO DOADORES APÓS A REQUISIÇÃO POST (5s de Delay): ");
function funcaoDeExemplo() {
    buscaDoadores();
  } setTimeout(funcaoDeExemplo, 5000);