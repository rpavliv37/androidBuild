import React from 'react';
import { Block } from 'galio-framework';
import Logo from '../../components/Logo';
import ForgotPassForm from './ForgotPassForm';

export default class ForgotPass extends React.Component {
	static navigationOptions = {
		title: 'Forgot Password',
		headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
  };
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }
    render() {
				const {navigate} = this.props.navigation;
        return (
					<React.Fragment>
						<Block
							flex={1}
							safe
							middle
						>
							<Logo />
							<ForgotPassForm
								handleSubmit={()=> {}} // set onSubmit actions
							/>
						</Block>
					</React.Fragment>
        );
    }
}