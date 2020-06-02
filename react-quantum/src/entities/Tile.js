class Tile {
    constructor(){ 
        this.tileID = Tile.count;
        this.state = (Math.floor(Math.random() * 2) === 0); // Initialize to random state. TODO: Set to false when interactivity is implemented
        // this.isHovered = false;
        // this.isSelectable = false;
        Tile.count++;
    }

}

export default Tile;