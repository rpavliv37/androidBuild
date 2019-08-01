import React from 'react';
import { connect } from 'react-redux';
import { Block } from 'galio-framework';
import LogTimeForm from './LogTimeForm';
import { logTime } from './actions';
import moment from 'moment';

const date = new Date();

class LogTime extends React.Component {
  static navigationOptions = {
    title: 'Log Time',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerLeft: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit = (values) => {
    const { logTime: _logTime, navigation } = this.props;
    const { navigate } = navigation;
    const parsedValues = { ...values };
    parsedValues.hours = parseFloat(parsedValues.hours);
    parsedValues.issue_id = parseInt(parsedValues.issue_id)
    parsedValues.spent_on = moment(new Date(parsedValues.spent_on)).format('YYYY-MM-DD');
    console.log('parsedValues', parsedValues);
    _logTime(parsedValues);
    navigate('TaskDetails');
  }
  render() {
    const { initialValues } = this.props;
    const { goBack } = this.props.navigation;
    return (
      <Block
        flex={1}
      >
        <LogTimeForm
          goTo={goBack}
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
      spent_on: date
    }
  }
}

export default connect(mapStateToProps, {
  logTime
})(LogTime);