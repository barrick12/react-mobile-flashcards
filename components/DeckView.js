import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, AsyncStorage, Platform, Animated } from 'react-native'
//import { receiveDecks } from '../actions/index'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { white, black, blue, red } from '../utils/colors'
import TextButton from './TextButton'

class DeckView extends React.Component {

  state = {
    bounceValue: new Animated.Value(1)
  }

  onPressAddCard = () => {
    const { id, data, navigation } = this.props
    let count = data[id].questions.length
    navigation.navigate('NewQuestionView', { id, count })
  }

  onPressStartQuiz = () => {
    const { id, data, navigation } = this.props
    let count = data[id].questions.length
    navigation.navigate('QuizView', { id, count })
  }

  render(){

    const { id, data } = this.props
    const { bounceValue } = this.state

    var count = data[id].questions.length;
    console.log("DeckView: ", id, count )

    Animated.sequence([
          Animated.timing(bounceValue, { duration: 200, toValue: 1.1}),
          Animated.spring(bounceValue, { toValue: 1, friction: 4})
        ]).start()

    return(

      <View style={styles.container}>
        <View style={[styles.container,{flex:3}]}>
          <Animated.Text style={[{fontSize: 40}, {transform: [{scale: bounceValue}]}]}>
            {id}
          </Animated.Text>
          <Text style={{fontSize: 25}}> {count} {Number(count) > 1 ? 'cards' : 'card' }</Text>
        </View>

        <View style={[styles.container,{flex:1, width:415}]}>
          <TextButton style={{backgroundColor: 'white', color: 'black'}}
            onPress={this.onPressAddCard}>
            Add Card
          </TextButton>
          <TextButton onPress={this.onPressStartQuiz}>
            Start Quiz
          </TextButton>
        </View>
      </View>
    )
  }

}

function mapStateToProps ( { data }, { navigation }  ) {

  return {
    id: navigation.state.params.id,
    navigation,
    data
  }
}

export default connect(mapStateToProps)(DeckView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

})
