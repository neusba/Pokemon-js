/* PASO 0 */

let pokemonsData = [];
let municipiosData = []; 
let meteoritosData = [];
let moviesData = [];

let pokemons = [];
let municipios = []; 
let meteoritos = [];
let movies = [];

let promiseArrays = Promise.all([
    fetch("js/data/pokemon.json").then(response => response.json()),
    fetch("js/data/municipis.json").then(response => response.json()),
    fetch("js/data/earthMeteorites.json").then(response => response.json()),
    fetch("js/data/movies.json").then(response => response.json())
]).then(([dataPokemon, dataMunicipis, dataMeteorites, dataMovies]) => {

    dataPokemon.pokemon.forEach(dato => pokemonsData.push(dato));
    dataMunicipis.elements.forEach(dato => municipiosData.push(dato));
    dataMeteorites.forEach(dato => meteoritosData.push(dato));
    dataMovies.movies.forEach(dato => moviesData.push(dato));

    dataPokemon.pokemon.forEach(dato => pokemons.push(dato.name));
    dataMunicipis.elements.forEach(dato => municipios.push(dato.municipi_nom));
    dataMeteorites.forEach(dato => meteoritos.push(dato.name));
    dataMovies.movies.forEach(dato => movies.push(dato.title));

    let maxLength = Math.max(pokemons.length, municipios.length, meteoritos.length, movies.length);
    let dades = [];
    for (let i = 0; i < maxLength; i++) {
        dades.push({
            Pokemons: pokemons[i] || "",
            Municipios: municipios[i] || "",
            Meteoritos: meteoritos[i] || "",
            Películas: movies[i] || ""
        });
    }

    console.table(dades);
	
});

/* PASO 1: Funciones y arrays */

// Creamos el array multidimensional una vez la promise que recoge los datos termina
let multidimensional = [];

promiseArrays
  .then(resultado => {
    multidimensional = [pokemonsData, municipiosData, meteoritosData, moviesData];

  })
  .catch(error => {
    console.error("Promesa rechazada:", error);
  });

/* Funciones de los botones que alteran la tabla */
function refresh() {
    location.reload();
}

function orderList(string) {

}

function searchList() {

}

function calcula() {

}

function pokemonsTable() {
  let cajas = '';
  let contenedor = document.getElementById('resultat');

  for (let i=0; i<pokemonsData.length; i++) {
    cajas += `<div class="box">
                <img class="img" src=${pokemonsData[i].img}>
                <div class="specs">
                  <p class="pSpecs"><span style="font-weight: bold">Id:</span> ${pokemonsData[i].id}</p>
                  <p class="pSpecs"><span style="font-weight: bold">Name:</span> ${pokemonsData[i].name}</p>
                  <p class="pSpecs"><span style="font-weight: bold">Weight:</span> ${pokemonsData[i].weight}</p>
                </div>
              </div>`
  }
  contenedor.innerHTML = cajas;
}

function municipiosTable() {
  let cajas = '';
  let contenedor = document.getElementById('resultat');

  for (let i=0; i<municipiosData.length; i++) {
    cajas += `<div class="box">
                <img class="img" src=${municipiosData[i].municipi_escut}>
                <div class="specs">
                  <p class="pSpecs"><span style="font-weight: bold">Id:</span> ${municipiosData[i]}</p>
                  <p class="pSpecs"><span style="font-weight: bold">Name:</span> ${municipiosData[i].municipi_nom}</p>
                  <p class="pSpecs"><span style="font-weight: bold">INE:</span> ${municipiosData[i].ine}</p>
                </div>
              </div>`
  }
  contenedor.innerHTML = cajas;
}

function meteoritosTable() {
  let cajas = '';
  let contenedor = document.getElementById('resultat');

  for (let i=0; i<meteoritosData.length; i++) {
    cajas += `<div class="box">
                <img class="img" src=${meteoritosData[i].municipi_escut}>
                <div class="specs">
                  <p class="pSpecs"><span style="font-weight: bold">Id:</span> ${meteoritosData[i].id}</p>
                  <p class="pSpecs"><span style="font-weight: bold">Name:</span> ${meteoritosData[i].name}</p>
                  <p class="pSpecs"><span style="font-weight: bold">Mass:</span> ${meteoritosData[i].mass}</p>
                </div>
              </div>`
  }
  contenedor.innerHTML = cajas;
}

function moviesTable() {
  let cajas = '';
  let contenedor = document.getElementById('resultat');

  for (let i=0; i<moviesData.length; i++) {
    cajas += `<div class="box">
                <img class="img" src=${moviesData[i].url}>
                <div class="specs">
                  <p class="pSpecs"><span style="font-weight: bold">Year:</span> ${moviesData[i].year}</p>
                  <p class="pSpecs"><span style="font-weight: bold">Name:</span> ${moviesData[i].title}</p>
                  <p class="pSpecs"><span style="font-weight: bold">Rating:</span> ${moviesData[i].rating}</p>
                </div>
              </div>`
  }
  contenedor.innerHTML = cajas;
}
