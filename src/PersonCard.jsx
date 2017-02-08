import React, { Component } from 'react';
import './PersonCard.css';
import { Image } from 'react-bootstrap';



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
    const style = "PersonCard " + person.status
    const firstName = person.name.split(" ")[0]
    const lastName = person.name.split(" ")[1]
    return(
      <div className={style} onClick={this.handleClick}>
        <Image src={process.env.PUBLIC_URL + '/img/' + person.picture} alt={person.name} responsive/>
        <div className="PersonCard-Name">{firstName}<br />{lastName}</div>
      </div>
      )
    }
  }

  PersonCard.propTypes = {
    person: React.PropTypes.object.isRequired,
    handleClick: React.PropTypes.func.isRequired
  }

  export default PersonCard;
