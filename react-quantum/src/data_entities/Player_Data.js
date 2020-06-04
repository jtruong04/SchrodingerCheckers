import Board_Data from './Board_Data.js'
class Player_Data {
  constructor() {
    this.numBoards = 3;
    this.targetBoards = [];
    for(let i = 0; i < this.numBoards; i++) {
      this.targetBoards.push(new Board_Data());
    }
  }
}

export default Player_Data;
