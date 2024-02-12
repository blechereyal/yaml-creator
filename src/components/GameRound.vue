<template>
     <Disclosure as="div" class="p-4 bg-red-100 rounded-xl flex flex-col gap-1" v-slot="{ open }" :default-open="true">
        <dt>
            <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                <h1 class="font-bold mb-2">GameRound #{{ props.id }} - {{ gameRound?.params.question }} - <AppBtn label="Duplicate round" @click.stop="$emit('duplicateRound')"/> - <AppBtn label="Move Up" @click.stop="$emit('moveUp')"/> - <AppBtn label="Move Down" @click.stop="$emit('moveDown')"/>- <AppBtn label="Delete Round" @click.stop="$emit('deleteRound')"/></h1> 
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
            </DisclosureButton>
        </dt>
        <DisclosurePanel as="dd" class="mt-2 pr-12">
        <div class="flex gap-1 w-full">
            <Select v-model="/* @ts-ignore */gameRound!.visualVariant" :options="props.visualVariants" label="Visual Variant"></Select>
            <Input class="max-w-24" v-model="gameRound!.playSeconds" label="Play seconds" />
            <Input class="flex-grow" v-model="gameRound!.params.question" label="Question" />
        </div>
        <div class="flex gap-1">
            <Input class="" v-model="gameRound!.params.object" label="Object" />
            
            <Input class="" v-model="gameRound!.image" label="Image" />
            
            <Input class="" v-model="gameRound!.retriableCount" label="Retries" />
        </div>
        <div class="mt-4" v-if="usePairs">
            <div class="flex gap-2">
                <p>Pairs</p>
                <AppBtn @click="addPair" label="Add Pair"/>
            </div>
            <div class="flex flex-row gap-4 w-full" v-for="(pair, idx) in gameRound?.params.pairs" v-if="gameRound?.params.pairs">
                <div class="flex gap-2 w-full items-center">
                    <Input v-model="pair[0]"/>
                    <Input v-model="pair[1]"/>
                    <XCircleIcon @click="removePair(idx)" class="h-10 w-10" />
                </div>
            </div>
        </div>
        <div class="mt-4" v-if="!usePairs">
            <div class="flex gap-2">
                <p>Choices</p>
                <AppBtn @click="addChoice" label="Add Choice"/>
            </div>
            <div class="flex flex-row gap-4" v-for="(_choice, idx) in gameRound?.params.choices" v-if="gameRound?.params.choices">
                <div class="flex items-center w-full gap-1">
                    <Input v-model="gameRound.params.choices[idx]"/> 
                    <XCircleIcon @click="removeChoice(idx)" class="h-6 w-6" />
                    <CheckCircleIcon @click="selectChoice(idx)" class="h-6 w-6" 
                                    :class="{'text-green-600': idx.toString() === gameRound.params.answer?.toString()}" />
                </div>
            </div>
        </div>
        </DisclosurePanel>
    </Disclosure>
</template>
  
<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'

import { computed, defineModel } from 'vue';
import { GameRoundT, gameTypeT, visualVariantT } from '../services/structure';
import Select from './Select.vue';
import Input from './Input.vue';
import AppBtn from './core/AppBtn.vue';
import { XCircleIcon, CheckCircleIcon } from "@heroicons/vue/24/outline"; 
defineEmits(['duplicateRound', 'moveUp', 'moveDown', 'deleteRound']);

const gameRound = defineModel<GameRoundT>();

const props = defineProps<{
    visualVariants: visualVariantT[],
    id: number,
    gameType: gameTypeT,
}>();

const usePairs = computed(() => props.gameType.name === 'connect_the_topics');

const addPair = () => {
    console.log('adding pair');
    if (!gameRound.value!.params.pairs) {
        gameRound.value!.params.pairs = [];
    }
    gameRound.value!.params.pairs.push(['', '']);
}

const removePair = (idx: number) => {
    gameRound.value!.params.pairs?.splice(idx, 1)
}

const addChoice = () => {
    console.log('adding pair');
    if (!gameRound.value!.params.choices) {
        gameRound.value!.params.choices = [];
    }
    gameRound.value!.params.choices.push('');
}

const removeChoice = (idx: number) => {
    gameRound.value!.params.choices?.splice(idx, 1)
}

const selectChoice = (idx: number) => {
    gameRound.value!.params.answer = idx.toString();
}
</script>