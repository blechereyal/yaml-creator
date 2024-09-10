<template>
    <div class="flex gap-2">
      <p class="font-bold">Actions</p>
      <AppBtn @click="addGame()" label="Add game" />
    </div>
    <div class="mt-4">
      <div class="divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Games</h2>
        <dl class="mt-4 space-y-4 divide-y divide-gray-900/10">
          <Disclosure as="div" v-for="(game, idx) in games" class="pt-6" v-slot="{ open }">
            <dt>
              <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                <span class="text-base font-semibold leading-7">Game #{{ idx }} - {{ game.name }} - 
                  <AppBtn label="Delete game" @click.stop="deleteGame(idx)"/> - 
                  <AppBtn label="Move Up" @click.stop="moveUp(idx)"/> - 
                  <AppBtn label="Move Down" @click.stop="moveDown(idx)"/> - 
                  <AppBtn label="Duplicate Game" @click.stop="duplicateGame(idx)"/> - 
                  <Select :options="store.tournamentsAsOptions" :label="'Move to tournament'" @update="(event) => {
                    moveGame(event, idx)
                    }" />
                </span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <Game v-model="games[idx]" />
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'
import Game from '../Game.vue';
import Select from '../Select.vue';

import AppBtn from './AppBtn.vue';
import { useTournamentsStore } from '../../store';


const store = useTournamentsStore();

const props = defineProps<{
  idx: number
}>();

const games = store.tournaments[props.idx].games;

const deleteGame = (idx: number) => {
  games.splice(idx, 1);
}

const duplicateGame = (idx: number) => {
  const toDuplicate = JSON.parse(JSON.stringify(games[idx]));
  games.push(toDuplicate);
}


const addGame = () => {
  games.push({
    name: '',
    description: '',
    playVariant: null,
    image: null,
    gameRounds: [],
  })
}
const moveDown = (idx: number) => {
  if (games.length <= idx + 1) {
    return ;
  }

  let tmp = games[idx];
  games[idx] = games[idx + 1];
  games[idx + 1] = tmp;
}

const moveUp = (idx: number) => {
  if (idx == 0) {
    return ;
  }

  let tmp = games[idx];
  games[idx] = games[idx - 1];
  games[idx - 1] = tmp;
}

const moveGame = (event:any, gameIdx: number) => {
  store.moveGameToTournament(props.idx, event.id, gameIdx);
}
</script>