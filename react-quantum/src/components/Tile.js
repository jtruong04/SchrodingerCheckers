import React from 'react';
import Button from 'react-bootstrap/Button'

import './Tile.css'
// import '../views/Game.css'
// import './'
// List of props available:
// this.props.tile : tile data

class Tile extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    return this.props.tile.onClickCallback(this.props.tile);
  }

  render() {
    if (this.props.tile.onClickCallback) {
      return (
        <Button
          bsPrefix={
            "tile selectableComponent " +
            (this.props.tile.state ? "blackTile" : "whiteTile")
          }
          onClick={this.handleClick}
          style={{
            width: 100 / this.props.size - 2 + "%",
            padding: `0 0 calc(${100 / this.props.size - 2}% - 4px) 0`,
          }}
        ></Button>
      );
    } else {
      return (
        <div
          className={
            "tile " +
            (this.props.tile.state ? "blackTile" : "whiteTile")
          }
          style={{
            width: 100 / this.props.size - 2 + "%",
            padding: `0 0 calc(${100 / this.props.size - 2}% - 4px) 0`,
          }}
        ></div>
      );
    }
  }

}

export default Tile;
