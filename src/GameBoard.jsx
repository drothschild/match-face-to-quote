import React, {Component } from 'react'
const { people, quotes } = require('../public/data')
import PersonCard from './PersonCard'
import './GameBoard.css';

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
    let quote, peopleCards
    if (quoteIndex !== null) {
      quote = shuffledQuotes[quoteIndex].quote
      peopleCards = shuffledPeople.map((person) =>(<li key={person.id}><PersonCard person={person} key={person.id} handleClick={this.pickPerson}/></li>
          ))
    } else
    {
      quote = "Call your Rep"
      peopleCards = null
    }
    const nextArrow = answerGuessed ? <button onClick={this.goToNext}>Next</button> : null

    return(      
      <div className="GameBoard">
        <h1>Who said it?</h1>
        <div className="GameBoard-Quote">
          {quote}
        </div>     
        <ul className="GameBoard-PeopleCards">
          {peopleCards}
        </ul>
        {nextArrow}
      </div>
      )
  }
}

export default GameBoard

