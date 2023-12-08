import { StyleSheet } from 'react-native';
import { themeTeacher } from '../App/themes';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    flex: 1
    // paddingHorizontal: 10,
    // paddingTop: 20
  },
  textInput: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: 'transparent'
  },
  errorText: {
    marginBottom: 10,
    color: 'red'
  },
  contentStyleButton: {
    width: '100%',
    height: 45
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  buttonContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  font11Gray: {
    fontSize: 11,
    color: 'gray',
    marginHorizontal: 5
  },
  font11Primary: {
    fontSize: 11,
    color: themeTeacher.colors.primary,
    marginHorizontal: 5
  }
});
