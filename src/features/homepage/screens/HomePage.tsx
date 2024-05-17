import React, {useCallback} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import UserComponent from '../components/UserComponent';
import {styles} from './homePageStyles';
import {User, images, strings} from '../../../constants/';
import {useUsersContext} from '../../../context/UsersContext';
import {RootStackParamList} from '../../../core/navigation/MainStackNavigator';

interface HomeScreenProps {}

const HomePage: React.FC<HomeScreenProps> = () => {
  const {users, setDefaultUserId} = useUsersContext();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderUserList = useCallback(
    ({user}: {user: User}) => {
      return (
        <TouchableOpacity
          style={styles.userComponentTouchable}
          onPress={() => {
            setDefaultUserId(user.id);
            navigation.navigate('User', {title: user.name});
          }}>
          <UserComponent
            name={user.name}
            username={user.username}
            phone={user.phone}
          />
        </TouchableOpacity>
      );
    },
    [users],
  );

  return (
    <View style={styles.mainContainer}>
      <Image source={images.waveHeader} style={styles.waveHeader} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{strings.homepage.screenTitle}</Text>
      </View>
      <FlatList
        style={styles.usersListUpperContainer}
        numColumns={2}
        contentContainerStyle={styles.usersListInnerContainer}
        data={users}
        renderItem={({item}: {item: User}) => renderUserList({user: item})}
      />
    </View>
  );
};

export default HomePage;
