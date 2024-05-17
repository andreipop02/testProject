import {StyleSheet} from 'react-native';
import { colors } from '../../../constants';

export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.userPage.username,
    marginTop: 10,
    marginLeft: 10,
  },

  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
  },
  activeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.userPage.buttonsText,
  },
  inactiveButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.userPage.buttonsText,
    opacity: 0,
  },
});
