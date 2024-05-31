import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splashscreen from '../screens/SplashScreen';
import Dashboard from '../screens/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import DowloadVideo from '../screens/DowloadVideoScreen';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={Splashscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoPlayerScreen"
          component={VideoPlayerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DownloadVideoScreen"
          component={DowloadVideo}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
