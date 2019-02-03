import React from 'react';
import { StyleSheet } from 'react-native';
import { setLocalNotification, clearLocalNotification} from './utils/api'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import Container from './components/Container'
import middleware from './middleware'

export default class App extends React.Component {

  componentDidMount() {
    clearLocalNotification()
    .then(setLocalNotification)
  }

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
