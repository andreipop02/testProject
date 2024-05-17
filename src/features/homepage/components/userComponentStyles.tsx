import { StyleSheet } from 'react-native';
import { colors } from '../../../constants';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.homepage.userComponentBackground,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    rowGap: 10,
  },
  nameText: {
    color: colors.homepage.userDetailsText,
    fontWeight: '600',
    fontSize: 14,
  },
  usernameText: {
    color: colors.homepage.userDetailsText,
    fontWeight: '600',
    fontSize: 13,
  },
  phoneText: {
    color: colors.homepage.userDetailsText,
    fontWeight: '600',
    fontSize: 11,
  },
});
