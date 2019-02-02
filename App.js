import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import QuizView from './components/QuizView'
import NewDeckView from './components/NewDeckView'
import NewQuestionView from './components/NewQuestionView'

import Container from './components/Container'
import middleware from './middleware'
import { white, purple, blue } from './utils/colors'


export default class App extends React.Component {


  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
          <Container />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
