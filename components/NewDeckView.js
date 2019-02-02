import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, AsyncStorage, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
import { addDeck } from '../actions/index'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { white, black, blue, red } from '../utils/colors'
import TextButton from './TextButton'

class NewDeckView extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      text: ""
    }

    this.setState = this.setState.bind(this);

  }

  onChangeTextInput = (text) => {
     this.setState((state)=>{return{text: text}} )
   }

  onPressSumit = () => {
    const { dispatch, navigation } = this.props;

    saveDeckTitle(this.state.text)
    dispatch(addDeck(this.state.text))

    let id = this.state.text

    navigation.navigate('DeckView', {id});

    this.setState((state)=>{return{text: ""}} )

    

  }

  render(){

    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <View style={[styles.container,{flex:3}]}>
            <Text style={{fontSize: 40, margin: 50}}>What is the title of your new deck?</Text>
             <TextInput style={{width: 300, borderColor: 'black', borderWidth:1, fontSize: 30, padding: 20}}
               onChangeText={this.onChangeTextInput}
               value={this.state.text}
             />
          </View>

          <View style={[styles.container,{flex:1, width:415}]}>
            <TextButton style={{backgroundColor: 'green', color: 'white'}}
              onPress={this.onPressSumit}>
              Create Deck
            </TextButton>

          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }

}

function mapStateToProps ( state, {navigation}) {
  return {
    navigation
  }
}

export default connect()(NewDeckView)

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
