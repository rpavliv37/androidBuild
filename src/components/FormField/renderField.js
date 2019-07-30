import React from 'react';
import {  View, TextInput } from 'react-native';
import { Input, Text } from 'galio-framework';

const onChange2 = ({ nativeEvent: { eventCount, target, text} }) => {
	console.log('value', text, eventCount, target);
}

const renderField = (props) => {
	const { input: { onChange, value }, meta: { touched, error } } = props;
	return (
		<View>
			<Input
				{...props}
				// value="aaaaa"
				onChangeText={onChange}
			/>
			{touched && error && (
			<Text
				color='red'
				style={{
					marginLeft: 10,
					marginTop: -7
				}}
			>
				{error}
			</Text> )}
		</View>
	);
};

export { renderField };