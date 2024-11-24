import { defineStore } from 'pinia'
import { TournamentT } from './services/structure';
import { computed, Ref, ref } from 'vue';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useTournamentsStore = defineStore('tournaments', () => {
    const tournaments : Ref<TournamentT[]> = ref([]);

    const persistTournaments = (newTournaments: TournamentT[]) => {
        tournaments.value = newTournaments;
    }

    const addTournament = () => {
    tournaments.value.push({
        name: `New Tournament ${tournaments.value.length + 1}`,
        games: [],
        prizes: [0,0,0,0,0,0,0,0,0,0],
        ticket_winners: '1-10',
        per_game_ticket_winners: '1-15',
        invite_winners: '1-10',
        per_game_invite_winners: '1-15',
        sprint: 1
    })
    }

    const orderedTournaments = computed(() => tournaments.value.sort((a,b) => a.name.localeCompare(b.name)));
    const tournamentsAsOptions = computed(() => tournaments.value.map((tournament, i) => {
        return { id: i, name: tournament.name }
    }));
    const moveGameToTournament = (from: number, to: number, gameIdx: number) => {
        const game = JSON.parse(JSON.stringify(tournaments.value[from].games.splice(gameIdx, 1)))[0];
        tournaments.value[to].games.push(game);
    }
    return { tournaments, orderedTournaments, tournamentsAsOptions, persistTournaments, addTournament, moveGameToTournament }
})