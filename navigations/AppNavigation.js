import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { FillYourProfile, SignupPhoneNumber, OTPVerification, Welcome, Signup, DrinkPreferences, FoodPreferences } from '../screens';
import Profile from '../screens/Profile';
import BottomTabNavigation from './BottomTabNavigation';
import PurchaseItemsScreen from '../screens/PurchaseItems';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched')
        if (value === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true')
          setIsFirstLaunch(true)
        } else {
          setIsFirstLaunch(false)
        }
      } catch (error) {
        setIsFirstLaunch(false)
      }
      setIsLoading(false) // Set loading state to false once the check is complete
    }

    checkIfFirstLaunch()
  }, [])

  if (isLoading) {
    return null // Render a loader or any other loading state component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isFirstLaunch ? 'Signup' : 'Signup'}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignupPhoneNumber" component={SignupPhoneNumber} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="FillYourProfile" component={FillYourProfile} />
        <Stack.Screen name="DrinkPreferences" component={DrinkPreferences} />
        <Stack.Screen name="FoodPreferences" component={FoodPreferences} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Main" component={BottomTabNavigation} />
        <Stack.Screen name="PurchaseItems" component={PurchaseItemsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation