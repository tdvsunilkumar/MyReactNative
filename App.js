import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Navigation from './src/components/Navigation';
import { AuthProvider } from './src/Context/AuthContext';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler'
import { enableScreens, screensEnabled } from 'react-native-screens';

enableScreens();

const App = () => {
   return (
    <AuthProvider>
    <Navigation />
    <Toast style={ styles.toast}/>
 </AuthProvider>
   )
}

const styles = StyleSheet.create({
  toast:{
    textAlign:'center'
  }
});

export default App;

