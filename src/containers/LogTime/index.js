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
    const { logTime: _logTime } = this.props;
    const parsedValues = {...values};
    parsedValues.hours = parseInt(parsedValues.hours);
    parsedValues.spent_on = new Date(parsedValues.spent_on).toISOString().substring(0, 10);
    _logTime(parsedValues);
  }
	render() {
    const { initialValues } = this.props;
		const { navigate } = this.props.navigation;
		return (
      <Block
        flex={1}
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
      issue_id: state.main.selected_task.id,
      spent_on: ''}
  }
}

export default connect(mapStateToProps, {
  logTime
})(LogTime);