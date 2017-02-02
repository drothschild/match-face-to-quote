// Currently unused


const redux = require('redux')
const reactRedux = require('react-redux')
const { people, quotes } = require('../public/data')

const shuffledPeople = shuffle(people)
const shuffledQuotes = shuffle(quotes)

const initialState = {
  shuffledPeople,
  shuffledQuotes,
  quoteIndex: 0
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}


const store = redux.createStore(rootReducer, initialState, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f

  ))


const shuffle = (array) => {
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