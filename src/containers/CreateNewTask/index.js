import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import CreateNewTaskForm from './CreateNewTaskForm';
import { getProjectsFromList } from '../Main/utils';
import { getProjectMembers, createNewTask } from './actions';
import { getAllListOfTasks } from '../Main/actions';

class CreateNewTask extends React.Component {
  static navigationOptions = {
    title: 'Create new task',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff'
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit = (values) => {
    const { createNewTask: _createNewTask, getAllListOfTasks: _getAllListOfTasks } = this.props;
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
    _createNewTask(parsedValues);
    _getAllListOfTasks();
    navigate('TaskDetails');
  }

  render() {
    const { all_tasks, getProjectMembers, projectMembers } = this.props;
    const { navigate } = this.props.navigation;
    const projects = (all_tasks && getProjectsFromList(all_tasks)) || [];
    return (
      <ScrollView>
          <CreateNewTaskForm
            projects={projects}
            getMembers={getProjectMembers}
            projectMembers={projectMembers}
            onSubmit={this.onSubmit}
            goTo={navigate}
          />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    all_tasks: _.get(state, ['main', 'all_tasks_list', 'issues']),
    selectedProject: _.get(state, ['form', 'createTaskFrom', 'values', 'project']),
    projectMembers: _.get(state, ['createNewTask', 'project_members', 'memberships'])
  };
}

export default connect(
  mapStateToProps,
  {
    getProjectMembers,
    createNewTask,
    getAllListOfTasks
  }
)(CreateNewTask);