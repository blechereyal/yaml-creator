<template>
    <div class="mt-4">
      <div class="divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Games</h2>
        <dl class="mt-4 space-y-4 divide-y divide-gray-900/10">
          <Disclosure as="div" v-for="(game, idx) in props.games" class="pt-6" v-slot="{ open }">
            <dt>
              <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                <span class="text-base font-semibold leading-7">Game #{{ idx }} - {{ game.name }} - <AppBtn label="Delete game" @click.stop="deleteGame(idx)"/> - <AppBtn label="Move Up" @click.stop="moveUp(idx)"/> - <AppBtn label="Move Down" @click.stop="moveDown(idx)"/></span>
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
import { GameT, gameTypes } from '../../services/structure';
import Game from '../Game.vue';
import AppBtn from './AppBtn.vue';

const props = defineProps<{
    games: GameT[],
}>();

const deleteGame = (idx: number) => {
  props.games.splice(idx, 1);
}

const moveDown = (idx: number) => {
  if (props.games.length <= idx + 1) {
    return ;
  }

  let tmp = props.games[idx];
  props.games[idx] = props.games[idx + 1];
  props.games[idx + 1] = tmp;
}

const moveUp = (idx: number) => {
  if (idx == 0) {
    return ;
  }

  let tmp = props.games[idx];
  props.games[idx] = props.games[idx - 1];
  props.games[idx - 1] = tmp;
}
</script>