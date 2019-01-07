'use strict';
//Pegando a referência para o local onde a tabela será gerada:
let bodyContent = document.getElementById('bodyContent')

//Referência para o campo onde a exceção será tratada:
let errorSpace = document.getElementById('errorSpace')

//Referência para o campo de busca:
let search = document.getElementById('search')

//Referência para o botão no rodapé (estatísticas):
let estatisticas = document.getElementById('bottom-button')

//O retorno do servidor:
let data;

//Utilizando AJAX para receber o JSON:
let size = 25
let xhttp = new XMLHttpRequest()
xhttp.open("GET", `https://randomuser.me/api/?results=${size}`, false)
try {
    xhttp.send()
}
//Tratando exceção:
catch (e) {
    let err = document.createElement('h3')
    let time3 = "reconectando em 3 segundos"
    let time2 = "reconectando em 2 segundos"
    let time1 = "reconectando em 1 segundo"

    //Timeouts em Cascata:
    setTimeout(function () {
        errorSpace.innerHTML = time3;
        setTimeout(function () {
            errorSpace.innerHTML = time2;
            setTimeout(function () {
                errorSpace.innerHTML = time1;
                setTimeout(function () {
                    errorSpace.innerHTML = "recarregando...";
                    //Recarrega a página:
                    window.location = 'index.html'
                }, 1200)
            }, 1000)
        }, 1000)
    }, 5000)
}

//Se o servidor retornar o JSON corretamente:
if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
    errorSpace.innerHTML = ''
    data = JSON.parse(xhttp.responseText);
    //Exibindo elementos até então ocultos:
    let table = document.getElementById('table-index').style.display = 'table'
    let bottomButtom = document.getElementById('bottom-button').style.display = 'block'
    let search = document.getElementById('search').style.display = 'block'

    //Gerando dinamicamente os itens da tabela:
    for (let a = 0; a < size; a++) {
        let row = document.createElement('tr')
        row.setAttribute('scope', 'row')

        //Atribuindo chamada de método ao evento "onClick:"
        row.setAttribute('onClick', 'setData(' + JSON.stringify(data.results[a]) + ')')

        //Coluna 1 - Nome e Sobrenome:
        //Manobra para deixar a primeira letra maiúscula:
        let col1 = document.createElement('td')
        let temp1 = upperFirst(data.results[a].name.first)
        let temp2 = upperFirst(data.results[a].name.last)
        col1.innerHTML = `${temp1} ${temp2}`

        //Coluna 2 - E-mail:
        //Manobra para deixar a primeira letra maiúscula:
        let col2 = document.createElement('td')
        col2.innerHTML = `${data.results[a].email}`

        //Coluna 3 - Telefone:
        let col3 = document.createElement('td')
        col3.innerHTML = `${data.results[a].phone}`

        row.appendChild(col1)
        row.appendChild(col2)
        row.appendChild(col3)
        bodyContent.appendChild(row)
    }
}

function setData(x) {

    //Guardando o JSON na memória do navegador:
    sessionStorage.setItem('key', JSON.stringify(x))
    //Limpando a barra de pesquisa:
    search.value = ''
    //Indo para a próxima página:
    window.location = 'data.html'

}

function upperFirst(text) {
    //Guardando num Array cada palavra separada por "espaço"
    var words = text.toLowerCase().split(" ")
    for (var a = 0; a < words.length; a++) {
        var w = words[a]
        words[a] = w[0].toUpperCase() + w.slice(1)
    }
    return words.join(" ")
}

//Ir para a página das estatísticas:
estatisticas.addEventListener('click', function () {
    //Salvando o Array de pessoas na memória do Navegador:
    sessionStorage.setItem('json', JSON.stringify(data))
    window.location = 'statistics.html'
})


//Filtrar usuários pelo nome:
//Será executado a cada botão digitado.
search.addEventListener('input', function () {
    //Limpa os nomes gerados:
    bodyContent.innerHTML = ''
    for (let a = 0; a < size; a++) {
        //Concatentando primeiro com último nome:
        let temp1 = (data.results[a].name.first + " ")
        let temp2 = (data.results[a].name.last)
        let tempName = temp1.concat(temp2)

        //Variável que recebe o e-mail temporário:
        let tempEmail = data.results[a].email
        //Condição de igualdade:
        /*
        Se o nome atual todo em maiúsculo for igual
        a palavra digitada no imput toda em maiúsculo OU
        Se o endereço de email atual todo em maiúsculo for igual
        a palavra digitada no imput toda em maiúsculo:
        */
        if ((tempName.toUpperCase().indexOf(search.value.toUpperCase()) != -1) ||
            (tempEmail.toUpperCase().indexOf(search.value.toUpperCase()) != -1)) {
            let row = document.createElement('tr')
            row.setAttribute('scope', 'row')
            //Atribuindo chamada de método ao evento "onClick:"
            row.setAttribute('onClick', 'setData(' + JSON.stringify(data.results[a]) + ')')
            //Coluna 1 - Nome e Sobrenome:
            //Manobra para deixar a primeira letra maiúscula:
            let col1 = document.createElement('td')
            let temp1 = upperFirst(data.results[a].name.first)
            let temp2 = upperFirst(data.results[a].name.last)
            col1.innerHTML = `${temp1} ${temp2}`

            //Coluna 2 - E-mail:
            //Manobra para deixar a primeira letra maiúscula:
            let col2 = document.createElement('td')
            col2.innerHTML = `${data.results[a].email}`

            //Coluna 3 - Telefone:
            let col3 = document.createElement('td')
            col3.innerHTML = `${data.results[a].phone}`

            row.appendChild(col1)
            row.appendChild(col2)
            row.appendChild(col3)
            bodyContent.appendChild(row)
        }
    }
})