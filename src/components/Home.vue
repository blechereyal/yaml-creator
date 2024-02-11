<template>
  <div class="flex flex-row gap-2">
    <AppBtn @click="dumpAll" label="Save(file download and browser)"/>
    <AppBtn @click="uploadTrigger" label="Upload .yaml" /> 
    <input ref="fileUpload" class="hidden" 
           type="file" @change="upload">
    <AppBtn @click="addGame" label="Add game" />
  </div>
  <GameAccordion :games="games"/>
</template>

<script setup lang="ts">
import { GameT, gameTypes } from '../services/structure';
import { dumpGames, loadGames } from '../services/yamler';
import AppBtn from './core/AppBtn.vue';
import GameAccordion from './core/GameAccordion.vue';
import { ref } from 'vue';

const fileUpload = ref(null);
const uploadTrigger = () => {
  fileUpload.value.click();
}

const games = ref<GameT[]>(JSON.parse(localStorage.getItem('games')));
const upload = (ev) => {
  let files = ev.target.files;
  let reader = new FileReader();
  reader.onload = () => {
    games.value = loadGames(reader.result);
    localStorage.setItem('games', JSON.stringify(games.value));
  };

  if(files[0]) {
    reader.readAsText(files[0]);
  }
};
const dumpAll = () => {
  localStorage.setItem('games', JSON.stringify(games.value));
  let yml = dumpGames(games.value);

  // Create element with <a> tag
  const link = document.createElement("a");

  // Create a blog object with the file content which you want to add to the file
  const file = new Blob([yml], { type: 'text/plain' });

  // Add file content in the object URL
  link.href = URL.createObjectURL(file);

  // Add file name
  link.download = "seed_games.yml";

  // Add click event to <a> tag to save file.
  link.click();
  URL.revokeObjectURL(link.href);
}

const addGame = () => {
  games.value.push({
    name: '',
    description: '',
    playVariant: null,
    image: null,
    gameRounds: [],
    gameType: gameTypes[0]
  })
}

</script>