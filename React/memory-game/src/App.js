import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import TileBoard from './TileBoard';

const NUM_TILES = 16;

const TileState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

class App extends Component {
  static defaultProps = {
    allColors: ["Aqua", "BlueViolet", "Coral", "Crimson", "Aquamarine", "LawnGreen", "Navy", "Gold"]
  }

  constructor(props) {
    super(props);

    let tiles = [];
    for (let i = 0; i < NUM_TILES; i++) {
      tiles.push({
        id: i,
        color: props.allColors[i] ? props.allColors[i] : props.allColors[i - 8],
        tileState: TileState.HIDING
      });
    }
    this.state = {
      tiles: this.shuffle(tiles),
      numShowing: 0,
      tilesShowing: []
    };

    this.handleSelected = this.handleSelected.bind(this);
  }

  // Fisher-Yates shuffle algorithm
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  handleSelected(id) {
    const tiles = this.state.tiles.map(tile => {
      if (tile.id === id) {
        return {
          ...tile,
          tileState: TileState.SHOWING
        }
      }
      return tile;
    });
    this.setState({
      tiles
    });
  }

  render() {
    const {tiles} = this.state;
    return (
      <div className="App">
        <Navbar />
        <TileBoard 
          tiles={tiles}
          onTileClick={this.handleSelected}
        />
      </div>
    );
  }
}

export default App;