'use strict';

let size = 25

//Recuperando o array de pessoas salvo na memória do Navegador:
let data = JSON.parse(sessionStorage.getItem('json'))

//Classe necessária para a definição do gráfico Usuários x Nação
class Country {
    constructor(sigla) {
        this.label = sigla
        this.y = 1
    }
}

console.log(data)
//Exibir os três gráficos:
exibirGrafico1()
exibirGrafico2()
exibirGrafico3()

function exibirGrafico1() {
    //Variável recebe a quantidade de usuários do sexo masculino:
    let male = maleCount()
    //Gerando o gráfico:
    var chart = new CanvasJS.Chart("chartContainer1", {
        animationEnabled: true,
        data: [{
            type: "doughnut",
            startAngle: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: [
                { y: male, label: "Masc" },
                //A quantidade de mulheres é calculada da diferença entre o valor
                //Já calculado e o total;
                { y: size - male, label: "Fem" }
            ]
        }]
    })
    //Tornando o gráfico visível:
    chart.render()
}

function exibirGrafico2() {
    //Variável recebe um array, onde cada índice representa
    //uma faixa de idade:
    let ageArray = ageCount()
    //Gerando o gráfico:
    var chart = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        theme: "light2",
        axisY: {
            title: "Quantidade de Pessoas"
        },
        data: [{
            type: "column",
            showInLegend: true,
            legendMarkerColor: "white",
            legendText: "Faixas de Idade",
            dataPoints: [
                { y: ageArray[0], label: "<10" },
                { y: ageArray[1], label: "10~20" },
                { y: ageArray[2], label: "20~30" },
                { y: ageArray[3], label: "30~40" },
                { y: ageArray[4], label: "40~50" },
                { y: ageArray[5], label: "50~60" },
                { y: ageArray[6], label: ">60" },
            ]
        }]
    })
    //Tornando o gráfico visível:
    chart.render()
}

function exibirGrafico3() {
    //Variável recebe um array de objetos da classe "Country".
    let arrayTemp = getCountries()
    //Gerando o gráfico:
    var chart = new CanvasJS.Chart("chartContainer3", {
        animationEnabled: true,
        axisX: {
            interval: 1
        },
        axisY2: {
            interlacedColor: "rgba(1,77,101,.2)",
            gridColor: "rgba(1,77,101,.1)",
            title: "Pessoas por Nação"
        },
        data: [{
            type: "bar",
            name: "companies",
            axisYType: "secondary",
            color: "#014D65",
            dataPoints: arrayTemp
        }]
    })
    //Tornando o gráfico viśivel
    chart.render()

}

//Função que retorna a quantidade de homens.
function maleCount() {
    let male = 0;
    for (let a = 0; a < size; a++) {
        if (data.results[a].gender === 'male') {
            male++
        }
    }
    return male
}

//Função que retorna um array com idades
function ageCount() {
    //Criei um array de 10 espaços, onde o primeiro
    //Espaço representa pessoas entre 0 e 10 anos,
    //o segundo pessoas entre 11 e 20, e assim por diante.
    let ages = [0, 0, 0, 0, 0, 0, 0]
    for (let a = 0; a < size; a++) {
        let ageTemp = data.results[a].dob.age
        console.log(data.results[a].name.first)
        console.log(ageTemp)

        //10 anos ou menos:
        if (ageTemp <= 10) {
            ages[0]++
        }

        //de 11 a 20
        if ((ageTemp > 10) && (ageTemp <= 20)) {
            ages[1]++
        }

        //de 21 a 30
        if ((ageTemp > 20) && (ageTemp <= 30)) {
            ages[2]++
        }

        //de 31 a 40
        if ((ageTemp > 30) && (ageTemp <= 40)) {
            ages[3]++
        }

        //de 41 a 50
        if ((ageTemp > 40) && (ageTemp <= 50)) {
            ages[4]++
        }

        //de 51 a 60
        if ((ageTemp > 50) && (ageTemp <= 60)) {
            ages[5]++
        }

        //maior de 60
        if (ageTemp > 60) {
            ages[6]++
        }
    }
    return ages
}



//Função que retorna um array de objetos
//Cada objeto é composto por país e quantidade de moradores;
function getCountries() {
    let tempCountries = []
    //Inicializou o array com o primeiro valor,
    //pois para comparar com os demais, 
    //precisamos de uma referência inicial.
    let initialCountry = new Country(data.results[0].nat)
    tempCountries[0] = initialCountry;

    for (let a = 1; a < size; a++) {
        //A nação atual:
        let nationTemp = data.results[a].nat;
        //Flag condicional; virará verdadeiro se
        //um novo país for adicionado ao array.
        let add = false

        for (let b = 0; b < tempCountries.length; b++) {
            //Se, dentro do array já houver um registro do mesmo país:
            if (tempCountries[b].label == nationTemp) {
                //Incrementa a quantidade de pessoas deste país.
                tempCountries[b].y++
                //Liga o flag.
                add = true
            }

        }
        //Caso não haja nenhum registro do país ainda (flag desligado):
        if (!add) {
            tempCountries.push(new Country(nationTemp));
            console.log('adicionou o pais')
        }
    }
    return tempCountries
}

//Adicionando comportamento para voltar a página
let voltar = document.getElementById("voltar")
voltar.addEventListener('click', function (e){
    //Voltando SEM atualizar:
    history.back()

    //Voltando ATUALIZANDO:
    // window.location = 'index.html'
})