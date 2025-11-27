import { Characters } from "./pages/Characters";

export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    characters: [],
    planets: [],
    starships: [],
    currentCharacter: {
      uid: "",
      name: "",
      url: "",
    },
    currentPlanet: {
      uid: "",
      name: "",
      url: "",
    },
    characterDetails: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    
    case 'setCharacters':
      return {
        ...store,
        characters: action.payload
      };
    
    case 'setPlanets':
      return {
        ...store,
        planets: action.payload
      };
    
    case 'setStarships':
      return {
        ...store,
        starships: action.payload
      };
    
    case 'setCurrentCharacter':
      return {
        ...store,
        currentCharacter: action.payload
      };

    case 'setCurrentPlanet':
      return {
        ...store,
        currentPlanet: action.payload
      };

    case 'setCharacterDetails':
      return {
        ...store,
        characterDetails: action.payload
      }

    default:
      throw Error('Unknown action.');
  }    
}
