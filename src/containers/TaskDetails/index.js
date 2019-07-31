import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Button, Block, Text } from 'galio-framework';
import { watchTask } from './actions';

class TaskDetails extends React.Component {
  static navigationOptions = {
    title: 'TaskDetails',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff'
  };
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { task, navigation: { navigate }, watchTask: _watchTask } = this.props;
    return (
      <React.Fragment>
        <ScrollView>
          {task &&
            (<Block
              style={{
                backgroundColor: '#fff',
                flex: 1,
                paddingLeft: 20,
                paddingRight: 20,
                marginBottom: 10
              }}
            >
              <Block
                borderWidth={1}
                style={{
                  backgroundColor: '#6c757c',
                  borderColor: 'rgba(0, 0, 0, 0.125)',
                  borderRadius: 20,
                  marginBottom: 15,
                  marginTop: 15
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
                {(task.description !== '') &&
                  (<Block
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
                      Description: {task.description}
                    </Text>
                  </Block>)}
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
                    Start Date: {new Date(task.start_date).toDateString()}
                  </Text>
                </Block>
              </Block>
              <Block
                row
                space='between'
                style={{
                  paddingTop: 10
                }}
              >
                <Button
                  radius={27}
                  shadowColor
                  color='info'
                  icon='pluscircle'
                  iconFamily='AntDesign'
                  iconColor='white'
                  style={{
                    width: 150
                  }}
                  iconSize={15}
                  iconColor='white'
                  onPress={() => navigate('EditTask')}
                >
                  Edit
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
                  onPress={() => navigate('LogTime')}
                >
                  Log Time
					      </Button>
                {/* <Button
                radius={27}
                shadowColor
                color='warning'
                icon='pluscircle'
                iconFamily='AntDesign'
                iconColor='white'
                style={{
                  width: 100
                }}
                onPress={() => _watchTask()}
                >
                Watch
					      </Button> */}
              </Block>
            </Block>)}
        </ScrollView>
      </React.Fragment>
    );
  }
}


function mapStateToProps(state) {
  return {
    task: _.get(state, ['main', 'selected_task'])
  };
}

export default connect(
  mapStateToProps,
  {
    watchTask
  }
)(TaskDetails);