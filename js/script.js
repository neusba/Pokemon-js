let pokemons = [];
let municipios = []; 
let meteoritos = [];
let movies = [];

Promise.all([
    fetch("js/data/pokemon.json").then(response => response.json()),
    fetch("js/data/municipis.json").then(response => response.json()),
    fetch("js/data/earthMeteorites.json").then(response => response.json()),
    fetch("js/data/movies.json").then(response => response.json())
]).then(([dataPokemon, dataMunicipis, dataMeteorites, dataMovies]) => {
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

