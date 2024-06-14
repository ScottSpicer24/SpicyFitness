import { Text, View, Button, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { signOut, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { getIDToken, getCurrentUserID } from '../functions/AuthFunctions';
import { styles, generateBoxShadowStyle } from '../Styles';

const Weight = () => {
  return (
    <View>
      <Text>Weight</Text>
    </View>
  )
}

export default Weight