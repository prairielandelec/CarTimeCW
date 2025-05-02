<template>
  <SidebarProvider>
    <AppSidebar @view-change="handleNewView" />
    <main
      style="display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 10px; width: 100%;">
      <SidebarTrigger style="position: absolute; top: 20px; left: 20px; z-index: 10;" />
      <div :style="{ width: isSmallScreen ? '100%' : '1000px' }">
      <MainCard v-if="currentView == PageViews.Main" :selected-letter-set="selectedLetterSet" @start-letter-set="sayLetterSet"></MainCard>
      </div>
      <slot />
    </main>
  </SidebarProvider>

</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Player } from 'morse-player'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar.vue"
import MainCard from './components/MainCard.vue'


import { type LetterSet, RandomLetterSet, LWCOSet, speakableChar } from './lib/LetterSets'

import { PageViews } from './lib/Consts'

const isSmallScreen = ref(window.innerWidth < 1000)
const inputValue = ref('')
const synth = window.speechSynthesis
const groupSize = 1
//const selectedIndex = ref<number | null>(null)
const currentView = ref<PageViews>(PageViews.Main)
const selectedLetterSet = ref<LetterSet>(LWCOSet)
selectedLetterSet.value = LWCOSet

onMounted(() => {
  const myLetterSet = new RandomLetterSet(LWCOSet.slice(0, 5), 10).generateRandomStrings()
  console.log(myLetterSet)
})

function handleNewView(view: PageViews) {
  console.log("Current View Before: " + currentView.value)
  currentView.value = view
  console.log("App got new view: " + view)
  console.log("Current View After: " + currentView.value)
}

function logAndSay() {
  console.log(inputValue)
  sayLetter(' ')//This is required for mobile browsers that appear to be very strict about destroying WebAudio context? idk this makes it work though

  console.log("Selected index: " + selectedIndex.value + " Content : " + LWCOSet[selectedIndex.value!] + " slice: " + LWCOSet.slice(0, selectedIndex.value! + 1))
  if (selectedIndex.value) {
    const myLetterSet = new RandomLetterSet(LWCOSet.slice(0, selectedIndex.value + 1), 10).generateRandomStrings()
    playGroups(myLetterSet.join(''))
  }
}

function sayLetterSet(selectedIndex:number)
{
  sayLetter(' ')//This is required for mobile browsers that appear to be very strict about destroying WebAudio context? idk this makes it work though
  console.log("Got sayLetterSet index: " + selectedIndex)
  if (selectedIndex &&  selectedLetterSet.value) {
    const myLetterSet = new RandomLetterSet(selectedLetterSet.value.slice(0, selectedIndex + 1), 10).generateRandomStrings()
    playGroups(myLetterSet.join(''))
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

    utterance.onstart = () => {
      console.log(`Speech started for: ${text}`)
    };

    utterance.onend = () => {
      console.log(`Speech ended for: ${text}`)
      resolve();
    };

    utterance.onerror = (event) => {
      console.error(`Speech synthesis error for: ${text}`, event)
      resolve() // Ensure the Promise resolves even on error
    };

    console.log(`Speaking: ${text}`)
    synth.speak(utterance)
  });
}


function playGroups(groups: string) {
  const letters = Array.from(groups)

  const player = new Player({
    wpm: 25,
    eff: 5,
    freq: 800
  })

  async function playCharacter(player: Player, char: string): Promise<void> {
    return new Promise((resolve) => {
      const handler = (eventValue: any) => {
        console.log(`'char:end' event received for: ${eventValue}, expected: ${char}`)
        if (eventValue === 'char:end') {

          console.log('Finished playing character:', eventValue)
          // Unsubscribe the listener
          player.subscribers = player.subscribers.filter(
            (sub) => !(sub.event === 'char:end' && sub.cb === handler)
          )

          resolve()
        }
      }
      console.log(`Subscribing to 'char:end' for: ${char}`)
      player.on('char:end', handler)
      console.log('Playing:', char)
      player.play(char)
    })
  }

  async function playAllCharacters() {
    console.log("playGroupsAsync " + groups)
    const groupArr = [];
    for (let i = 0; i < letters.length; i += groupSize) {
      groupArr.push(letters.slice(i, i + groupSize))
    }
    for (let group of groupArr) {
      for (const letter of group) {
        console.log(`Awaiting playCharacter for: ${letter}`)
        await playCharacter(player, letter)
        console.log(`Finished awaiting playCharacter for: ${letter}`)
        console.log(`Finished say playCharacter for: ${letter}`)
      }
      if (groupSize > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      for (const letter of group) {
        await sayLetter(letter)
        await new Promise(resolve => setTimeout(resolve, 100))
        console.log(`Finished say playCharacter for: ${letter}`)
      }
      if (groupSize > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))

      }

    }

    console.log('Finished playing all characters.')
  }

  playAllCharacters()
}



</script>
