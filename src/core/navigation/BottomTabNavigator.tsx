import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import MainStackNavigator from './MainStackNavigator';
import { images, colors } from '../../constants';
import { styles } from './navigationStyles';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: colors.navigation.statusBarColor },
          tabBarIcon: () => (
            <Image source={images.homeIcon} style={styles.bottomTabIcons} />
          ),
          tabBarLabelStyle: {
            color: colors.navigation.statusBarColor,
          },
        }}>
        <Tab.Screen
          name="BottomStackHome"
          component={MainStackNavigator}
          options={{ tabBarLabel: 'Home' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
