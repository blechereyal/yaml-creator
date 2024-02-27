<template>


  <div class="pt-4 flex flex-col gap-6">
    <div>
      <nav class="flex space-x-4" aria-label="Tabs">
        <a v-for="(_tournament, idx) in tournaments" :key="idx" :href="'#'" 
          :class="[selectedTournament === idx ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']" 
          :aria-current="selectedTournament === idx ? 'page' : undefined" @click="selectedTournament = idx">
          Tournament {{ idx + 1 }}
        </a>
      </nav>
    </div>
    <div>
      <div v-for="(tournament, idx) in tournaments" :key="idx" :href="'#'" :class="{ hidden: selectedTournament !== idx }" >
        <GameAccordion :games="tournament.games" />
      </div>
    </div>
  </div>

</template>
  
<script setup lang="ts">
import { TournamentT, gameTypes } from '../services/structure';
import GameAccordion from './core/GameAccordion.vue';
import { ref } from 'vue';

const props = defineProps<{
  tournaments: TournamentT[],
}>();



const selectedTournament= ref<number>(0);


</script>