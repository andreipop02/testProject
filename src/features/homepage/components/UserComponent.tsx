import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './userComponentStyles';

interface UserComponentProps {
  name: string;
  username: string;
  phone: string;
}

const UserComponent: React.FC<UserComponentProps> = ({
  name,
  username,
  phone,
}) => {
  return (
    <View style={styles.mainContainer} testID="user-component">
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.usernameText}>{username}</Text>
      <Text style={styles.phoneText}>{phone}</Text>
    </View>
  );
};

export default UserComponent;
