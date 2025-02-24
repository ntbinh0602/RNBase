/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SplashScreen from './src/screens/Splash';
import CustomSwitch from './src/libraries/CustomSwitch';
import CustomCheckbox from './src/libraries/CustomCheckbox';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import {CustomTextInput} from './src/libraries/CustomTextInput';
import Icon from './src/libraries/Icons';

interface FormValues {
  email: string;
  password: string;
}
function App(): JSX.Element {
  const [visible, setVisible] = useState(true);
  // Initialize useForm hook
  const methods = useForm<FormValues>();

  // Form submit handler
  const onSubmit: SubmitHandler<FormValues> = data =>
    console.log('Form Data:', data);

  // Form error handler
  const onError: SubmitErrorHandler<FormValues> = errors =>
    console.log('Form Errors:', errors);
  if (visible) {
    return <SplashScreen onEnd={() => setVisible(false)} />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'gray'}}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>App.js</Text>
          <Icon type="AntDesign" name="star" />
          <CustomSwitch size="small" />
          <CustomCheckbox
            onPress={(isChecked: boolean) => {}}
            text="Custom Checkbox"
            // innerIconStyle={{borderWidth: 2}}
            fillColor="blue"
            textStyle={{
              textDecorationLine: 'none',
            }}
            style={{
              paddingHorizontal: 35,
            }}
          />
        </View>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <FormProvider {...methods}>
            <CustomTextInput
              name="email"
              label="Tài khoản"
              placeholder="jon.doe@email.com"
              keyboardType="email-address"
              rules={{required: 'Tài khoản là bắt buộc!'}}
            />
            <CustomTextInput
              name="password"
              label="Mật khẩu"
              secureTextEntry
              placeholder="Nhập mật khẩu"
              rules={{required: 'Mật khẩu là bắt buộc!'}}
            />
          </FormProvider>
          <TouchableOpacity onPress={methods.handleSubmit(onSubmit, onError)}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
