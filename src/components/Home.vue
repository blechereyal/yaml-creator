<template>
  <GameAccordion :games="games"/>
</template>

<script setup lang="ts">
import { GameT } from '../services/structure';
import { loadGames } from '../services/yamler';
import GameAccordion from './core/GameAccordion.vue';
import { ref } from 'vue';

const games = ref<GameT[]>(loadGames());

</script>