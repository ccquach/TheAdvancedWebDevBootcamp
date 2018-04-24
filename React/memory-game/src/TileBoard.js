import React, { Component } from 'react';
import './TileBoard.css';

const Tile = ({id, color, onTileClick}) => (
  <div 
    className="tile" 
    style={{backgroundColor: color}}
    onClick={() => {onTileClick(id)}}
  />
)

class TileBoard extends Component {
  render() {
    const {onTileClick} = this.props;
    const tiles = this.props.tiles.map(tile => (
      <Tile 
        key={tile.id} 
        id={tile.id}
        color={tile.tileState === 1 || tile.tileState === 2 ? tile.color : "slategray"} 
        onTileClick={onTileClick}
      />
    ));

    return(
      <div className="tile-board">
        {tiles}
      </div>
    );
  }
}

export default TileBoard;