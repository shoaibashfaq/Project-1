let titleH1;
let episode;
let releaseDate;
let director;
let characterList = [];
let planetList = []
const baseUrl = `https://swapi2.azurewebsites.net/api`;
 
// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  episode = document.querySelector('span#episode');
  releaseDate = document.querySelector('span#relDate');
  director = document.querySelector('span#director');
  summary = document.querySelector('span#summary');
  charactersUL = document.querySelector('#characters>ul');
  planetsUL = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});
 
async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.characters = await fetchCharacters(id)
    film.planets = await fetchPlanets(id)
    
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
 
}
async function fetchFilm(id) {
  try {
    const filmUrl = `${baseUrl}/films/${id}`;
    const response = await fetch(filmUrl);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching the film:', error);
  }
}

 
async function fetchCharacters(id) {
  const url = `${baseUrl}/films/${id}/characters`;
  const charactersFetchedFromFilm = await fetch(url)
    .then(res => res.json())
    characterList.push(...charactersFetchedFromFilm)
    console.log("characters List: ", characterList)
  return characterList;
}
 
async function fetchPlanets(id) {
  const url = `${baseUrl}/films/${id}/planets`;
  const planetsFetchedFromFilm = await fetch(url)
    .then(res => res.json())
    planetList.push(...planetsFetchedFromFilm)
    console.log("planets List: ", planetList)
  return planetList;
}
 
const renderFilm = film => {
  document.title = `SWAPI - ${film?.name}`; 
  titleH1.textContent = film?.title;
  episode.textContent = film?.episode_id;
  releaseDate.textContent = film?.release_date;
  director.textContent = film?.director;
  summary.textContent = film?.opening_crawl;
  const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUL.innerHTML = charactersLis.join("");
  const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
planetsUL.innerHTML = planetsLis.join("");
}