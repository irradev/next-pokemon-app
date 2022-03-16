import axios from 'axios';

const pokeAPi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export default pokeAPi;
