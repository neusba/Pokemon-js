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

function createTable() {
    
}
