<template>
  <div>
    <Input v-model="inputValue" />
    <Button @click="logAndSay">Click me</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from './components/ui/input'
import { ref } from 'vue'
import { Player } from 'morse-player'

const inputValue = ref('')

const synth = window.speechSynthesis

const groupSize = 1

function logAndSay() {
  console.log(inputValue)
  sayLetter(' ')
  playGroups(inputValue.value)
}

async function sayLetter(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!synth) {
      console.warn('Speech synthesis not available.');
      resolve();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text.toLowerCase()) //Speech synthesis library will say "uppercase" before the letter unless lowercase

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
