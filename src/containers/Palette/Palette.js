import React from 'react'
import { connect } from 'react-redux'
import './Palette.css'

export const Palette = ({ palette_name, color_1, color_2, color_3, color_4, color_5}) => {
  return (
    <section className='palette'>
      <h6 className='palette-name'>{palette_name}</h6>
      <div className='color1'>{color_1}</div>
      <div className='color2'>{color_2}</div>
      <div className='color3'>{color_3}</div>
      <div className='color4'>{color_4}</div>
      <div className='color5'>{color_5}</div>
    </section>
  )
}

export default Palette;