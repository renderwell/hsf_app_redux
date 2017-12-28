import React, { Component } from 'react'

export default class SelectField extends Component {
  render () {
    const options = this.props.options.map((option) => {
      return <option value={option} key={option}>{option}</option>
    })

    const visible = this.props.visible;

    const selectStyle = {
        width: '200px',
        marginRight: '10px',
        display: visible ? 'inline-block' : 'none'
    };

    return (
      <select id={this.props.selectId} 
        className="select-field" 
        style={selectStyle}
        onChange={this.props.handleChange}>
        <option value="">All</option>
        {options}
      </select>
    )
  }
}

