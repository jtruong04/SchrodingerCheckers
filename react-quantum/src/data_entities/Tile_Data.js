class Tile_Data {
    constructor({tileID, randomize = false}){
        this.tileID = tileID;

        this.state = randomize ? (Math.floor(Math.random() * 2) === 0) : false;
        
        this.isButton = false;
        this.onClickCallback = null;
    }
}

export default Tile_Data;