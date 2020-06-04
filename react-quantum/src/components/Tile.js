import React from 'react';
import Button from 'react-bootstrap/Button'

import './Tile.css'

/**
 * 
 * Props to include:
 *    tile: Tile_Data
 * 
 */

class Tile extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    return this.props.tile.onClickCallback(this.props.tile);
  }

  render() {
    if(this.props.tile.onClickCallback != null) {
      return (
        <Button
            key={this.props.tile.tileID}
            bsPrefix={"tile " +
              (this.props.tile.state ? "blackTile" : "whiteTile") + " " +
              (this.props.tile.isButton ? 'selectableTile' : '')}
            onClick={this.handleClick}
        ></Button>
      );
    } else {
      return (
        <div
          className={
            "tile " +
            (this.props.tile.state ? "blackTile" : "whiteTile") + " " +
            (this.props.tile.isButton ? 'selectableTile' : '')
          }
        ></div>
      );
    }
  }

}

export default Tile;
