<template>
    <div>
        <div class="flex flex-col gap-2 mb-4">
           <Input v-model="tournament!.name" :label="'Name'"/>
           <Input v-model="tournament!.start_date" :type="'datetime-local'" :label="'Start date'"/>

           <div class="flex flex-row gap-2">
               <h2>Tournament Money prizes</h2>
               <AppBtn label="New Prize" @click="newPrize" />

           </div>
           <div class="flex flex-row gap-4 w-full" v-for="(prize, idx) in tournament?.prizes" v-if="tournament?.prizes">
                <div class="flex gap-2 w-full items-center justify-center">
                    <p>#{{ idx+1 }}</p><Input type="number" v-model="tournament!.prizes[idx]"/><AppBtn label="Delete Prize" @click="deletePrize" />
                </div>
            </div>
            <h2>Tournament ticket winners count</h2>
            <Input v-model="tournament!.ticket_winners" type="number"/>
            <h2>Per game ticket winners</h2>
            <Input v-model="tournament!.per_game_ticket_winners" type="number"/>
       </div>
       <GameAccordion :games="tournament!.games" />
    </div>
</template>
  
<script setup lang="ts">
import Input from './Input.vue';
import { defineModel } from 'vue';
import { TournamentT } from '../services/structure';
import GameAccordion from './core/GameAccordion.vue';
import AppBtn from './core/AppBtn.vue';

const tournament = defineModel<TournamentT>();
const newPrize = () => {
  tournament.value!.prizes!.push(0);
};

const deletePrize = (idx: number) => {
  tournament.value!.prizes!.splice(idx, 1);
}


</script>