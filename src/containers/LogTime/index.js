import React from 'react';
import { connect } from 'react-redux';
import { Block } from 'galio-framework';
import LogTimeForm from './LogTimeForm';
import { logTime } from './actions';

class LogTime extends React.Component {
    static navigationOptions = {
		title: 'Log Time',
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
    const { initialValues } = this.props;
		const { navigate } = this.props.navigation;
		return (
      <Block
        flex={1}
        // safe
        // middle
      >
      <LogTimeForm
        goTo={navigate}
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        enableReinitialize
      />
      </Block>
		);
	}
}

function mapStateToProps(state) {
  return {
    initialValues: {
      issue_id: state.selected_task.id }
  }
}

export default connect(mapStateToProps, {
  logTime
})(LogTime);