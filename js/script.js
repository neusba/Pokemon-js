/* PASO 0 */

let pokemonsData = [];
let municipiosData = []; 
let meteoritosData = [];
let moviesData = [];

let pokemons = [];
let municipios = []; 
let meteoritos = [];
let movies = [];

let tiposPokemons = [];

let promiseArrays = Promise.all([
    fetch("js/data/pokemon.json").then(response => response.json()),
    fetch("js/data/municipis.json").then(response => response.json()),
    fetch("js/data/earthMeteorites.json").then(response => response.json()),
    fetch("js/data/movies.json").then(response => response.json())
]).then(([dataPokemon, dataMunicipis, dataMeteorites, dataMovies]) => {

    dataPokemon.pokemon.forEach(dato => {
      let peso = dato.weight.split(' ')[0];
      let newData = [dato.id, dato.img, dato.name, peso];
      pokemonsData.push(newData);
      pokemons.push(dato.name);
      dato.type.forEach(tipo => {
        tiposPokemons.push(tipo);
      })
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
let tablaActual = '';
let cabeceraActual = '';
let tipos = [];

promiseArrays
.then(resultado => {
  multidimensional = [pokemonsData, municipiosData, meteoritosData, moviesData];
  
  // Creamos las cabeceras que iran en cada tabla
  cabeceras = [['ID', 'Img', 'Name', 'Weight'], ['INE', 'Img', 'Name', 'N.Hab'], ['ID', 'Name', 'Fall', 'Mass'], ['Year', 'Img', 'Title', 'Rating']];     
  
  // Filtramos los repetidos del array de los tipos
  tipos = [...new Set(tiposPokemons)];

  /* PASO 3: Modificar funciones para que funcionen con arrays multidimensionales */
  /* Buscador en tiempo real */
  let inputSearch = document.getElementById('txtSearch')
  let coincidencias = [];

  inputSearch.addEventListener('input', function(event) {
    let valor = event.target.value;
    if (!tablaActual) {
      alert('Selecciona una tabla');
      return;
    }
    // Creamos el string con todas las coincidencias del array multidimensional
    multidimensional.forEach(array => {
      array.forEach(datos => {
        datos.forEach(dato => {
          if (dato !== undefined) {
            if (dato.toString().includes(valor)) {
              coincidencias.push(datos)
            }
          }
        })
      })
    })
    // Mostramos los elementos encontrados
    let contenedor = document.getElementById('resultat');
    let estructura = `<table id="tabla">
                        <tr id="cabecera">
                          <th>${cabeceraActual[0]}</th>
                          <th>${cabeceraActual[1]}</th>
                          <th>${cabeceraActual[2]}</th>
                          <th>${cabeceraActual[3]}</th>
                        </tr>`;
    // Recorremos el array correspondiente para añadir los datos a la tabla
    let estructuraDatos = '';

    coincidencias.forEach(datos => {
      let nuevosDatos = `<tr>
                          <td>${datos[0]}</td>
                          <td><img src="${datos[1]}"></td>
                          <td>${datos[2]}</td>
                          <td>${datos[3]}</td>
                        </tr>`;
      estructuraDatos += nuevosDatos;
    })

    contenedor.innerHTML = estructura + estructuraDatos + '</table>';
    coincidencias = '';

    }); 

    
  })
  .catch(error => {
    console.error("Promesa rechazada:", error);
  });

/* Funciones de los botones que alteran la tabla */
function refresh() {
  location.reload();
}

function orderList(string) {
  let nuevoOrden = '';
  if (!tablaActual) {
    alert('Selecciona una tabla');
    return;
  } else {
    if (string == 'asc') {
      if (tablaActual[0][0] != '1') {
        nuevoOrden = tablaActual.reverse();
      }
      printList(0, nuevoOrden);
    } else {
      if (tablaActual[0][0] == '1') {
        nuevoOrden = tablaActual.reverse();
      }
      printList(0, nuevoOrden);
    }
  }
}

function searchList() {
  if (!tablaActual) {
    alert('Selecciona una tabla');
    return;
  }
  let buscador = parseInt(prompt('Introduce la posición del elemento que quieres buscar'));
  let elemento = tablaActual[buscador];

  // Mostramos el elemento encontrado
  let contenedor = document.getElementById('resultat');
  let estructura = `<table id="tabla">
                      <tr id="cabecera">
                        <th>${cabeceraActual[0]}</th>
                        <th>${cabeceraActual[1]}</th>
                        <th>${cabeceraActual[2]}</th>
                        <th>${cabeceraActual[3]}</th>
                      </tr>`;
  let nuevosDatos = `<tr>
                        <td>${elemento[0]}</td>
                        <td><img src="${elemento[1]}"></td>
                        <td>${elemento[2]}</td>
                        <td>${elemento[3]}</td>
                      </tr>`;
  contenedor.innerHTML = estructura + nuevosDatos;
}

function calcula() {
  // Calcula la mediana del valor último de la tabla.
  let totalValores = 0;

  tablaActual.forEach(datos => {
    totalValores += parseInt(datos[3]);
  })

  alert(`La mediana es: ${(totalValores/tablaActual.length).toFixed(2)}`);
}

function printList(numTable, orderList) {
  let contenedor = document.getElementById('resultat');

  if (!orderList) {
    tablaActual = multidimensional[numTable];
    cabeceraActual = cabeceras[numTable];
  } else {
    tablaActual = orderList;
  }

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


/* PASO 2: Creación de un gráfico a través de la libreria Chart.js */
function grafico() {
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: tipos,
      datasets: [{
        data: cantidadTipos(),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function cantidadTipos() {
  // Aquí crearemos un array con las cantidades que hay de cada tipo de Pokemon en nuestros datos
  let cantidades = [];

  tipos.forEach(tipo => {
    let cantidad = 0;
    tiposPokemons.forEach(tipoPokemon => {
      if (tipo == tipoPokemon) {
        cantidad++;
      }
    })
    cantidades.push(cantidad);
  })

  return cantidades;
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
