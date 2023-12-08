import { StyleSheet } from 'react-native';
import { GRAY_BACKGROUND } from '../../utils/constants';
import { themeTeacher } from '../App/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: GRAY_BACKGROUND
  },
  bodyContainer: {
    flex: 1
  },
  surface: {
    marginBottom: 10,
    elevation: 5
  },
  uniqueNo: {
    paddingVertical: 25
  },
  rowDirection: {
    // borderWidth: 1,
    // borderColor: "red",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    height: 250
  },
  counts: {
    // borderWidth: 1,
    // borderColor: "blue",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hoursText: {
    // borderWidth: 1,
    // borderColor: "blue",
    flexDirection: 'row'
  },
  registrationDate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    paddingVertical: 30
  },
  downloadContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  teacherColor: {
    color: themeTeacher.colors.primary
  }
});
