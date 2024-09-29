<template>
  <section
    v-if="isLoading || winnerPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3x1">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokemons...</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen bg-zinc-700">
    <h1 class="m-5 text-white">¿Quién es ese Pokemon?</h1>
    <!-- <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(4)"
        class="bg-blue-500 shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-blue-100"
      >
        Volver a jugar
      </button>
    </div> -->

    <!-- Pokemon Picture -->
    <PokemonPicture
      :pokemon-id="winnerPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <!-- Pokemon Options -->
    <PokemonOptions
      :options="pokemonOptions"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="winnerPokemon.id"
      @selected-option="checkAnswer"
    />
    <div class="m-5">
      <PokemonStatus :wins="winsCounter" :loses="losesCounter" />
    </div>
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonStatus from '../components/PokemonStatus.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  gameStatus,
  isLoading,
  winnerPokemon,
  pokemonOptions,
  checkAnswer,
  getNextRound,
  winsCounter,
  losesCounter,
} = usePokemonGame();
</script>
