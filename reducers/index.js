import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions/index'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
         data: {...action.decks },
      }
    case ADD_DECK :
      return {
        ...state,
        data: {
          ...state.data,
          [action.deck]: { title: action.deck, questions: [] }
        },
      }
    case ADD_CARD:

      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...state.data[action.id],
            questions: state.data[action.id].questions.concat([action.card])
          }
        }
      }

    default :
      return state
  }
}

export default decks
