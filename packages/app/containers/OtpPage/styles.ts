// import t from 'react-native-i18n';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  //containers
  //Screen background
  containerBackground: {
    // borderColor: "blue",
    // borderWidth: 1,

    flex: 1,
    backgroundColor: 'transparent',
    width: undefined,
    height: undefined
  },
  mainContainer: {
    // borderColor: "red",
    // borderWidth: 1,

    flex: 1,
    //  paddingVertical: 26,
    marginHorizontal: 20,
    marginVertical: 20
  },
  logoContainer: {
    // borderColor: "yellow",
    // borderWidth: 1,

    //  flex: 13,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end'

    //  width:300,
  },
  formContainer: {
    // borderColor: "yellow",
    // borderWidth: 1,

    flex: 3
  },

  termsContainer: {
    // borderColor: "yellow",
    // borderWidth: 1,

    flex: 2,
    // width: 100,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textWhite: {
    color: 'white'
  },
  icon: {
    //  borderColor:'yellow',
    //  borderWidth:1,
    width: 30,
    height: 30
  },

  //screen pattren
  container2: {
    flex: 1,
    backgroundColor: 'transparent',
    width: undefined,
    height: undefined
    // borderColor:'red',
    // borderWidth:1
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255,0.8)'
  },

  label: {
    color: 'white',
    lineHeight: 20
  },

  character: {
    flex: 1
  },
  h1: {
    backgroundColor: 'white',
    borderColor: '#d7df23',
    // paddingHorizontal:30,
    // paddingVertical:5,
    borderRightWidth: 4,
    borderLeftWidth: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    height: 30,
    flex: 8,
    // marginTop:-15,
    alignItems: 'center'
  },
  belowTextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxHeading: {
    position: 'absolute',
    top: 0,
    left: 10
  },
  buttonWrapper: {
    // borderColor: "red",
    // borderWidth: 1,

    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 50
  },
  loginButtonContent: {
    height: 40,
    width: 150
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  flexDirectionRowReverse: {
    flexDirection: 'row-reverse',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    width: 60,
    height: 60,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  }
});
