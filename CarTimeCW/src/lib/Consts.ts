import { availableLetterSets } from "./LetterSets"

export enum PageViews{
    Main,
    Settings,
    CustomSet,
    About
}

export type UserSettings = {
    wpm: number
    effectiveWpm: number
    toneFreq: number
    letterSet: availableLetterSets
}