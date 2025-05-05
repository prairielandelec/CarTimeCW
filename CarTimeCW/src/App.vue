<template>
  <SidebarProvider>
    <AppSidebar @view-change="handleNewView" />
    <main
      style="display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 10px; width: 100%;">
      <SidebarTrigger style="position: absolute; top: 20px; left: 20px; z-index: 10;" />
      <div :style="{ width: isSmallScreen ? '100%' : '500px' }">
        <MainCard v-if="currentView == PageViews.Main" :is-playing="isPlaying"
          :selected-letter-set="getSelectedLetterset(userSettings.letterSet)" @start-letter-set="sayLetterSet">
        </MainCard>
        <Settings v-model:user-settings="userSettings" v-if="currentView == PageViews.Settings"></Settings>
        <About v-if="currentView == PageViews.About"></About>
      </div>
      <slot />
    </main>
  </SidebarProvider>

</template>

<script setup lang="ts">

import { ref } from 'vue'
import { Player } from 'morse-player'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar.vue"
import MainCard from './components/MainCard.vue'
import Settings from './components/Settings.vue'
import About from './components/About.vue'


import { type LetterSet, RandomLetterSet, LWCOSet, speakableChar, availableLetterSets, getSelectedLetterset } from './lib/LetterSets'

import { PageViews, type UserSettings } from './lib/Consts'

const isSmallScreen = ref(window.innerWidth < 1000)
const synth = window.speechSynthesis
const groupSize = 1
const stopPlaying = ref<boolean>(false)
//const selectedIndex = ref<number | null>(null)
const isPlaying = ref<boolean>(false)
const currentView = ref<PageViews>(PageViews.Main)
const selectedLetterSet = ref<LetterSet>(LWCOSet)
selectedLetterSet.value = LWCOSet

const userSettings = ref<UserSettings>({ wpm: 28, effectiveWpm: 5, toneFreq: 600, letterSet: availableLetterSets.LWCO })

function handleNewView(view: PageViews) {
  currentView.value = view
}

function sayLetterSet(payload: { selectedIndex: number, numOfLetters: number }) {
  sayLetter(' ')//This is required for mobile browsers that appear to be very strict about destroying WebAudio context? idk this makes it work though
  if (isPlaying.value) {
    stopPlaying.value = true
  } else {
    if (payload.selectedIndex && selectedLetterSet.value) {
      const myLetterSet = new RandomLetterSet(selectedLetterSet.value.slice(0, payload.selectedIndex + 1), payload.numOfLetters).generateRandomStrings()
      playGroups(myLetterSet.join(''))
    }
  }

}

async function sayLetter(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!synth) {
      console.warn('Speech synthesis not available.');
      resolve();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(speakableChar(text)) //Speech synthesis library will say "uppercase" before the letter unless lowercase

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (event) => {
      console.error(`Speech synthesis error for: ${text}`, event)
      resolve() // Ensure the Promise resolves even on error
    };

    synth.speak(utterance)
  });
}


async function playGroups(groups: string) {
  //there is an outstanding bug for the morse code module where the first character played does not take the setOptions
  //we add an e here to the front of the string and then set a bool to not use speech synth on the first char
  //There is an open PR to fix this in the morse library but it seems to have been abandoned
  //If it is ever fixed we need to remove this
  groups = 'e' + groups
  var FirstLetter: Boolean = true
  const letters = Array.from(groups)

  const player = new Player({
    wpm: userSettings.value.wpm,
    eff: userSettings.value.effectiveWpm,
    freq: userSettings.value.toneFreq
  })

  async function playCharacter(player: Player, char: string): Promise<void> {
    return new Promise((resolve) => {
      const handler = (eventValue: any) => {
        if (eventValue === 'char:end') {
          // Unsubscribe the listener
          player.subscribers = player.subscribers.filter(
            (sub) => !(sub.event === 'char:end' && sub.cb === handler)
          )
          resolve()
        }
      }
      player.on('char:end', handler)
      player.setOptions({ freq: userSettings.value.toneFreq, wpm: userSettings.value.wpm, eff: userSettings.value.effectiveWpm })
      player.play(char)
    })
  }

  async function playAllCharacters() {
    isPlaying.value = true
    const groupArr = [];
    for (let i = 0; i < letters.length; i += groupSize) {
      groupArr.push(letters.slice(i, i + groupSize))
    }
    for (let group of groupArr) {
      for (const letter of group) {
        if (stopPlaying.value) {
          player.stop()
          stopPlaying.value = false
          isPlaying.value = false
          return
        }
        //console.log(`Awaiting playCharacter for: ${letter}`)
        await playCharacter(player, letter)
        //console.log(`Finished awaiting playCharacter for: ${letter}`)
        //console.log(`Finished say playCharacter for: ${letter}`)
      }
      if (groupSize > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      for (const letter of group) {
        if (!FirstLetter) {
          await sayLetter(letter)
        }
        FirstLetter = false
        await new Promise(resolve => setTimeout(resolve, 100))
        //console.log(`Finished say playCharacter for: ${letter}`)
      }
      if (groupSize > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))

      }

    }
    isPlaying.value = false
  }
  playAllCharacters()
}


</script>
