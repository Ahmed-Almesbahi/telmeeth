import { StyleSheet, Dimensions, I18nManager } from 'react-native';

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
    flex: 1,
    width,
    position: 'relative'
    // position: 'absolute',
    // top: 60,
    // left: 0,
    // right: 0,
    // bottom: 0
  },
  setRangeStyle: {
    position: 'absolute',
    bottom: 30,
    right: width / 2 - 100
    // width: 300
  },
  setRangeContentStyle: {
    width: 200
  },
  search: {
    position: 'absolute',
    top: 30,
    right: width / 2 - 292 / 2
  },
  searchSuggest: {
    position: 'absolute',
    top: 78,
    right: width / 2 - 292 / 2,
    backgroundColor: 'white',
    width: 292,
    elevation: 4
  },
  searchSuggestList: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1
  },
  rangeSilderWrapper: {
    // borderWidth: 2,
    // borderColor: 'red',
    padding: 10,
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // left: 0,
    // height: 140,
    backgroundColor: 'white'
  },
  track: {
    height: 8,
    borderRadius: 4
    // borderWidth: 5
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#30a935',
    borderWidth: 2
  },
  auto: {},
  sliderContainer: {
    flex: 1,
    justifyContent: 'center'
    // flexDirection: 'row-reverse'
  }
});
