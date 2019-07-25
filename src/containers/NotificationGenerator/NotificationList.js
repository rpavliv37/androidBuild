import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteNotification } from './actions';
import Notification from './Notification';
import { Block } from 'galio-framework';

/**
 * Renders list of notifications
 * @memberof module:Notification
 */
const NotificationList = ({ messages, deleteNotification: deleteNotificationFromProps }) => {
  const notifications = messages.map((message) => (
    <Notification key={message.id} message={message} deleteNotification={deleteNotificationFromProps} />
  ));
  return (
    <View style={{flex:1}}>
        <View style={{borderWidth:1,position:'absolute',bottom:0,alignSelf:'flex-end'}}>
          {notifications}
        </View>
    </View>
  );
};

NotificationList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteNotification: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.notifiactions
  };
}

export default connect(mapStateToProps, {
  deleteNotification
})(NotificationList);
