import React from 'react';
import './Tile.css'

// List of props available:
// props.tile : tile data

function Tile(props) {
  const handleClick = (e) => {
    return props.tile.onClickCallback(props.tile);
  }

  return (
      <div
        className={
          "tile " +
          (props.tile.onClickCallback ? "selectableComponent " : " ") +
          (props.tile.state ? "blackTile" : "whiteTile")
        }
        onClick={props.tile.onClickCallback ? handleClick : null}
        style={{
          width: 100 / props.size - 2 + "%",
          padding: `0 0 calc(${100 / props.size - 2}% - 4px) 0`,
        }}
      ></div>
    );
}

export default Tile;
