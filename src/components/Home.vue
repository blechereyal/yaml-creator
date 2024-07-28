<template>
  <div class="flex flex-row gap-2">
    <AppBtn @click="dumpAll" label="Save(file download and browser)"/>
    <AppBtn @click="uploadTrigger" label="Upload .yaml" /> 
    <AppBtn @click="addTournament" label="Add Tournament" />
    <input ref="fileUpload" class="hidden" 
           type="file" @change="upload">
  </div>
  <Tournaments :tournaments="tournaments" />
</template>

<script setup lang="ts">
import { TournamentT } from '../services/structure';
import { dumpTournaments, loadTournaments } from '../services/yamler';
import AppBtn from './core/AppBtn.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Tournaments from './Tournaments.vue';



const fileUpload = ref<HTMLInputElement | null>(null);
const uploadTrigger = () => {
    if (fileUpload.value) {
      fileUpload.value.click();
    }
}

const tournaments = ref<TournamentT[]>(JSON.parse(localStorage.getItem('tournaments') || '[]') || []);
const addTournament = () => {
  tournaments.value.push({
    name: `New Tournament ${tournaments.value.length + 1}`,
    games: [],
    prizes: [0,0,0,0,0,0,0,0,0,0],
    ticket_winners: 0,
    per_game_ticket_winners: 0
  })
}
let interval : number;
onMounted(() => {
  interval = setInterval(() => {
    console.info("Saving data...");
    localStorage.setItem('tournaments', JSON.stringify(tournaments.value));
  }, 2000)
})

onBeforeUnmount(() => {
  console.info("Clearing autosave loop");
  localStorage.setItem('tournaments', JSON.stringify(tournaments.value));
  clearInterval(interval);
})

const upload = (ev: Event) => {
  let files = (ev.target as HTMLInputElement).files;
  let reader = new FileReader();
  reader.onload = () => {
    if (reader.result !== null) {
      tournaments.value = loadTournaments(reader.result as string);
    }
    localStorage.setItem('tournaments', JSON.stringify(tournaments.value));
  };

  if (files && files[0]) {
    reader.readAsText(files[0]);
  }
};

const dumpAll = () => {
  localStorage.setItem('tournaments', JSON.stringify(tournaments.value));
  let yml = dumpTournaments(tournaments.value);

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


</script>