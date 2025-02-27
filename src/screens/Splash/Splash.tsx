import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {NavigationStackScreens} from '../../utils/enum';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/rootParam.type';

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationStackScreens.SplashScreen
>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace(NavigationStackScreens.AuthNavigation);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.viewStyles}>
      <Text style={styles.textStyles}>Welcome</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
