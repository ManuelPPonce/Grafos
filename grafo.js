// Variables 



let table = document.getElementById('grafo-table');
let button = document.getElementById('ObtenerDatos');
let resultado = document.getElementById('result');
let ver = document.getElementById('vertices');
// let aris = document.getElementById('aristas');
let verValue = 0;
let arisValue = 0;
let numNodos = 0;
let symmetrical;
let ed = 0;


function grafoButton() {
    verValue = ver.value;
    arisValue = ver.value;
    document.getElementById('cont-1').innerHTML = 'Ingrese los valores del grafo:';



    let div = ``;

    for (let i = 0; i < verValue; i++) {
        div += `<tr>`;
        for (let j = 0; j < arisValue; j++) {
            div += `<td><input disabled id = ${i},${j} type="text"></td>`;
        }
        div += `</tr>`;

    }



    table.innerHTML = div;
    for (let i = 0; i < verValue; i++) {
        for (let j = i + 1; j < arisValue; j++) {
            let vertice = document.getElementById(`${i},${j}`);
            vertice.removeAttribute("disabled");
        }
    }
    button.removeAttribute("disabled");

}



function obtenerDatos() {


    let array = [];


    for (let i = 0; i < verValue; i++) {
        let arrayTemp = [];
        for (let j = 0; j < arisValue; j++) {
            arrayTemp.push(document.getElementById(`${i},${j}`).value);
        }
        array.push(arrayTemp);
    }
    symmetrical = noDirigido(array);
    ed = edges(array, symmetrical);
    if (!symmetrical) {
        // console.log('El grafo es No Dirigido');
        resultado.style.color = 'green';
        resultado.innerHTML = `<h3> Es Simetrico , Edges : ${ed} </h3>`;
    } else {
        // console.log('El grafo No es  No Dirigido');
        resultado.style.color = 'red';
        resultado.innerHTML = `<h3> No es Simetrico , Edges : ${ed}</h3>`;

    }

    pintarGrafo(array);
    console.log(valorAristas(array));

    var blob = new Blob([`${array}`], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "testfile1.txt");
    return array;


}
//Determinar si el grafo es NoDirigido
// i = Row 
// j = Columna

function noDirigido(array) {

    for (let i = 0; i < verValue; i++) {
        for (let j = i + 1; j < arisValue; j++) {
            if (array[i][j] != array[j][i]) {
                return false;
            }
        }
    }




    return true;

}

function valorAristas(array) {

    let valor = [];
    for (let i = 0; i < verValue; i++) {
        for (let j = i; j < verValue; j++) {
            if (array[i][j] > 0) {
                valor.push(parseInt(array[i][j]));

            }
        }

    }

    return valor;
}

function edges(array, symmetrical) {
    let cont = 0;
    if (symmetrical) {
        for (let i = 0; i < verValue; i++) {
            for (let j = i; j < verValue; j++) {
                if (array[i][j] > 0) {
                    // cont += parseInt(array[i][j]);
                    cont++;
                }
            }

        }
    } else {
        for (let i = 0; i < verValue; i++) {
            for (let j = 0; j < arisValue; j++) {
                if (array[i][j] > 0) {
                    // cont += parseInt(array[i][j]);
                    cont++;
                }
            }
        }

    }
    console.log(cont);
    return cont;

}

function pintarGrafo(array) {
    let svg = document.getElementById('svg');
    console.log(svg);
    let posGrafo = '<g  fill="#FFD700">';
    let temp1 = 1;
    let temp2 = 1;
    let grafoArrayX = [];
    let grafoArrayY = [];
    let posx;
    let posy;
    let abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ' I', 'J', 'K'];
    for (let i = 1; i <= verValue; i++) {
        if (i % 2 == 0) {
            posx = temp1 * 15;
            posy = 20;
            posGrafo += `<circle cx="${posx}%" cy="${posy}%" r="3"> </circle>`;
            grafoArrayX.push([posx]);
            grafoArrayY.push([posy]);

            temp1++;
        } else {
            posx = temp2 * 20;
            posy = 40;
            posGrafo += `<circle cx="${posx}%" cy="${posy}%" r="3"> </circle>`;
            grafoArrayX.push([posx]);
            grafoArrayY.push([posy]);
            temp2++;
        }
    }
    posGrafo += '</g>';
    let grafo = `${posGrafo}`;

    // svg.innerHTML = grafo;

    let letras = '<g fill="#000000" font-size="1.8" text-anchor="middle">';
    for (let i = 0; i < verValue; i++) {
        letras += `<text x="${grafoArrayX[i]}%" y="${grafoArrayY[i]}%" dy="1">${abecedario[i]}</text>`

    }

    letras += '</g>';
    let lineasPos = [];
    let lineas = '<g  stroke-width="0.1">';
    // if (symmetrical) {
    let value = valorAristas(array);
    let posText = 0;
    for (let i = 0; i < verValue; i++) {
        for (let j = i + 1; j < verValue; j++) {
            console.log(value[i]);
            if (array[i][j] > 0) {
                lineas += `<line stroke="#00FF00" id = ${i},${j} x1="${grafoArrayX[i]}%" y1="${grafoArrayY[i]}%" x2="${grafoArrayX[j]}%" y2="${grafoArrayY[j]}%"/>`


                lineas += `<text x="${((parseInt(grafoArrayX[i]) + parseInt(grafoArrayX[j])) / 2)}%" y="${(parseInt(grafoArrayY[i]) + parseInt(grafoArrayY[j])) / 2}%" font-family="Verdana" font-size="1" alignment-baseline="text-before-edge" fill="#000">
                            ${value[posText++]}
                 </text>`;
            }
        }

    }
    // }

    lineas += '</g>';
    svg.innerHTML = grafo + letras + lineas;

}

// if (i == 0) {
//     posGrafo += `<circle cx="${i*10}" cy="=10" r="3"> </circle> `; 
// }
// else if (i % 2 == 0) {
// } else {
//     posGrafo +=`<circle cx="${temp*10}" cy="=40" r="3"> </circle>`;
//     temp++;
// }