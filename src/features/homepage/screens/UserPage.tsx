import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {styles} from './userPageStyles';
import {useUsersContext} from '../../../context/UsersContext';
import {strings} from '../../../constants';

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  const {users, defaultUserId} = useUsersContext();
  const navigation = useNavigation();

  const switchUser = (goForward: boolean) => {
    if (goForward) setCurrentUserIndex(prevState => prevState + 1);
    else {
      setCurrentUserIndex(prevState => prevState - 1);
    }
  };

  useEffect(() => {
    const findDefaultUser = () => {
      const defaultUserIndex = users.findIndex(
        user => user.id === defaultUserId,
      );
      setCurrentUserIndex(defaultUserIndex);
    };

    findDefaultUser();
  }, []);

  useEffect(() => {
    navigation.setOptions({title: users[currentUserIndex].name});
  }, [currentUserIndex]);

  return (
    <View style={{flex: 1}}>
      <Text style={styles.textStyle}>
        {strings.userPage.username} {users[currentUserIndex].username}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => switchUser(false)}
          disabled={currentUserIndex === 0}>
          <Text
            style={
              currentUserIndex === 0
                ? styles.inactiveButtonText
                : styles.activeButtonText
            }>
            {strings.userPage.prevButton}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => switchUser(true)}
          disabled={currentUserIndex === users.length - 1}>
          <Text
            style={
              currentUserIndex === users.length - 1
                ? styles.inactiveButtonText
                : styles.activeButtonText
            }>
            {strings.userPage.nextButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserPage;
