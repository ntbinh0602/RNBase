import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';

type Props = {
  onEnd: () => void;
};

const SplashScreen: React.FC<Props> = ({onEnd}) => {
  useEffect(() => {
    const performTimeConsumingTask = async (): Promise<void> => {
      return new Promise(() =>
        setTimeout(() => {
          onEnd();
        }, 3000),
      );
    };
    performTimeConsumingTask();
  }, [onEnd]);

  return (
    <View style={styles.viewStyles}>
      <Text style={styles.textStyles}>Wellcome</Text>
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
