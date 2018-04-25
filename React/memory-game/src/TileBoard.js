import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TileBoard.css';

const Tile = ({id, color, onTileClick}) => (
  <div 
    className="tile" 
    style={{backgroundColor: color}}
    onClick={() => {onTileClick(id)}}
  />
)

Tile.propTypes = {
  id: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onTileClick: PropTypes.func.isRequired
}

class TileBoard extends Component {
  render() {
    const {onTileClick} = this.props;
    const tiles = this.props.tiles.map(tile => (
      <Tile 
        key={tile.id} 
        id={tile.id}
        color={tile.tileState !== 0 ? tile.color : "slategray"} 
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

TileBoard.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTileClick: PropTypes.func.isRequired
}

export default TileBoard;