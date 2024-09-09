<template>
  <div>
    <div class="flex flex-col gap-2 mb-4">
      <Input v-model="tournament!.name" :label="'Name'" />
      <Input v-model="tournament!.start_date" :type="'datetime-local'" :label="'Start date'" />

      <div class="flex flex-row gap-2">
        <h2>Tournament Money prizes</h2>
        <AppBtn label="New Prize" @click="newPrize" />

      </div>
      <div class="flex flex-row gap-4 w-full" v-for="(_prize, idx) in tournament?.prizes" v-if="tournament?.prizes">
        <div class="flex gap-2 w-full items-center justify-center">
          <p>#{{ idx + 1 }}</p><Input type="number" v-model="tournament!.prizes[idx]" />
          <AppBtn label="Delete Prize" @click="deletePrize" />
        </div>
      </div>
      <h2>Tournament - ticket winners (use range like "10-15")</h2>
      <Input v-model="tournament!.ticket_winners" />
      <h2>Tournament - invite winners (use range like "10-15")</h2>
      <Input v-model="tournament!.invite_winners" />
      <h2>Game - ticket winners (use range like "10-15")</h2>
      <Input v-model="tournament!.per_game_ticket_winners" />
      <h2>Game - invite winners (use range like "10-15")</h2>
      <Input v-model="tournament!.per_game_invite_winners" />
    </div>
    <GameAccordion :idx="idx" />
  </div>
</template>

<script setup lang="ts">
import Input from './Input.vue';
import GameAccordion from './core/GameAccordion.vue';
import AppBtn from './core/AppBtn.vue';
import { useTournamentsStore } from '../store';

const store = useTournamentsStore();
const props = defineProps<{
  idx: number
}>();
const tournament = store.tournaments[props.idx];

if (!tournament!.prizes) {
  tournament!.prizes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

const newPrize = () => {
  tournament!.prizes!.push(0);
};

const deletePrize = (idx: number) => {
  tournament!.prizes!.splice(idx, 1);
}


</script>