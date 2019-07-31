import React from 'react';
import { Picker} from 'react-native';
import { Button, Block } from 'galio-framework';
import { Field, reduxForm } from 'redux-form';
import { renderDropdown } from '../../components/Dropdown';
import { renderField } from '../../components/FormField/renderField';
import { renderDatePicker } from '../../components/Datepicker';
import { trackerList, statussesList, priorityList, severityList } from './dropdownOptions';
import shortid from 'shortid';
import { required } from '../validation';
import _ from 'lodash';

class EditTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    const { handleSubmit, projects, getMembers, projectMembers, goTo, task, firstName, lastName } = this.props;
    const { subject, assigned_to, priority, project, id, status, description, estimated_hours, start_date, tracker } = task;
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
            <Picker.Item label={tracker.name} value={tracker.id} />
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
            defaultValue={subject}
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
            defaultValue={description}
				  />
          <Field
            name='status_id'
            component={renderDropdown}
            validate={[required]}
            selectedValue={status.id}
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
            selectedValue={priority.id}
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
            selectedValue={project.id}
          >
            <Picker.Item label='Project *' value='' />
            {projects && projects.map((item) => (
              <Picker.Item label={item.name} value={item.id} key={shortid.generate()} />
            ))}
          </Field>
          <Field
            name='assigned_to_id'
            component={renderDropdown}
            selectedValue={assigned_to.id}
          >
            <Picker.Item label='Assignee *' value='' />
            {projectMembers && projectMembers.map((item) => (
              <Picker.Item label={item.user ? item.user.name : item.group.name} value={item.user ? item.user.id : item.group.id} key={shortid.generate()} />
            ))}
          </Field>
          {/* <Field
            name='issue_custom_field_values_27'
            component={renderDropdown}
          >
            <Picker.Item label='Severity *' value='' />
            {severityList.map((item) => (
              <Picker.Item label={item} value={item} key={shortid.generate()} />
            ))}
          </Field> */}
          <Field
            label='Start date'
            defaultDate={new Date()}
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
            defaultValue={estimated_hours}
				  />
          {/* <Field
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
              Save
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
              onPress={() => goTo('TaskDetails')}
            >
              Cancel
					</Button>
          </Block>
        </Block>
    );
  }
}


export default reduxForm({
  form: 'editTaskForm'
})(EditTaskForm);