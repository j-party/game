import { BoardScreen } from './board.po';

export class ClueDetailScreen {
  load() {
    let boardScreen = new BoardScreen();
    boardScreen.load();
    boardScreen.chooseFirst();
  }
}
