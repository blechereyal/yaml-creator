<template>
  <div class="mt-2 flex flex-col gap-2">
    <Input v-model="game!.name" :label="'Name'" />
    <Input v-model="game!.description" :label="'Description'" />
    <Input v-model="game!.image" :label="'Image'" />
    <Select v-model="/* @ts-ignore */ game!.playVariant" :options="playVariants" :label="'Play Variant'" />
    <AppBtn label="Add new game round" @click="newRound" />
    <GameRound class="transition ease-in duration-100" v-for="(gameRound, idx) in game?.gameRounds" :key="idx"
      v-model="game.gameRounds![idx]" :id="idx"
      v-if="game" @duplicate-round="duplicateRound(gameRound)" @moveUp="moveUp(idx)" @moveDown="moveDown(idx)" @delete-round="deleteRound(idx)">
    </GameRound>
  </div>
</template>

<script setup lang="ts">
import Select from './Select.vue';
import Input from './Input.vue';
import GameRound from './GameRound.vue';
import AppBtn from './core/AppBtn.vue';
import { defineModel } from 'vue';
import { playVariants, GameT, newParams, GameRoundT } from '../services/structure';

const game = defineModel<GameT>();

const newRound = () => {
  game.value!.gameRounds!.push({
    gameType: null,
    visualVariant: null,
    playSeconds: 0,
    params: newParams(),
    retriableCount: 0
  });
};

const duplicateRound = (gameRound: GameRoundT) => {
  game.value?.gameRounds!.push(JSON.parse(JSON.stringify(gameRound)));
}


const moveDown = (idx: number) => {
  if (game.value!.gameRounds!.length <= idx + 1) {
    return;
  }

  let tmp = JSON.parse(JSON.stringify(game.value!.gameRounds![idx]));
  game.value!.gameRounds![idx] = game.value!.gameRounds![idx + 1];
  game.value!.gameRounds![idx + 1] = tmp;
}

const moveUp = (idx: number) => {
  if (idx == 0) {
    return;
  }

  let tmp = JSON.parse(JSON.stringify(game.value!.gameRounds![idx]));
  game.value!.gameRounds![idx] = game.value!.gameRounds![idx - 1];
  game.value!.gameRounds![idx - 1] = tmp;
}

const deleteRound = (idx: number) => {
  game.value!.gameRounds!.splice(idx, 1);
}

</script>