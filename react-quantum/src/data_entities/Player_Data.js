import Board_Data from './Board_Data.js'
class Player_Data {
  constructor({numBoards = 3}) {
    this.numBoards = numBoards;
    this.targetBoards = [];
    for(let i = 0; i < this.numBoards; i++) {
      this.targetBoards.push(new Board_Data( {randomizeTiles: true}));
    }
  }
}

export default Player_Data;
