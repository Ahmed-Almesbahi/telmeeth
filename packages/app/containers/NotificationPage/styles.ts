import { StyleSheet } from 'react-native';
import { GRAY_BACKGROUND } from '../../utils/constants';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: GRAY_BACKGROUND
  },
  bodyContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
    flex: 1,
    paddingTop: 10
    // paddingHorizontal: 10,
    // paddingVertical: 20
  },
  action: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
