<template>
    <Card>
        <CardHeader>
            <CardTitle>User Settings</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="grid items-center w-full gap-4 justify-center">
                <Label for="letterset" style="font-weight: bolder;">Letter Set To Use</Label>
                <Select>
                    <SelectTrigger class="w-[180px]">
                        <SelectValue :value="userSettings!.letterSet" :placeholder="availableLetterSets.LWCO" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="item in Object.values(availableLetterSets)" :key="item" :value="item">
                            {{ item }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Label for="letters" style="font-weight: bolder;">Character Speed (WPM)</Label>
                <NumberField v-model="userSettings!.wpm" id="wpm" :min="1" :max="60" style="width: 60%;">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <Label for="letters" style="font-weight: bolder;">Effective WPM</Label>
                <NumberField v-model="userSettings!.effectiveWpm" id="ewpm" :min="1" :max="60" style="width: 60%;">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <Label for="letters" style="font-weight: bolder;">Tone Frequency</Label>
                <NumberField v-model="userSettings!.toneFreq" id="ewpm" :min="500" :max="800" style="width: 60%;">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
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

import { availableLetterSets } from '../lib/LetterSets'
import { type UserSettings } from '@/lib/Consts'

const userSettings = defineModel<UserSettings>('userSettings')


</script>