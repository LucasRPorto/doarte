const urlApi = "http://localhost:8080/doador"

const btnDoacao = document.querySelectorAll('.kit__botao')

btnDoacao.forEach((btnDoado) => {
    btnDoado.addEventListener('click', (evento)=> {
        evento.preventDefault();
        window.location.href = '../pages/form-cadastro.html';
    })
})