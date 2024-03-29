import React from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button, Block } from 'galio-framework';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../components/FormField/renderField'
import { renderDatePicker } from '../../components/Datepicker';
import { renderDropdown } from '../../components/Dropdown';
import activityList from './activityList';
import { required } from '../validation';
import shortid from 'shortid';
import _ from 'lodash';

export class LogTimeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
    const { handleSubmit, goTo, task_id } = this.props;
		return (
      <Block
        style={{
          backgroundColor: '#fff',
          // flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 10
        }}
      >
				<Field
					props={{
						placeholder: 'Task',
						rounded: true,
						icon: 'text',
            family: 'Entypo',
            keyboardType: 'numeric',
            defaultValue: task_id + ''
					}}
					component={renderField}
					name="issue_id"
				/>
				<Field
          label='Date *'
          component={renderDatePicker}
          name="spent_on"
          validate={[required]}
        />
        <Field
          props={{
            placeholder: 'Hours *',
            rounded: true,
            icon: 'clock',
            family: 'Foundation',
            type: 'decimal-pad'
          }}
          name="hours"
          component={renderField}
          validate={[required]}
				/>
        <Field
					props={{
						placeholder: 'Comment',
						rounded: true,
						icon: 'comment',
						family: 'FontAwesome'
					}}
					component={renderField}
					name="comments"
				/>
        <Field
          name='activity_id'
          component={renderDropdown}
          validate={[required]}
        >
          <Picker.Item label='Activity *' value='' />
          {activityList.map((item) => (
            <Picker.Item label={item.name} value={item.id} key={shortid.generate()} />
          ))}
        </Field>
        <Block
          row
          space='between'
        >
          <Button
            onPress={handleSubmit}
            radius={27}
            shadowColor
            color='info'
            icon='pluscircle'
            iconFamily='AntDesign'
            iconColor='white'
            style={{
              width: 150
            }}
          >
            Log Time
          </Button>
          <Button
            radius={27}
            shadowColor
            color='error'
            icon='pluscircle'
            iconFamily='AntDesign'
            iconColor='white'
            style={{
              width: 150
            }}
            onPress={() => goTo()}
          >
            Cancel
          </Button>
        </Block>
			</Block>
		);
	}
}

const form = reduxForm({
  form: 'logTimeForm'
})(LogTimeForm);

const mapStateToProps = (state) => ({
  task_id: _.get(state, ['form', 'logTimeForm', 'initial', 'issue_id'])
});

export default connect(mapStateToProps)(form);