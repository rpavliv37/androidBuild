import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import shortid from 'shortid';
import {Picker, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import Expand from 'react-native-simple-expand';
import { calcSpentTime, getStatusesFromList, getProjectsFromList, filterTasks } from './utils';
import { Button, Block, Text, Icon } from 'galio-framework';
import { getTodaySpentTime, getAllListOfTasks, getSelectedTask, saveAllListOfTasks } from './actions';
import { logOut } from '../SignIn/actions';

class Main extends React.Component {
	static navigationOptions = {
		headerLeft: null,
		header: null
  };
  constructor(props) {
    super(props);
		this.state = {
			project: undefined,
			status: undefined
    }
	}

	componentDidMount() {
		this.didFocusSubscription = this.props.navigation.addListener(
			'didFocus',
			() => {
				this.props.getAllListOfTasks();
				this.props.getTodaySpentTime();
				BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
			}
		);
		const didBlurSubscription = this.props.navigation.addListener(
			'didBlur',
			() => {
				this.props.saveAllListOfTasks({})
				BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
			}
		);
	}

	componentWillUnmount() {
		this.didFocusSubscription.remove();
		this.didBlurSubscription.remove();
}

handleBackButton = () => true; // disable back button

	handleOnChangeProjectPicker = (itemValue) => {
		this.setState({project: itemValue})
	}
	handleOnChangeStatusPicker = (itemValue) => {
		this.setState({status: itemValue})
	}

	handleOnLogout = () => {
		this.props.navigation.navigate('SignIn');
		this.props.logOut();
	}

	render() {
		const { all_tasks, navigation, spent_time, getSelectedTask } = this.props;
		const statuses = (all_tasks && getStatusesFromList(all_tasks)) || [];
		const projects = (all_tasks && getProjectsFromList(all_tasks)) || [];
    return (
			<React.Fragment>
					<Block
						row
						space='between'
						middle
						style={{
							paddingLeft: 20,
							paddingRight: 20,
							backgroundColor: 'black',
							height: 56
						}}
					>
						<Text
							color='white'
							style={{
								fontSize: 20,
								fontWeight: '500'
							}}
						>
							Today spent time: { spent_time && calcSpentTime(spent_time)}h
						</Text>
						<TouchableOpacity
							onPress={() => this.handleOnLogout()}
						>
							<Icon name="exit-to-app" family="Ionicons" color='#fff' size={40} />
						</TouchableOpacity>
					</Block>
					<ScrollView>
				<Block
					style={{
						backgroundColor: '#fff',
						flex: 1,
						paddingLeft: 20,
						paddingRight: 20
					}}
				>
					<Block
						style={{
							paddingTop: 10
						}}
					>
					<TouchableOpacity
						onPress={() => {
							this.setState({ open: !this.state.open })
						}}
					>
						<Block
							row
							style={{
								justifyContent: 'flex-start',
								alignItems: 'center'
							}}
						>
							<Icon name={this.state.open ? "caretdown" : "caretright"} family="AntDesign" color='blue' size={14} />
							<Text
								h5
								bold
							>
								Filters
							</Text>
						</Block>
					</TouchableOpacity>
						<Expand value={this.state.open}>
							<Picker
								selectedValue={this.state.project}
								style={{height: 50, width: 'auto'}}
								onValueChange={this.handleOnChangeProjectPicker}
							>
								<Picker.Item label="All" value={undefined} />
								{projects && projects.map((project) => 
									<Picker.Item label={project.name} value={project.name} key={shortid.generate()}/>
								)}
						</Picker>
						<Picker
								selectedValue={this.state.status}
								style={{height: 50, width: 'auto'}}
								onValueChange={this.handleOnChangeStatusPicker}
							>
								<Picker.Item label="All" value={undefined} />
								{statuses && statuses.map((status) => 
									<Picker.Item label={status.name} value={status.name} key={shortid.generate()}/>
								)}
							</Picker>
						</Expand>
					</Block>
					<Block
						right
						style={{
							marginBottom: 10,
							marginTop: 10
						}}
					>
						<Button
							radius={27}
							shadowColor
							color='info'
							icon='pluscircle'
							iconFamily='AntDesign'
							iconColor='white'
							size='small'
							onPress={() => navigation.navigate('CreateNewTask')}
						>
							Add new Issue
						</Button>
					</Block>
					{all_tasks ? filterTasks(all_tasks, this.state.project, this.state.status).map((task) => (
					<TouchableOpacity
						onPress={() => {
							getSelectedTask(task);
							navigation.navigate('TaskDetails');
						}}
						activeOpacity={.7}
						key={shortid.generate()}
					>
					<Block
						borderWidth={1}
						style={{
							backgroundColor: '#6c757c',
							borderColor: 'rgba(0, 0, 0, 0.125)',
							borderRadius: 20,
							marginBottom: 15
						}}
					>
							<Block
								row
								space='between'
								style={{
									paddingTop: 12,
									paddingBottom: 12,
									paddingLeft: 20,
									paddingRight: 20,
									backgroundColor: '#677178',
									borderBottomWidth: 1,
									borderTopLeftRadius: 20,
									borderTopRightRadius: 20,
									borderBottomColor: 'rgba(0, 0, 0, 0.125)'
								}}
							>
								<Text
									h5
									style={{
										paddingBottom: 5,
										color: 'white'
									}}
								>
									{`${task.tracker.name} #${task.id}`} 
								</Text>
								<Text
									h5
									style={{
										paddingBottom: 5,
										color: 'white'
									}}
								>
									{task.project.name} 
								</Text>
							</Block>
							<Block
								row
								space='between'
								style={{
									paddingTop: 12,
									paddingBottom: 12,
									paddingLeft: 20,
									paddingRight: 20
								}}
							>
								<Text
									color='white'
								>
									Status: {task.status.name}
								</Text>
								<Text
									color='white'
								>
									Priority: {task.priority.name}
								</Text>
							</Block>
							<Block
								style={{
									paddingTop: 12,
									paddingBottom: 12,
									paddingLeft: 20,
									paddingRight: 20
								}}
							>
								<Text
									color='white'
								>
									{task.subject}
								</Text>
							</Block>
							<Block
								row
								space='between'
								style={{
									paddingTop: 12,
									paddingBottom: 12,
									paddingLeft: 20,
									paddingRight: 20
								}}
							>
								<Text
									color='white'
								>
									Updated: {new Date(task.updated_on).toDateString()}
								</Text>
							</Block>
					</Block>
					</TouchableOpacity>
					)) : (
						null
					)}
			</Block>
			</ScrollView>
			</React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
		all_tasks: _.get(state, ['main', 'all_tasks_list', 'issues']),
		spent_time: _.get(state, ['main', 'spent_time'])
  };
}

export default connect(
  mapStateToProps,
  {
		getAllListOfTasks,
		getTodaySpentTime,
		getSelectedTask,
		logOut,
		saveAllListOfTasks
  }
)(Main);