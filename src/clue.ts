export class Clue {
  id: number;
  clue: string;
  answer: string;
  value: number;
  isRevealed: boolean = false;
}

export class Category {
  id: number;
  name: string;
  isFinal: boolean;
  clues: Clue[];
}
