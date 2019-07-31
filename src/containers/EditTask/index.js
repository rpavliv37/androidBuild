import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import EditTaskForm from './EditTaskForm';
import { getProjectsFromList } from '../Main/utils';
import { getProjectMembers, editTask } from './actions';
import { getAllListOfTasks } from '../Main/actions';
import { signIn } from '../SignIn/actions';

class EditTask extends React.Component {
  static navigationOptions = {
    title: 'Edit task',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff'
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getProjectMembers(this.props.task.project.id);
  }

  onSubmit = (values) => {
    const { getAllListOfTasks: _getAllListOfTasks, editTask: _editTask } = this.props;
    const { navigate } = this.props.navigation;
    const result = [];
    for(let key in values) {
      const splittedKeys = key.split('_');
      if(splittedKeys[0] === 'issue') {
        result.push({
          id: parseInt(splittedKeys[splittedKeys.length - 1]),
          value: values[key]
        })
        delete values[key];
      } if (key === 'start_date' || key === 'due_date') {
        values[key] = new Date(values[key]).toISOString().substring(0, 10);
      }
    }
    const parsedValues = {...values};
    if(result.length > 0) parsedValues.custom_fields = result;
    _editTask(parsedValues);
    _getAllListOfTasks();
    navigate('TaskDetails');
  }

  render() {
    const { all_tasks, getProjectMembers, projectMembers, task, firstName, lastName } = this.props;
    const { navigate } = this.props.navigation;
    const projects = (all_tasks && getProjectsFromList(all_tasks)) || [];
    const { subject, assigned_to, priority, project, id, status, description, estimated_hours, start_date, tracker } = task;
    const defaultValues = {
      subject,
      assigned_to_id: assigned_to.id,
      priority_id: priority.id,
      project_id: project.id,
      start_date,
      id,
      status_id: status.id,
      description,
      estimated_hours,
      status_id: status.id,
      tracker_id: tracker.id
    }
    console.log('defaultValues', defaultValues);
    return (
      <ScrollView>
          <EditTaskForm
            initialValues={defaultValues}
            enableReinitialize
            projects={projects}
            getMembers={getProjectMembers}
            projectMembers={projectMembers}
            onSubmit={this.onSubmit}
            goTo={navigate}
            task={task}
            firstName={firstName}
            lastName={lastName}
          />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    all_tasks: _.get(state, ['main', 'all_tasks_list', 'issues']),
    selectedProject: _.get(state, ['form', 'createTaskFrom', 'values', 'project']),
    projectMembers: _.get(state, ['editTask', 'project_members', 'memberships']),
    task: _.get(state, ['main', 'selected_task']),
    firstName: _.get(state, ['signIn', 'data', 'user', 'firstname']),
    lastName: _.get(state, ['signIn', 'data', 'user', 'lastname'])
  };
}

export default connect(
  mapStateToProps,
  {
    getProjectMembers,
    editTask,
    getAllListOfTasks
  }
)(EditTask);