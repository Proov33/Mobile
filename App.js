import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ClubScreen from './screens/ClubScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Stack.Screen name="Club" component={ClubScreen} options={({ route }) => ({ title: route.params.teamName })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}