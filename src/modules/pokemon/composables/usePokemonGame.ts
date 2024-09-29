import { GameStatus, type Pokemon, type PokemonListResponse } from '@/modules/pokemon/interfaces';
import { computed, onMounted, ref } from 'vue';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const winsCounter = ref(0);
  const losesCounter = ref(0);

  const winnerPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });

  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async () => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonArray: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;

      return {
        name: pokemon.name,
        id: +id, //El + se utilizó para pasar a positivo un valor de texto
      };
    });

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = id === winnerPokemon.value.id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      winsCounter.value++;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        getNextRound();
      }, 2000);
      return;
    }
    losesCounter.value++;
    gameStatus.value = GameStatus.Lost;

    setTimeout(() => {
      getNextRound();
    }, 1500);
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextRound();

    console.log(pokemonOptions.value);
  });

  return {
    //Propiedades
    gameStatus,
    isLoading,
    pokemonOptions,
    winnerPokemon,
    winsCounter,
    losesCounter,

    //Metodos
    getNextRound,
    checkAnswer,
  };
};
