export enum InputType {
  Keyboard,
  Mouse,
  Touch
}

export class Input {
  constructor(
    public type: InputType,
    public sequence?: string
  ) {}
}
