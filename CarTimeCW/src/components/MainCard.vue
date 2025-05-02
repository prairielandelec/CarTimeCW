<template>
    <Card>
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
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
                <Button @click="$emit('startLetterSet', selectedIndex)">Click me</Button>
            </div>
        </CardContent>
        <CardFooter>
            Card Footer
        </CardFooter>
    </Card>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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

import { type LetterSet, RandomLetterSet, LWCOSet, speakableChar } from '../lib/LetterSets'
import { ref } from 'vue'


const selectedIndex = ref<number>(0)
const emit = defineEmits<{
  (e: 'startLetterSet', selectedIndex: number): void;
}>()

const props = defineProps<{selectedLetterSet: LetterSet}>()

</script>