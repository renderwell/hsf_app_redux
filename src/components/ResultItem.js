import React, { Component } from 'react'

export default class ResultItem extends Component {
  render () {
    return (
      <div className="result-item">
        <h4>{this.props.name}</h4>
        Country: {this.props.country} <br />
        Region: {this.props.region} <br />
        County: {this.props.county} <br />
        Town: {this.props.town} <br />
        Descriptive text: {this.props.children}
      </div>
    )
  }
}
