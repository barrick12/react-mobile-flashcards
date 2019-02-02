import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, AsyncStorage, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
import { addCard } from '../actions/index'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { white, black, blue, red } from '../utils/colors'
import TextButton from './TextButton'

class NewDeckView extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      question: "",
      answer: ""
    }

    this.setState = this.setState.bind(this);

  }

  onChangeQuestionTextInput = (text) => {
     this.setState((state)=>{return{question: text}})
   }

   onChangeAnswerTextInput = (text) => {
      this.setState((state)=>{return{answer: text}} )
    }

  onPressSumit = () => {
    const { dispatch, id, count, navigation } = this.props

    var card = {
      question: this.state.question,
      answer: this.state.answer,
    }

    console.log("The card: ", card)

    addCardToDeck(id, card);
    dispatch(addCard(id, card));

    navigation.navigate('DeckView', {id, count})

  }

  render(){

    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <View style={[styles.container,{flex:3}]}>
            <Text style={{fontSize: 40, margin: 50}}>Enter your question and answer.</Text>
             <TextInput style={{width: 300, borderColor: 'black', borderWidth:1, fontSize: 20, padding: 10, marginBottom: 20}}
               onChangeText={this.onChangeQuestionTextInput}
               value={this.state.question}
             />
             <TextInput style={{width: 300, borderColor: 'black', borderWidth:1, fontSize: 20, padding: 10, marginBottom: 60}}
               onChangeText={this.onChangeAnswerTextInput}
               value={this.state.answer}
             />
          </View>

          <View style={[styles.container,{flex:1, width:415}]}>
            <TextButton style={{backgroundColor: 'blue', color: 'white'}}
              onPress={this.onPressSumit}>
              Submit
            </TextButton>

          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }

}

function mapStateToProps ({},{ navigation }) {
  console.log("NewQuestionView id, count: ", navigation.state.params.id, navigation.state.params.count)
  return {
    id: navigation.state.params.id,
    count: navigation.state.params.count,
    navigation,
  }
}

export default connect(mapStateToProps)(NewDeckView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    flex: 1,
  },
})
