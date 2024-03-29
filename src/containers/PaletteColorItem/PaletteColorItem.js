import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTempPalette } from '../../actions/index';
import './PaletteColorItem.scss';

const lockedImg = require('../../images/lock.svg');
const unlockedImg = require('../../images/unlocked-padlock.svg');

export class PaletteColorItem extends Component {
  handleToggleColorLock = () => {
    const { color, isLocked } = this.props;
    const updatedPalette = this.props.tempPalette.map((color) => color);
    const colorToUpdate = updatedPalette.find((palItem) => {
      if(palItem.color === color && palItem.isLocked === isLocked) {
        return true;
      } else { return false; }
    });
    colorToUpdate.isLocked = !colorToUpdate.isLocked;
    this.props.setTempPalette(updatedPalette);
  };

  render() {
    const { color, isLocked } = this.props;
    const lockImg = isLocked ? lockedImg : unlockedImg;
    const style = { backgroundColor: color };
    return (
      <section style={style} className="color-container" onClick={this.handleToggleColorLock}>
        <div className="color-container-contents">
          <p className="color-code">{color}</p>
          <img src={lockImg} className="color-lock-img" alt="lock or unlock color" />
        </div>
      </section>
    );
  }
}

export const mapState = (state) => ({
  tempPalette: state.tempPalette,
});

export const mapDispatch = (dispatch) => ({
  setTempPalette: (palette) => dispatch(setTempPalette(palette)),
});

export default connect(mapState, mapDispatch)(PaletteColorItem);

PaletteColorItem.propTypes = {
  tempPalette: PropTypes.array.isRequired,
  setTempPalette: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
};
