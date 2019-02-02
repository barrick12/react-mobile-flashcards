import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const DECK_STORAGE_KEY = 'MobileFlashcards:deck'
export const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function setDummyData() {
  var dummyData = {}

   dummyData = {
     'React': {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },

    'JavaScript': {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  return dummyData

}

export async function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((data)=> {
      if (!data) {
        dummyData = setDummyData()
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
        return dummyData
      }

      else { return JSON.parse(data) }
    })
}

export function getDeck(id) {
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[id]
    })
}

export function saveDeckTitle(title) {
  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]:{
      title: title,
      questions: [],
    }}))
}

export function addCardToDeck(title, card) {

  return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then(results => JSON.parse(results))
      .then(results => {
        results[title].questions.push(card);
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(results));
        return results;
      });

}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Study!',
    body: "Don't forget to do a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
