import React from 'react';
import { View, Picker, Text } from 'react-native';

const renderDropdown = (props) => {
  const { input: { onChange, value, ...inputProps }, children, getMembers, meta: { touched, error }, ...pickerProps } = props;
  return (
    <View>
      <Picker
        style={{
          height: 50,
          width: 'auto'
        }}
      selectedValue={value}
      onValueChange={value => {
        requestAnimationFrame(() => {
          if (getMembers) {
            getMembers(value);
          }
          onChange(value);
        });
      }}
      {...inputProps}
      {...pickerProps}
      >
        {children}
      </Picker>
      {
  touched && error && (
    <Text
      color='red'
      style={{
        marginLeft: 10,
        marginTop: -7
      }}
    >
      {error}
    </Text>)
  }
    </View >
	);
};

export { renderDropdown };
