const url = "http://localhost:8080/doador"

function getUser(){
    axios.get(url)
    .then(response =>{
        const data = response.data
        doadoresCadastrados.textContent = JSON.stringify(data)
    })
    .catch(error => console.log(error))
}

getUser()