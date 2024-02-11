<template>
    <div class="mt-4">
      <div class="divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Games</h2>
        <dl class="mt-4 space-y-4 divide-y divide-gray-900/10">
          <Disclosure as="div" v-for="(game, idx) in props.games" class="pt-6" v-slot="{ open }">
            <dt>
              <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                <span class="text-base font-semibold leading-7">Game #{{ idx }} - {{ game.name }}</span>
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
import { GameT } from '../../services/structure';
import Game from '../Game.vue';

const props = defineProps<{
    games: GameT[],
}>();

</script>