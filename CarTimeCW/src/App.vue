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

const groupSizze = 5

function logAndSay() {
  console.log(inputValue)
  playGroups(inputValue.value)
}

function sayLetter(text: string) {
  return new Promise(resolve => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = resolve;
    speechSynthesis.speak(utterance);
  });
}


function playGroups(groups: string) {
  const letters = Array.from(groups);
  const synth = window.speechSynthesis; // Assuming synth is defined elsewhere

  const player = new Player({
    wpm: 25,
    eff: 5,
    freq: 800
  });

  async function playCharacter(player: Player, char: string): Promise<void> {
    return new Promise((resolve) => {
      const handler = (eventValue: any) => {
        console.log(`'char:end' event received for: ${eventValue}, expected: ${char}`);
        if (eventValue === 'char:end') {
          //const utterThis = new SpeechSynthesisUtterance(char);
          //synth.speak(utterThis)
          sayLetter(char).then(() => {
            console.log('Finished playing character:', eventValue);

            resolve();
          })
          // Unsubscribe the listener
          player.subscribers = player.subscribers.filter(
            (sub) => !(sub.event === 'char:end' && sub.cb === handler)
          );
        }
      };
      console.log(`Subscribing to 'char:end' for: ${char}`);
      player.on('char:end', handler);
      console.log('Playing:', char);
      player.play(char);
    });
  }

  async function playAllCharacters() {
    console.log("playGroupsAsync " + groups);
    for (const letter of letters) {
      console.log(`Awaiting playCharacter for: ${letter}`);
      await playCharacter(player, letter);
      console.log(`Finished awaiting playCharacter for: ${letter}`);
    }
    console.log('Finished playing all characters.');
  }

  playAllCharacters();
}



</script>
