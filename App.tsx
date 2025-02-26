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
import CustomSwitch from './src/common/CustomSwitch';
import CustomCheckbox from './src/common/CustomCheckbox';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import {CustomTextInput} from './src/common/CustomTextInput';
import Icon from './src/common/Icons';
import DismissKeyboard from './src/components/DismissKeyboard';
import {CustomButton} from './src/common/CustomButton';

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
      <DismissKeyboard>
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
                inputType="password"
                placeholder="Nhập mật khẩu"
                rules={{required: 'Mật khẩu là bắt buộc!'}}
              />
            </FormProvider>

            <CustomButton
              type="primary"
              onPress={methods.handleSubmit(onSubmit, onError)}
              buttonStyle={{
                marginHorizontal: 8,
              }}>
              Đăng nhập
            </CustomButton>
          </View>
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
}

export default App;
