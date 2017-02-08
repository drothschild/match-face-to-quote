import React, {Component } from 'react'
const { people, quotes } = require('../public/data')
import PersonCard from './PersonCard'
import './GameBoard.css';
import { Button, Panel, Alert } from 'react-bootstrap';



class GameBoard  extends Component {
  constructor(props) {
    super(props)
    this.state={
      quoteIndex: 0,
      answerGuessed:false
    }
    this.pickPerson = this.pickPerson.bind(this)
    this.goToNext = this.goToNext.bind(this)
  }

  componentWillMount(){
    this.setState({
      shuffledQuotes: this.shuffle(quotes),
      shuffledPeople: this.changeAllStatus(this.shuffle(people),"Available")
    })
  }

   shuffle(array){
    let currentIndex = array.length, temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  changeOneStatus(array,id,status){
    return array.map(function(element){
        if(id===element.id){
          element.status = status
        }
        return element
      })
  }

  changeAllStatus(array, status) {
   return array.map(function (element){
       element.status = status
       return element
    })
  }

  pickPerson(id){
    if (this.state.answerGuessed) return
    const { shuffledPeople, shuffledQuotes, quoteIndex } = this.state   
    const quote = shuffledQuotes[quoteIndex]
    if (id === quote.personId){
      this.setState ({
        answerGuessed: true,
        shuffledPeople: this.changeOneStatus(this.changeAllStatus(shuffledPeople, "Incorrect"), id, "Correct")
            })

    } else {
      this.setState ({
        shuffledPeople: this.changeOneStatus(shuffledPeople, id, "Incorrect")
            })
    }
  }

  goToNext(){
    if (this.state.quoteIndex >= this.state.shuffledQuotes.length-1) {
      // go to InfoPage
      this.setState ({
              quoteIndex: null,
              answerGuessed: false
            })
    } else {
      this.setState ({
              quoteIndex: this.state.quoteIndex + 1,
              shuffledPeople: this.changeAllStatus(this.shuffle(people),"Available"),
              answerGuessed: false
            })
    }
  }

  render(){
    const { quoteIndex, shuffledQuotes,shuffledPeople, answerGuessed } = this.state
    let quote, peopleCards, title
    if (quoteIndex !== null) {
      quote = <div className="GameBoard-Quote-Text"> {shuffledQuotes[quoteIndex].quote}</div>
      peopleCards = shuffledPeople.map((person) =>(<li key={person.id}><PersonCard person={person} key={person.id} handleClick={this.pickPerson}/></li>
          ))
      title = (<h1>Who said it?</h1>)
    } else
    {
      title = (<h1>What do you say?</h1>)
      quote = <Alert bsStyle="warning">
      These are actual cabinet nominees. Think we can do better? Call your Congress members to tell them to have standards!  
       <a href="tel:1-888-623-4558">(888) 623-4558</a>
        </Alert>
      peopleCards = null
    }
    const nextArrow = answerGuessed ? <Button onClick={this.goToNext}>Next</Button> : null

    return(      
      <Panel header={title} bsStyle="primary"className="GameBoard">
        <div className="GameBoard-Quote">{quote}</div>     
        <ul className="GameBoard-PeopleCards">
          {peopleCards}
        </ul>
        {nextArrow}
      </Panel>
      )
  }
}

export default GameBoard

