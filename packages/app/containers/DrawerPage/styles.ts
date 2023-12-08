import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: '#4d4d4f',
    height: 250
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    marginTop: 10,
    color: 'white',
    fontSize: 12
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  loginText: {
    fontSize: 12,
    // color: RaqiColors.lightText,
    textAlign: 'center',
    marginBottom: 10
  },

  // drawer content
  drawerContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  userInfoContainer: {
    backgroundColor: '#8a8b8c',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 25 : 22,
    // paddingTop: 70,
    paddingBottom: 20,
    marginBottom: 20
  },
  teacherInfoContainer: {
    // borderWidth: 1,
    // borderColor: "red",
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  teacherStatics: {
    // borderWidth: 1,
    // borderColor: 'blue',
    // minHeight: 80,
    marginTop: 20,
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  itemContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#d9dadb',
    flexDirection: 'row'
  },
  footerButton: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 145,
    marginTop: 0,
    marginBottom: 0
  },
  userInfoContainerText: {
    color: 'white'
  },
  marginBottom10: {
    marginBottom: 10
  },
  alignCenter: {
    alignItems: 'center'
  }
});
