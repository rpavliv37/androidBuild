import React from 'react';
import {  View, TextInput } from 'react-native';
import { Input } from 'galio-framework';

const renderField = (props) => {
	const { input: { onChange, value } } = props;
	return (
		<TextInput
			// {...props}
			value={value}
			onChange={onChange}
		/>
	);
};

export { renderField };