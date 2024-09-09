<template>
  <div class="pt-4 flex flex-col gap-6">
    <div>
      <nav class="flex space-x-4" aria-label="Tabs">
        <a v-for="(tournament, idx) in store.tournaments" :key="tournament.name" :href="'#'" 
          :class="[selectedTournament === idx ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']" 
          :aria-current="selectedTournament === idx ? 'page' : undefined" @click="selectedTournament = idx">
          {{ tournament.name }}
        </a>
      </nav>
    </div>
    <div>
      <div v-for="(tournament, idx) in store.tournaments" :key="tournament.name" :href="'#'" :class="{ hidden: selectedTournament !== idx }" >
        <Tournament :idx="idx" />
      </div>
    </div>
  </div>

</template>
  
<script setup lang="ts">
import {  ref } from 'vue';
import Tournament from './Tournament.vue';
import { useTournamentsStore } from '../store';

const store = useTournamentsStore();
const selectedTournament= ref<number>(0);

</script>