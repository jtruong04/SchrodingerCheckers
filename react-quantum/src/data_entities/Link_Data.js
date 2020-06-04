class Link_Data {
  constructor(fromRow = 0, fromCol = 0, toRow = 0, toCol = 1, isTwoWay = false) {
    this.linkID = Link_Data.count;
    Link_Data.count++;

    this.state = true;
    this.from = [fromRow,fromCol];
    this.to = [toRow,toCol];

    this.isButton = false;
    this.isTwoWay = isTwoWay;

    this.onClickCallback = null;
    // this.onClickCallback = this.onClickCallback.bind(this);
  }
}

export default Link_Data;
