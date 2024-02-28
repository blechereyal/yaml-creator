<template>
    <div>
        <div class="flex flex-col gap-2 mb-4">
           <Input v-model="tournament!.name" :label="'Name'"/>
           <Input v-model="tournament!.startDate" :type="'datetime-local'" :label="'Start date'"/>
       </div>
       <GameAccordion :games="tournament!.games" />
    </div>
</template>
  
<script setup lang="ts">
import Input from './Input.vue';
import { defineModel } from 'vue';
import { TournamentT } from '../services/structure';
import GameAccordion from './core/GameAccordion.vue';

const tournament = defineModel<TournamentT>();
</script>