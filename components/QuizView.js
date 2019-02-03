import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { white, black, blue, red, green } from '../utils/colors'
import TextButton from './TextButton'

class QuizView extends React.Component {

  constructor(props){
    super(props);
    const { data, id, count } = this.props

    this.state={
      data: data[id]['questions'],
      currentCard: 0,
      score: 0,
      onQuestion: true
    }

    this.setState = this.setState.bind(this);

  }

  onPressCorrect = () => {
    this.setState((state)=>
      {return { score: state.score + 1, currentCard: state.currentCard + 1, onQuestion: true  } } )
  }


  onPressIncorrect = () => {
    this.setState((state)=>
      {return { currentCard: state.currentCard + 1, onQuestion: true  } } )
  }

  onPressRestartQuiz = () => {
    this.setState((state)=>
      {return { currentCard: 0, score: 0, onQuestion: true }
    })
  }

  onPressBackToDeck = () => {
    const { id, count, navigation } = this.props
    navigation.navigate('DeckView', { id, count})
  }

  render(){

    if (!this.state.data[0])
      return(
        <View style={styles.container}>
          <Text style={styles.item}>Create some cards to quiz yourself!</Text>
        </View>
      )

    const { id, count } = this.props
    const { data, currentCard, score, onQuestion } = this.state

    if(this.state.currentCard + 1 > count) {

      return (
        <View style={styles.container}>
          <View style={[styles.container,{flex:3}]}>
            <Text style={{fontSize: 40}}>Your Score:</Text>
            <Text style={{fontSize: 40}}>{score}/{count}</Text>
          </View>
          <View style={[styles.container,{flex:1, width:415}]}>
            <TextButton style={{backgroundColor: 'green', color: 'white'}}
               onPress={this.onPressRestartQuiz}>
              Restart Quiz
            </TextButton>
            <TextButton style={{backgroundColor: 'red', color: 'white'}}
              onPress={this.onPressBackToDeck}
              >
              Back To Deck
            </TextButton>
          </View>
        </View>
      )
    }

    var questionAnswer = null;
    var questionsRemaining = null;

    if (onQuestion) {
      questionAnswer = (
        <View style={[styles.container,{flex:2}]}>
          <Text style={styles.item}>{data[currentCard].question} </Text>
          <Text style={[styles.item,{fontSize: 15, color: 'red'}]}
            onPress={()=> this.setState((state)=>{return { onQuestion: false } })}>
            Show Answer
          </Text>
        </View>
      )
    }
    else {
      questionAnswer = (
      <View style={[styles.container,{flex:2}]}>
        <Text style={styles.item}>{data[currentCard].answer}</Text>
        <Text style={[styles.item,{fontSize: 15, color: 'red'}]}
          onPress={()=> this.setState((state)=>
            {return { onQuestion: true } } )}>
          Show Question
        </Text>
      </View>
      )
    }

    questionsRemaining = (
      <View style={[styles.item, {justifyContent:'flex-start', alignItems:'flex-start', width: Dimensions.get('window').width}]}>
        <Text style={{fontSize: 20}}>Questions Left: {count - currentCard - 1 }/{count}</Text>
      </View>
    )

    return(
      <View style={styles.container}>
        {questionsRemaining}
        {questionAnswer}
        <View style={[styles.container,{flex:1, width:415}]}>
          <TextButton style={{backgroundColor: 'green', color: 'white'}}
            onPress={this.onPressCorrect} >
            Correct
          </TextButton>
          <TextButton style={{backgroundColor: 'red', color: 'white'}}
            onPress={this.onPressIncorrect}>
            Incorrect
          </TextButton>
        </View>
      </View>

    )
  }
}

function mapStateToProps ( { data }, { navigation } ) {
  return {
    data,
    id: navigation.state.params.id,
    count: navigation.state.params.count,
  }
}

export default connect(mapStateToProps)(QuizView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    fontSize: 30,
    margin: 20
  },
})
