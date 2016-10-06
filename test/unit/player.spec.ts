import { Player } from '../../src/player';

describe('Player', () => {

  let player: Player;
  let name = 'Kevin';

  beforeEach(() => {
    player = new Player(name);
  });

  it('should set the player\'s name from the constructor argument', () => {
    expect(player.name).toBe(name);
  });

  it('should start the player with no money', () => {
    expect(player.money).toBe(0);
  });

});
