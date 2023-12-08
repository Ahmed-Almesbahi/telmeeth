import { StyleSheet } from 'react-native';
import { GRAY_BACKGROUND } from '../../utils/constants';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    flex: 1,
    // paddingHorizontal: 10,
    paddingTop: 6
  },
  surfaceContainer: {
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    marginBottom: 0
  }
});
