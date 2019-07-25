import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Block } from 'galio-framework';
import Logo from '../../components/Logo';
import SignInForm from './SignInForm';
import { receiveSignIn, signIn } from './actions';

class SignIn extends React.Component {
    static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {};
	}
	onSubmit = (values) => {
		const { signIn: signInProps, navigation } = this.props;
    signInProps(values, navigation.navigate);
  }
	render() {
		const { navigate } = this.props.navigation;
		return (
			<Block
				flex={1}
				safe
				middle
			>
				<Logo />
				<SignInForm 
					goTo={navigate}
					onSubmit={this.onSubmit} // set onSubmit actions
				/>
			</Block>
		);
	}
}

export default connect(null, {
  signIn, receiveSignIn
})(SignIn);