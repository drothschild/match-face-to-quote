import React, {Component } from 'react'
const { people, quotes } = require('../public/data')
import PersonCard from './PersonCard'
// import Quote from './Quote'



class GameBoard  extends Component {

  constructor(props) {
    super(props)
    this.state= {
      quoteIndex: 0,
      answerGuessed:false
    }
    this.pickPerson = this.pickPerson.bind(this)
    this.goToNext = this.goToNext.bind(this)
  }
  componentWillMount(){
    this.setState({
      shuffledPeople: this.shuffle(people),
      shuffledQuotes: this.shuffle(quotes)
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

  pickPerson(id){
    if (this.state.answerGuessed) return
    const quote = this.state.shuffledQuotes[this.state.quoteIndex]
    if (id === quote.personId){
      console.log("correct")
      // change Display to right answer
      this.setState ({
        answerGuessed: true
            })
    } else {
      console.log("wrong")
      // Change Display to Wrong Answer
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
              shuffledPeople: this.shuffle(this.state.shuffledPeople),
              answerGuessed: false
            })
    }
  }

  render(){
    const { quoteIndex, shuffledQuotes,shuffledPeople, answerGuessed } = this.state
    console.log(quoteIndex)
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
        {nextArrow}
        <ul className="GameBoard-PeopleCards">
          {peopleCards}
        </ul>
      </div>
      )
  }
}

export default GameBoard

