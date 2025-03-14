/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import SplashScreen from './src/screens/Splash';
import InsetScreen from './src/components/InsetScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  const [visible, setVisible] = useState(true);
  if (visible) {
    return <SplashScreen onEnd={() => setVisible(false)} />;
  }

  return (
    <SafeAreaProvider>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
        {/* <InsetScreen inset="top" /> */}
        {/* <StatusBar barStyle={'dark-content'} />
        <View style={{flex: 1}}>
          <View style={style.container}>
            <Text>App.js</Text>
          </View>
        </View> */}
      </View>
    </SafeAreaProvider>
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
