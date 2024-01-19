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

    dataPokemon.pokemon.forEach(dato => {
      let newData = [dato.id, dato.img, dato.name, dato.weight];
      pokemonsData.push(newData);
      pokemons.push(dato.name);
    });
      
    dataMunicipis.elements.forEach(dato => {
      let newData = [dato.ine, dato.municipi_escut, dato.municipi_nom, dato.nombre_habitants];
      municipiosData.push(newData);
      municipios.push(dato.municipi_nom);
    });

    dataMeteorites.forEach(dato => {
      let newData = [dato.id, dato.name, dato.fall, dato.mass];
      meteoritosData.push(newData);
      meteoritos.push(dato.name);
    });

    dataMovies.movies.forEach(dato => {
      let newData = [dato.year, dato.url, dato.title, dato.rating];
      moviesData.push(newData);
      movies.push(dato.title);
    });

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
let cabeceras = [];

promiseArrays
.then(resultado => {
  multidimensional = [pokemonsData, municipiosData, meteoritosData, moviesData];
  // Creamos las cabeceras que iran en cada tabla
  cabeceras = [['ID', 'Img', 'Name', 'Weight'], ['INE', 'Img', 'Name', 'N.Hab'], ['ID', 'Name', 'Fall', 'Mass'], ['Year', 'Img', 'Title', 'Rating']];         

  })
  .catch(error => {
    console.error("Promesa rechazada:", error);
  });

/* Funciones de los botones que alteran la tabla */
function refresh() {
  location.reload();
}

function orderList(string) {
  if (string == 'asc' || string == 'desc') {
    // Lógica para ordenar la tabla
  } else {
    alert('Parámetro de orden inválido');
    return;
  }
}

function searchList() {

}

function calcula() {

}

function printList(numTable) {
  let contenedor = document.getElementById('resultat');
  let tablaActual = multidimensional[numTable];
  let cabeceraActual = cabeceras[numTable];
  let estructura = `<table id="tabla">
                      <tr id="cabecera">
                        <th>${cabeceraActual[0]}</th>
                        <th>${cabeceraActual[1]}</th>
                        <th>${cabeceraActual[2]}</th>
                        <th>${cabeceraActual[3]}</th>
                      </tr>`;

  // Recorremos el array correspondiente para añadir los datos a la tabla
  let estructuraDatos = '';

  tablaActual.forEach(datos => {
    let nuevosDatos = `<tr>
                        <td>${datos[0]}</td>
                        <td><img src="${datos[1]}"></td>
                        <td>${datos[2]}</td>
                        <td>${datos[3]}</td>
                      </tr>`;
    estructuraDatos += nuevosDatos;
  })
  contenedor.innerHTML = estructura + estructuraDatos + '</table>';

}
