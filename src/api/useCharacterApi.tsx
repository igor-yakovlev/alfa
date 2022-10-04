
const BASE_URL = "https://rickandmortyapi.com/api";

export function useCharacterApi(): characterApi {
  return {
    findAll: () => {
      return fetch(`${BASE_URL}/character`)
        .then(resp => resp.json())
        .then(res => res.results)
    },
    findOne:  (id: number) => {
      return fetch(`${BASE_URL}/character/${id}`)
      .then(resp => resp.json())
      .then(res => console.log(res)
      )
    }
  }
}

export interface characterApi {
  findAll: () => Promise<Character[]>;
  findOne: (id: number) => Promise<Character>
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  },
  location: {
    name: string;
    url: string;
  },
  image: string;
  episode: [],
  url: string,
  created: string;
}
