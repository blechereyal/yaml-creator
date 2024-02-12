<template>
    <div class="p-4 bg-red-100 rounded-xl flex flex-col gap-1">
        <h1 class="font-bold mb-2">GameRound #{{ props.id }} - <AppBtn label="Duplicate round" @click="$emit('duplicateRound')"/> - <AppBtn label="Move Up" @click="$emit('moveUp')"/> - <AppBtn label="Move Down" @click="$emit('moveDown')"/></h1> 
        <div class="flex gap-1 w-full">
            <Select v-model="gameRound.visualVariant" :options="props.visualVariants" label="Visual Variant"></Select>
            <Input class="max-w-24" v-model="gameRound.playSeconds" label="Play seconds" />
            <Input class="flex-grow" v-model="gameRound.params.question" label="Question" />
        </div>
        <div class="flex gap-1">
            <Input class="" v-model="gameRound.params.object" label="Object" />
            
            <Input class="" v-model="gameRound.image" label="Image" />
            
            <Input class="" v-model="gameRound.retriableCount" label="Retries" />
        </div>
        <div class="mt-4" v-if="usePairs">
            <div class="flex gap-2">
                <p>Pairs</p>
                <AppBtn @click="addPair" label="Add Pair"/>
            </div>
            <div class="flex flex-row gap-4 w-full" v-for="(pair, idx) in gameRound.params.pairs" v-if="gameRound.params.pairs">
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
            <div class="flex flex-row gap-4" v-for="(choice, idx) in gameRound.params.choices" v-if="gameRound.params.choices">
                <div class="flex items-center w-full gap-1">
                    <Input v-model="gameRound.params.choices[idx]"/> 
                    <XCircleIcon @click="removeChoice(idx)" class="h-6 w-6" />
                    <CheckCircleIcon @click="selectChoice(idx)" class="h-6 w-6" 
                                    :class="{'text-green-600': idx.toString() === gameRound.params.answer?.toString()}" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { computed, defineModel } from 'vue';
import { GameRoundT, gameTypeT, visualVariantT } from '../services/structure';
import Select from './Select.vue';
import Input from './Input.vue';
import AppBtn from './core/AppBtn.vue';
import { XCircleIcon, CheckCircleIcon } from "@heroicons/vue/24/outline"; 
defineEmits(['duplicateRound', 'moveUp', 'moveDown'])

const gameRound = defineModel<GameRoundT>();

const props = defineProps<{
    visualVariants: visualVariantT[],
    id: number,
    gameType: gameTypeT,
}>();

const usePairs = computed(() => props.gameType.name === 'connect_the_topics');

const addPair = () => {
    console.log('adding pair');
    if (!gameRound.value.params.pairs) {
        gameRound.value.params.pairs = [];
    }
    gameRound.value.params.pairs.push(['', '']);
}

const removePair = (idx: number) => {
    gameRound.value.params.pairs?.splice(idx, 1)
}

const addChoice = () => {
    console.log('adding pair');
    if (!gameRound.value.params.choices) {
        gameRound.value.params.choices = [];
    }
    gameRound.value.params.choices.push('');
}

const removeChoice = (idx: number) => {
    gameRound.value.params.choices?.splice(idx, 1)
}

const selectChoice = (idx: number) => {
    gameRound.value.params.answer = idx;
}
</script>