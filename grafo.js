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

// define algunas variables necesarias
var cx = 50;
var cy = 20;
var r = 13;
var lados = 0;

// // la función points
// function points(cx, cy, r, lados) {
//     var a = 360 / lados;
//     // inicia la variable points
//     var points = (cx + r) + "," + cy + " ";
//     // calcula el resto de los puntos
//     for (var i = 1; i <= lados; i++) {
//         var aRad = (Math.PI / 180) * (a * i);
//         Xp = cx + r * Math.cos(aRad);
//         Yp = cy + r * Math.sin(aRad);
//         console.log(Xp,Yp);
//         console.log(points += Xp + "," + Yp + " ");
//     }
//     // devuelve la variable points			
//     return points;
// }

// console.log(points(cx, cy, r, lados));
// // busca el elemento #poligono

// var poligono = document.getElementById("poligono");
// modifica el valor del atributo points utilizando la función points.
// poligono.setAttribute("points", points(cx, cy, r, lados));
function grafoButton() {
    verValue = ver.value;
    arisValue = ver.value;
    document.getElementById('cont-1').innerHTML = 'Ingrese los valores del grafo:';


    if (verValue < 10) {

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
}



function obtenerDatos() {

    lados = verValue;
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
    // txtGrafo(array);

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

    if (verValue < 5) {
        for (let i = 1; i <= verValue; i++) {
            if (i % 2 == 0) {
                posx = temp1 * 30;
                posy = 20;
                posGrafo += `<circle cx="${posx}%" cy="${posy}%" r="3"> </circle>`;
                grafoArrayX.push([posx]);
                grafoArrayY.push([posy]);

                temp1++;
            } else {
                posx = temp2 * 25;
                posy = 40;
                posGrafo += `<circle cx="${posx}%" cy="${posy}%" r="3"> </circle>`;
                grafoArrayX.push([posx]);
                grafoArrayY.push([posy]);
                temp2++;
            }
        }
    } else {
        var a = 360 / lados;
        // inicia la variable points
        var points = (cx + r) + "," + cy + " ";
        // calcula el resto de los puntos
        for (var i = 1; i <= lados; i++) {
            var aRad = (Math.PI / 180) * (a * i);
            Xp = cx + r * Math.cos(aRad);
            Yp = cy + r * Math.sin(aRad);
            posGrafo += `<circle cx="${Xp}%" cy="${Yp}%" r="3"> </circle>`;
            points += Xp + "," + Yp + " ";
            grafoArrayX.push([Xp]);
            grafoArrayY.push([Yp]);
        }
    }

    posGrafo += '</g>';
    let grafo = `${posGrafo}`;

    // svg.innerHTML = grafo;

    let letras = '<g fill="#000000" font-size="1.8" text-anchor="middle">';
    
    for (let i = 0; i < verValue; i++) {
        letras += `<text  x="${grafoArrayX[i]}%" y="${grafoArrayY[i]}%" dy="1">${abecedario[i]}</text>`

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
                
                var randomColor = Math.floor(Math.random()*16777215).toString(16);
                console.log(randomColor);
                lineas += `<line stroke="#${randomColor}" id = ${i},${j} x1="${grafoArrayX[i]}%" y1="${grafoArrayY[i]}%" x2="${grafoArrayX[j]}%" y2="${grafoArrayY[j]}%"/>`


                lineas += `<text fill="#${randomColor}" x="${((parseInt(grafoArrayX[i]) + parseInt(grafoArrayX[j])) / 2)}%" y="${(parseInt(grafoArrayY[i]) + parseInt(grafoArrayY[j])) / 2}%" font-family="Verdana" font-size="1" alignment-baseline="text-before-edge" fill="#000">
                            ${value[posText++]}
                 </text>`;
            }
        }

    }
    // }

    lineas += '</g>';
    svg.innerHTML = grafo + letras + lineas;

}

function txtGrafo() {
    array = obtenerDatos();
    var blob = new Blob([`[ciudades : ${verValue}] \n Hi`], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "Grafo.txt");


}