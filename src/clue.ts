export class Clue {
  id: number;
  clue: string;
  answer: string;
}

export class Category {
  id: number;
  name: string;
  isFinal: boolean;
  clues: Clue[];
}
