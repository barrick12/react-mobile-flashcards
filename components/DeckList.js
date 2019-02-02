import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, AsyncStorage, Platform, Dimensions } from 'react-native';
import { getDecks, DECK_STORAGE_KEY } from '../utils/api'
import { receiveDecks } from '../actions/index'
import { connect } from 'react-redux'
import { white, black, blue } from '../utils/colors'
import { AppLoading } from 'expo'

class DeckList extends React.Component {

  renderItem = ({item}) => {
    const { navigation } = this.props
    let k = item.k

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate(
          'DeckView',
          { id: k })
        }}
         >
        <Text style={styles.Deck}>Deck {item.k}</Text>
        <Text style={styles.CardCount}>Card Count: {item.count}</Text>
      </TouchableOpacity>
    )
  }

  render() {

    const { data } = this.props;

    var view = null
      if (data) {
        let result = Object.keys(data).map( (k) => {
          let count = data[k].questions.length;
          return { k, count };
        })
        view = <FlatList data={result} renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}/>
       }
      else {
        view = <AppLoading />
      }

    return(
      <View styles ={styles.container}>        
        {view}
      </View>
    )
  }
}

function mapStateToProps ( { data }, { navigation }  ) {
  return {
    data,
    navigation
  }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: 'black',
    padding: 20,

    alignItems: 'center',
    width: Dimensions.get('window').width,

  },
  Deck: {
    fontSize: 26,
  },
  CardCount: {
    fontSize: 16,
  }


})
