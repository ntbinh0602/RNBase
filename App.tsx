/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import SplashScreen from './src/screens/Splash';

function App(): JSX.Element {
  const [visible, setVisible] = useState(true);
  if (visible) {
    return <SplashScreen onEnd={() => setVisible(false)} />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'gray'}}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{flex: 1}}>
        <View style={style.container}>
          <Text>App.js</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
