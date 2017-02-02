import React, { Component } from 'react';

class PersonCard  extends Component {
  constructor(props){
    super(props)
    this.handleClick= this.handleClick.bind(this);
  }
  handleClick(){
    this.props.handleClick(this.props.person.id)
  }

  render(){
    const { person } = this.props
    return(
      <button className="PersonCard" onClick={this.handleClick}>
        {person.name}
      </button>
      )
    }
  }

  PersonCard.propTypes = {
    person: React.PropTypes.object.isRequired,

  }

  export default PersonCard;
