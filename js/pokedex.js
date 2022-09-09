
const pokeCard = document.querySelector('[poke__card]');
const pokeName = document.querySelector('[poke__card__name]');
const pokeImg = document.querySelector('[poke__card__name__container__img]');
const pokeImgContainer = document.querySelector('[poke__card__name__container]');
const pokeId = document.querySelector('[poke__card__id]');
const pokeTypes = document.querySelector('[poke__card__types]');
const pokeStats = document.querySelector('[poke__card__stats]');


const Colors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => PokemonData(response))
        .catch(err => NotFound())
}

const PokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setColor(types);
    PokemonTypes(types);
    PokemonStats(stats);
}


const setColor = types => {
    const colorOne = Colors[types[0].type.name];
    const colorTwo = types[1] ? Colors[types[1].type.name] : Colors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 10%, ${colorOne} 10%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const PokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = Colors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const PokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const Element = document.createElement("div");
        const ElementName = document.createElement("div");
        const ElementAmount = document.createElement("div");
        ElementName.textContent = stat.stat.name;
        ElementAmount.textContent = stat.base_stat;
        Element.appendChild(ElementName);
        Element.appendChild(ElementAmount);
        pokeStats.appendChild(Element);
    });
}

const NotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute ('src', 'public/img/1.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}