import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20
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
  mapMainContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    width,
    position: 'relative'
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0
  },
  onMyWay: {
    position: 'absolute',
    bottom: 80,
    right: width / 2 - 100
    // width: 300
  },
  viewDirection: {
    position: 'absolute',
    bottom: 30,
    right: width / 2 - 100
    // width: 300
  },
  bookYourLessonContent: {
    width: 200
  }
});
