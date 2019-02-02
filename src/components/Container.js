import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'
import { connect } from 'react-redux'
import DeckList from './DeckList'
import DeckView from './DeckView'
import QuizView from './QuizView'
import NewDeckView from './NewDeckView'
import NewQuestionView from './NewQuestionView'

import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'
import { Constants } from 'expo'
import { white,  blue } from '../utils/colors'

function MyStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {

  DeckList: {
    screen: DeckList,
    navigationOptions: {
    tabBarLabel: "Decks",
    }
  },
  NewDeckView: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: "New Deck",
    }
  },

};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {

    style: {
      height: 56,
      backgroundColor: 'blue',
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs = Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const MainNavigator = createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null,
    },
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      header: null,
    },
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions: {
      header: null,
    },
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      header: null,
    },
  }


});

const MainNavigatorContainer = createAppContainer(MainNavigator);

class Container extends React.Component{

  componentDidMount(){
    const { dispatch } = this.props;

    getDecks()
      .then((decks)=> {
        dispatch(receiveDecks(decks))

      })

  }

    render() {
      const { data } = this.props;

      return(
        <React.Fragment>
          <MyStatusBar backgroundColor={'blue'} barStyle="light-content" />
          <MainNavigatorContainer />
        </React.Fragment>
      )
    }
}

function mapStateToProps ( { data } ) {
  return {
    data
  }
}

export default connect(mapStateToProps)(Container);
