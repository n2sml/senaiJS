'use strict';
//Pegando a referência para o local onde os dados do usuário serão preenchidos:
let content = document.getElementById('content')

//Pegando o JSON com os dados do usuário que estavam guardados na memória:
let json = JSON.parse(sessionStorage.getItem('key'))

//Pegando as referências de cada campo:
let userName = document.getElementById('userName')
let userEmail = document.getElementById('userEmail')
let userPhone = document.getElementById('userPhone')
let userDate = document.getElementById('userDate')
let userAddress = document.getElementById('userAddress')
let userImage = document.getElementById('userImage')

//Inserindo a Imagem:
let img = document.createElement('img')
img.setAttribute('src', json.picture.large)
userImage.appendChild(img)

//Manobra para transformar a data do formato YYYY-MM-DD em DD/MM/YYYY
let dia = json.dob.date.substring(8, 10)
let mes = json.dob.date.substring(5, 7)
let ano = json.dob.date.substring(0, 4)


//Deixando primeiro e último nomes com iniciais maiúsculas:
let tempName =  json.name.first
tempName = tempName.charAt(0).toUpperCase() + tempName.slice(1)
let tempLastName =  json.name.last
tempLastName = tempLastName.charAt(0).toUpperCase() + tempLastName.slice(1)
  
//Preenchendo os dados:
userName.innerHTML = tempName + ' ' + tempLastName
userEmail.innerHTML = json.email
userPhone.innerHTML =  json.phone
userDate.innerHTML =  dia + "/" + mes + "/" + ano
userAddress.innerHTML = 
upperFirst(json.location.street) + ", " + 
upperFirst(json.location.city) + ", " + 
upperFirst(json.location.state)

//Pegando latitude e longitude
/*
OBS: O sistema nos dá latitude e longitude que não são correspondentes aos 
dados do campo "location"!
*/
let latitude = json.location.coordinates.latitude
let longitude = json.location.coordinates.longitude
let zoom = 3

//Utilizando o Leaflet
/*
Não pude utilizar o mapa do Google, pois o mesmo
necessita de cartão de crédito para criar uma chave 
e eu não tenho um cartão de crédito disponível no momento.
*/

//Passando a posição inicial:
var mymap = L.map('mapid').setView([latitude, longitude], zoom)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap)

//Definindo a posição do marcador sobre o mapa
//No caso, a mesma posição onde o mapa está
//(logo, o marcador ficará no centro do mapa)
var marker = L.marker([latitude, longitude]).addTo(mymap)

//Função para maximizar a primeira letra após cada espaço:
function upperFirst(text) {
    var words = text.toLowerCase().split(' ')
    for (var a = 0; a < words.length; a++) {
        var w = words[a]
        words[a] = w[0].toUpperCase() + w.slice(1)
    }
    return words.join(' ')
}

//Adicionando comportamento para voltar a página
let voltar = document.getElementById("voltar")
voltar.addEventListener('click', function (e){
    //Voltando SEM atualizar:
    history.back()

    //Voltando ATUALIZANDO:
    // window.location = 'index.html'
})
