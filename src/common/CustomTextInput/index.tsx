import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  StyleSheet,
} from 'react-native';
import {
  useController,
  useFormContext,
  UseControllerProps,
} from 'react-hook-form';

interface CustomTextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
}

const ControlledInput: React.FC<CustomTextInputProps> = props => {
  const {label, name, rules, defaultValue, ...inputProps} = props;

  const {
    field,
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {borderColor: error ? 'red' : '#888888'},
        ]}>
        <RNTextInput
          style={styles.input}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        />
      </View>
      <View style={styles.errContainer}>
        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    </View>
  );
};

export const CustomTextInput: React.FC<CustomTextInputProps> = props => {
  const {name} = props;
  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? 'CustomTextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    return null;
  }

  return <ControlledInput {...props} />;
};

const styles = StyleSheet.create({
  label: {
    color: '#333',
    marginBottom: 8,
    fontWeight: '700',
  },
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    // backgroundColor: 'red',
  },
  inputContainer: {
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#333',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  errContainer: {
    height: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
