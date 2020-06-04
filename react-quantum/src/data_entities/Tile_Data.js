class Tile_Data {
    constructor(){
        this.tileID = Tile_Data.count;
        Tile_Data.count++;

        this.state = (Math.floor(Math.random() * 2) === 0); // Initialize to random state. TODO: Set to false when interactivity is implemented
        this.isButton = false;
        
        this.onClickCallback = null;
        // this.onClickCallback = this.onClickCallback.bind(this);
    }
}

export default Tile_Data;