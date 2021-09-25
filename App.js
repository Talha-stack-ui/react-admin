import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './Screens/components/signInScreen'
import SignUpScreen from './Screens/components/signUpScreen'
import SplashScreen from './Screens/components/splashScreen'
import LoadingScreen from './Screens/components/loadingScreen'
import HomeScreen from './Screens/components/homeScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUpScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          // Hiding header for LoginScreen Screen
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          // Hiding header for SignUpScreen Screen
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          // Hiding header for LoginScreen Screen
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          // Hiding header for LoginScreen Screen
          options={{headerShown: false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  txt :{
    fontSize:30,
    alignSelf:"center",
    justifyContent:"center"

  }
})
