import React, { Component } from 'react';
import './App.css';
import { getProjects, getPalettes } from '../../apiCalls';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      tempColors: [
        {name: 'color_1', color: '#000000', isLocked: true },
        {name: 'color_2', color: '#000000', isLocked: false },
        {name: 'color_3', color: '#000000', isLocked: false },
        {name: 'color_4', color: '#000000', isLocked: false },
        {name: 'color_5', color: '#000000', isLocked: false },
      ],
    };
  }
 
  componentDidMount = async () => {
    const projects = await getProjects();
    const palettes = await getPalettes();
    this.props.setProjects(projects);
    this.props.setPalettes(palettes);
    this.setState({ isLoading: false });
  }

  generatePalette = () => {
    this.state.tempColors.forEach((color, i) => {
      if(!color.isLocked) {
        const randomColor = this.generateColor();
        //this is so we don't modify state directly but use setState
        let updatedPalette = this.state.tempColors.map((color) => color);
        updatedPalette[i].color = randomColor;
        this.setState({ tempColors: updatedPalette });
      }
    });
  }

  generateColor = () => {
    const options = ['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'];
    let newColor = [];
    for(let i = 0; i < 6; i++) { 
      const randomIndex = Math.floor(Math.random() * options.length);
      newColor.push(options[randomIndex]);
    }
    newColor.unshift('#');
    return newColor.join('');
  }

  render() {
    return (
      <main>
        {this.state.isLoading && <h1>Loading...</h1>}
        <h1>Hello</h1>
        <button onClick={this.generatePalette}>Generate Palette</button>
      </main>
    );
  }
}

export const mapState = (state) => ({
  projects: state.projects,
  palettes: state.palettes,
});

export const mapDispatch = (dispatch) => ({
  setProjects: (projects) => dispatch(actions.addProjects(projects)),
  setPalettes: (palettes) => dispatch(actions.addPalettes(palettes)),
});

export default connect(mapState, mapDispatch)(App);
