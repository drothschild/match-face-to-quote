import React, { Component } from 'react';
import './PersonCard.css';


class PersonCard  extends Component {
  constructor(props){
    super(props)
    this.state = {
      cardStyle: "Available"
    }
    this.handleClick=this.handleClick.bind(this)
  }
  handleClick(){
    if (this.state.cardStyle !== "Available") return
    this.props.handleClick(this.props.person.id)
  }

  render(){
    const { person } = this.props
    return(
      <div className="PersonCard" onClick={this.handleClick}>
        {person.name}-{person.status} 
      </div>
      )
    }
  }

  PersonCard.propTypes = {
    person: React.PropTypes.object.isRequired,
    handleClick: React.PropTypes.func.isRequired
  }

  export default PersonCard;
