


export type LetterSet =
    | string[][]
    | [string[], string[]]
    | [string[], string[], string[]];


export const LWCOSet: LetterSet = [
    ["k", "m"],
    ["u"],
    ["r"],
    ["e"],
    ["s"],
    ["n"],
    ["a"],
    ["p"],
    ["t"],
    ["l"],
    ["w"],
    ["i"],
    ["."],
    ["j"],
    ["z"],
    ["="],
    ["f"],
    ["o"],
    ["y"],
    [","],
    ["v"],
    ["g"],
    ["5"],
    ["/"],
    ["q"],
    ["9"],
    ["2"],
    ["h"],
    ["3"],
    ["8"],
    ["b"],
    ["?"],
    ["4"],
    ["7"],
    ["c"],
    ["1"],
    ["d"],
    ["6"],
    ["0"],
    ["x"]
]

const specialCharMap = {
    ",": "comma",
    ".": "period",
    "?": "question mark",
    "/": "slash",
    "=": "equals"
}

export class RandomLetterSet {
    private sourceArray: string[];
    private numberOfRandomStrings: number;

    constructor(initialArray: LetterSet, count: number) {
        var tempArray: string[] = []
        for (var days of initialArray) {
            for (var letter of days) {
                tempArray.push(letter)
            }
        }
        if (count < 0) {
            throw new Error("Number of Random Letters must be not negative");
        }
        this.sourceArray = [...tempArray];
        this.numberOfRandomStrings = count;
    }

    generateRandomStrings(): string[] {
        const randomStrings: string[] = [];
        const sourceLength = this.sourceArray.length;

        for (let i = 0; i < this.numberOfRandomStrings; i++) {
            const randomIndex = Math.floor(Math.random() * sourceLength);
            randomStrings.push(this.sourceArray[randomIndex]);
        }

        return randomStrings;
    }
}

export function speakableChar(input: string): string{
    if (input in specialCharMap){
        return specialCharMap[input as keyof typeof specialCharMap]
    }
    return input.toLowerCase()
}