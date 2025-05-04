<template>
    <Card>
        <CardHeader>
            <CardTitle>Play Letters With Narration</CardTitle>
            <CardDescription>Play a set of random numbers chosen from your selected letter set up to the letter covered in the lesson selected in the dropdown</CardDescription>
        </CardHeader>
        <CardContent>
            <div class="grid items-center w-full gap-4 justify-center">
                <Label for="letterset" style="font-weight: bolder;">Max Letter to Play from Letter Set</Label>
                <Select v-model="selectedIndex">
                    <SelectTrigger class="w-[180px]">
                        <SelectValue :placeholder="props.selectedLetterSet[0].toString()" :value="selectedIndex" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="(item, index) in props.selectedLetterSet" :key="index" :value="index">
                            {{ item.toString() }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Label for="letters" style="font-weight: bolder;">Number of Letters to Play</Label>

                <NumberField v-model="numOfLetters" id="age" :default-value="18" :min="0" style="width: 60%;">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <Button @click="$emit('startLetterSet', {selectedIndex, numOfLetters})">{{ props.isPlaying ? "Stop" : "Play" }}</Button>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { Label } from '@/components/ui/label'
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from '@/components/ui/number-field'

import { type LetterSet, RandomLetterSet, LWCOSet, speakableChar } from '../lib/LetterSets'
import { ref } from 'vue'

const numOfLetters = ref<number>(30)
const selectedIndex = ref<number>(0)
const emit = defineEmits<{
    (e: 'startLetterSet', payload: {selectedIndex: number, numOfLetters: number}): void;
}>()

const props = defineProps<{ selectedLetterSet: LetterSet, isPlaying:boolean }>()


</script>