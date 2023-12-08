import { StyleSheet } from 'react-native';

// import { StyleSheet } from "react-native";
// const scale = Dimensions.get("window").width / 375;

export default StyleSheet.create({
  languageContainer: {
    // borderColor: "yellow",
    // borderWidth: 1,

    flex: 1,
    // width: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  textWhite: {
    color: 'white'
  },
  container1: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    alignItems: 'center',
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined
  },
  section1: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 250,
    height: 250
    // borderColor: "yellow",
    // borderWidth: 1
  },
  section2: {
    flex: 3,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
    // borderColor: "yellow",
    // borderWidth: 1
  },
  logo: {
    height: '100%',
    width: '100%'
  }
});
