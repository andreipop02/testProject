import React from 'react';
import {StatusBar, View} from 'react-native';

import BottomTabNavigator from './src/core/navigation/BottomTabNavigator';
import {UsersProvider} from './src/context/UsersContext';
import {styles} from './appStyles';
import {colors} from './src/constants/';

const App = (): React.JSX.Element => {
  return (
    <UsersProvider>
      <View style={styles.mainContainerStyles}>
        <StatusBar
          backgroundColor={colors.navigation.statusBarColor}
          barStyle={'dark-content'}
        />
        <BottomTabNavigator />
      </View>
    </UsersProvider>
  );
};

export default App;
