import { StyleSheet } from 'react-native';
import { colors } from '../../../constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.homepage.background,
  },

  waveHeader: {
    flex: 0.1,
    width: '100%',
  },

  titleContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.homepage.titleText,
  },

  userComponentTouchable: {
    width: '45%',
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },

  usersListUpperContainer: {
    flex: 0.8,
  },

  usersListInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
