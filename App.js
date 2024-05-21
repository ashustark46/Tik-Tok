import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import TermsAndConditionsScreen from './components/TermsAndConditionsScreen';
import AboutScreen from './components/AboutScreen';
import HomeScreen from './components/HomeScreen';
import MusicScreen from './components/MusicScreen';
import PlayerScreen from './components/PlayerScreen';
import VideoScreen from './components/VideoScreen';
import VideoPlayerScreen from './components/VideoPlayerScreen';
import NoteCustomizationScreen from './components/NoteCustomizationScreen';
import NoteDetailsScreen from './components/NoteDetailsScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Music" component={MusicScreen} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        <Stack.Screen name="Video" component={VideoScreen} />
        <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
        <Stack.Screen name="NoteCustomization" component={NoteCustomizationScreen} />
        <Stack.Screen name="NoteDetails" component={NoteDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
