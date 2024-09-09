<template>
  <div class="flex flex-row gap-2">
    <AppBtn @click="dumpAll" label="Save(file download and browser)"/>
    <AppBtn @click="uploadTrigger" label="Upload .yaml" /> 
    <AppBtn @click="addTournament" label="Add Tournament" />
    <input ref="fileUpload" class="hidden" 
           type="file" @change="upload">
  </div>
  <Tournaments/>
</template>

<script setup lang="ts">
import { dumpTournaments, loadTournaments } from '../services/yamler';
import AppBtn from './core/AppBtn.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Tournaments from './Tournaments.vue';
import { useTournamentsStore } from '../store';

const store = useTournamentsStore();

const fileUpload = ref<HTMLInputElement | null>(null);
const uploadTrigger = () => {
    if (fileUpload.value) {
      fileUpload.value.click();
    }
}
store.persistTournaments(JSON.parse(localStorage.getItem('tournaments') || '[]') || []);
const addTournament = () => {
  store.addTournament();
}
let interval : number;
onMounted(() => {
  interval = setInterval(() => {
    console.info("Saving data...");
    localStorage.setItem('tournaments', JSON.stringify(store.tournaments));
  }, 2000)
})

onBeforeUnmount(() => {
  console.info("Clearing autosave loop");
  localStorage.setItem('tournaments', JSON.stringify(store.tournaments));
  clearInterval(interval);
})

const upload = (ev: Event) => {
  let files = (ev.target as HTMLInputElement).files;
  let reader = new FileReader();
  reader.onload = () => {
    if (reader.result !== null) {
      store.persistTournaments(loadTournaments(reader.result as string));
    }
    localStorage.setItem('tournaments', JSON.stringify(store.tournaments));
  };

  if (files && files[0]) {
    reader.readAsText(files[0]);
  }
};

const dumpAll = () => {
  localStorage.setItem('tournaments', JSON.stringify(store.tournaments));
  let yml = dumpTournaments(store.tournaments);

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