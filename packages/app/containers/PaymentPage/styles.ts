import { StyleSheet } from 'react-native';
import { GRAY_BACKGROUND } from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: GRAY_BACKGROUND
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  surface: {
    marginBottom: 10,
    backgroundColor: 'white',
    // height: 80,
    // width: 80,
    // alignItems: 'center',
    // justifyContent: 'center',
    elevation: 1
  },
  flexDirectionRow: {
    flex: 1,
    flexDirection: 'row'
  },
  flex1: {
    flex: 1,
    alignItems: 'center'
  }
});
