import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, black, blue } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 20,
    borderRadius:2,
    borderColor: 'black',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    width: 250

  }
})
