import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {LoginBackground} from '../../assets';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import {CustomTextInput} from '../../common/CustomTextInput';
import {CustomButton} from '../../common/CustomButton';
import CustomCheckbox from '../../common/CustomCheckbox';
import Colors from '../../utils/colors';

interface FormValues {
  email: string;
  password: string;
}
const Login = () => {
  const methods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data =>
    console.log('Form Data:', data);

  return (
    <ImageBackground style={styles.container} source={LoginBackground}>
      <View style={styles.formWrapper}>
        <Text style={styles.textHeader}>Đăng nhập</Text>
        <FormProvider {...methods}>
          <CustomTextInput
            name="account"
            label="Tài khoản"
            placeholder="name@email.com"
            keyboardType="email-address"
            rules={{required: 'Tài khoản là bắt buộc!'}}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
          />
          <CustomTextInput
            name="Password"
            label="Mật khẩu"
            inputType="password"
            placeholder="Password"
            rules={{required: 'Mật khẩu là bắt buộc!'}}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
          />
        </FormProvider>
        <View style={styles.actionWrapper}>
          {/* <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
          <CustomCheckbox
            text="Ghi nhớ mật khẩu"
            style={styles.checkbox}
            disableText={false}
            onPress={(isChecked: boolean) => {}}
          /> */}
          <CustomButton
            buttonStyle={styles.loginButton}
            type="primary"
            onPress={methods.handleSubmit(onSubmit)}>
            Đăng nhập
          </CustomButton>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 28,
    marginBottom: 30,
  },
  formWrapper: {
    paddingVertical: 45,
    paddingHorizontal: 50,
    borderRadius: 30,
    backgroundColor: '#fff',
    width: 500,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  forgotButton: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#5E677C',
  },
  actionWrapper: {
    paddingHorizontal: 10,
  },
  loginButton: {
    borderRadius: 28,
    height: 56,
    marginTop: 30,
  },
  checkbox: {
    marginVertical: 15,
  },
  inputContainer: {
    borderRadius: 28,
  },
  inputStyle: {
    paddingHorizontal: 16,
    height: 50,
  },
});
