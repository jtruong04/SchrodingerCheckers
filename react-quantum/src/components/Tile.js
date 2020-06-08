import React from 'react';
import Button from 'react-bootstrap/Button'

import './Tile.css'

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
    return (
      <Button
        bsPrefix={"tile " +
          (this.props.tile.state ? "blackTile" : "whiteTile") + " " +
          (this.props.tile.onClickCallback ? 'selectableTile' : '')}
        onClick={this.props.tile.onClickCallback ? this.handleClick : null}
      ></Button>
    );
  }

}

export default Tile;
