import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomePage, UserPage} from '../../features/homepage/screens/';
import {colors} from '../../constants/';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: {} | undefined;
  User: {title: string} | undefined;
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.navigation.statusBarColor},
        headerTintColor: colors.navigation.headerTintColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleStyle: {fontSize: 15},
      }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen
        name="User"
        component={UserPage}
        options={({route}) => ({
          title: route?.params?.title,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
