import React from 'react';
import { Picker, TouchableOpacity, ScrollView } from 'react-native';
import { Input, Button, Card, Block, Text, Icon, Navbar } from 'galio-framework';
import { DatePicker, Text as NativeBaseText } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { renderDropdown } from '../../components/Dropdown';
import { renderField } from '../../components/FormField';
import { renderDatePicker } from '../../components/Datepicker';
import { trackerList, statussesList, priorityList, severityList } from './dropdownOptions';
import shortid from 'shortid';
import { required } from '../validation';

class CreateNewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    const { handleSubmit, projects, getMembers, projectMembers, goTo} = this.props;
    const _projectMembers = projectMembers || [];
    return (
        <Block
          style={{
            backgroundColor: '#fff',
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 10
          }}
        >
          <Field
            name='tracker_id'
            component={renderDropdown}
            validate={[required]}
          >
            <Picker.Item label='Tracker *' value='' />
            {trackerList.map((item) => (
              <Picker.Item label={item.name} value={item.id} key={shortid.generate()} />
            ))}
          </Field>
          <Field
            props={{
              placeholder: 'Subject *',
              rounded: true,
              icon: 'subject',
              family: 'MaterialIcons'
            }}
            name="subject"
            component={renderField}
            validate={[required]}
				  />
          <Field
            props={{
              placeholder: 'Description',
              rounded: true,
              icon: 'description',
              family: 'MaterialIcons',
              style: {
                height: 100
              },
              multiline: true,
              numberOfLines: 4
            }}
            name="description"
            component={renderField}
				  />
          <Field
            name='status_id'
            component={renderDropdown}
            validate={[required]}
          >
            <Picker.Item label='Status *' value='' />
            {statussesList.map((item) => (
              <Picker.Item label={item.name} value={item.id} key={shortid.generate()} />
            ))}
          </Field>
          <Field
            name='priority_id'
            component={renderDropdown}
            validate={[required]}
          >
            <Picker.Item label='Priority *' value='' />
            {priorityList.map((item) => (
              <Picker.Item label={item.name} value={item.id} key={shortid.generate()} />
            ))}
          </Field>
          <Field
            name='project_id'
            component={renderDropdown}
            props={{
              getMembers: getMembers
            }}
            validate={[required]}
          >
            <Picker.Item label='Project *' value='' />
            {projects && projects.map((item) => (
              <Picker.Item label={item.name} value={item.id} key={shortid.generate()} />
            ))}
          </Field>
          <Field
            name='assigned_to_id'
            component={renderDropdown}
          >
            <Picker.Item label='Assignee' value='' />
            {_projectMembers.map((item) => (
              <Picker.Item label={item.user ? item.user.name : item.group.name} value={item.user ? item.user.id : item.group.id} key={shortid.generate()} />
            ))}
          </Field>
          <Field
            name='issue_custom_field_values_27'
            component={renderDropdown}
          >
            <Picker.Item label='Severity *' value='' />
            {severityList.map((item) => (
              <Picker.Item label={item} value={item} key={shortid.generate()} />
            ))}
          </Field>
          {/* <Field
            props={{
              placeholder: 'Pre-conditions',
              rounded: true,
              icon: 'subject',
              family: 'MaterialIcons',
              style: {
                height: 100
              },
              multiline: true,
              numberOfLines: 4
            }}
            name="issue_custom_field_values_13"
            component={renderField}
				  /> */}
          {/* <Field
            props={{
              placeholder: 'Steps to reproduce',
              rounded: true,
              icon: 'foot',
              family: 'Foundation',
              style: {
                height: 100
              },
              multiline: true,
              numberOfLines: 4
            }}
            name="issue_custom_field_values_11"
            component={renderField}
				  /> */}
          {/* <Field
            props={{
              placeholder: 'Parent task',
              rounded: true,
              icon: 'list-number',
              family: 'Foundation'
            }}
            name="parent_issue_id"
            component={renderField}
				  /> */}
          <Field
            label='Start date'
            component={renderDatePicker}
            name="start_date"
          />
          <Field
            label='Due date'
            component={renderDatePicker}
            name="due_date"
          />
          <Field
            props={{
              placeholder: 'Estimated time (hours)',
              rounded: true,
              icon: 'clock',
              family: 'Foundation',
              type: 'decimal-pad'
            }}
            name="estimated_hours"
            component={renderField}
				  />
          {/* !!! */}
          {/* <Field
            name='watchers'
            component={renderMultiplySelect}
          /> */}
          {/* !!! */}
          <Field
            props={{
              placeholder: 'Expected result',
              rounded: true,
              icon: 'results',
              family: 'Foundation',
              style: {
                height: 100
              },
              multiline: true,
              numberOfLines: 4
            }}
            name="issue_custom_field_values_12"
            component={renderField}
				  />
          {/* <Field
            props={{
              placeholder: 'Environment',
              rounded: true,
              icon: 'results',
              family: 'Foundation',
              style: {
                height: 100
              },
              multiline: true,
              numberOfLines: 4
            }}
            name="issue_custom_field_values_14"
            component={renderField}
				  /> */}
          {/* <Field
            props={{
              placeholder: 'Actual result',
              rounded: true,
              icon: 'results',
              family: 'Foundation',
              style: {
                height: 100
              },
              multiline: true,
              numberOfLines: 4
            }}
            name="issue_custom_field_values_15"
            component={renderField}
				  /> */}
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
              Create Task
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
              onPress={() => goTo('Main')}
            >
              Cancel
					</Button>
          </Block>
        </Block>
    );
  }
}


export default reduxForm({
  form: 'createTaskForm'
})(CreateNewTaskForm);