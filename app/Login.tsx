import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Login = ({ navigation } : any) => {
  return (
    <View style = {styles.container}>
      <Text>TODO Login</Text>
      <Button onPress={() => navigation.navigate('Register')} title = 'Register' />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });