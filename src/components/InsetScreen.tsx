import {View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface DismissKeyboardProps {
  inset: 'top' | 'bottom';
}

const InsetScreen: React.FC<DismissKeyboardProps> = ({inset}) => {
  const insetValue = useSafeAreaInsets();

  return (
    <View
      style={{
        height: insetValue[inset] ? insetValue[inset] : 0,
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default InsetScreen;
