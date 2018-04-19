import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [
        {
          name: 'Tim',
          hobbies: ['sailing', 'react']
        }, {
          name: 'Matt',
          hobbies: ['math', 'd3']
        }, {
          name: 'Colt',
          hobbies: ['css', 'hiking']
        }, {
          name: 'Elie',
          hobbies: ['music', 'es2015']
        }
      ]
    };

    setTimeout(() => {
      const randInstIdx = Math.floor(
        Math.random() * 
        this.state.instructors.length
      );
      const randHobbyIdx = Math.floor(
        Math.random() * 
        this.state.instructors[randInstIdx].length
      );
      // ** NEVER use splice in this case to modify state b/c instructors copy is NOT deep copy! **
      // let instructors = this.state.instructors.slice();
      // const newHobbies = instructors[randInstIdx].hobbies.splice(randHobbyIdx, 1);
      // instructors[randInstIdx].hobbies = newHobbies;
      // ******************************************************************************************

      // METHOD #1
      // const instructors = this.state.instructors.slice();
      // instructors[randInstIdx] = Object.assign({}, instructors[randInstIdx]);
      // instructors[randInstIdx].hobbies = instructors[randInstIdx].hobbies.slice();
      // instructors[randInstIdx].hobbies.splice(randHobbyIdx, 1);

      // METHOD #2
      const instructors = this.state.instructors.map((inst, i) => {
        if (i === randInstIdx) {
          const hobbies = [...inst.hobbies];
          hobbies.splice(randHobbyIdx, 1);
          return {
            ...inst,
            hobbies
          }
        }
        return inst;
      });
      this.setState({ instructors });
    }, 5000);
  }
  render() {
    const instructors = this.state.instructors.map((instructor, index) => (
      <li key={index}>
        <h3>{instructor.name}</h3>
        <h4>Hobbies: {instructor.hobbies.join(", ")}</h4>
      </li>
    ));
    return (
      <div className="App">
        <ul>
          {instructors}
        </ul>
      </div>
    );
  }
}

export default App;
