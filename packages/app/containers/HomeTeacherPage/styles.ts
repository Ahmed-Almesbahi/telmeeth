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
    // borderColor: "red",
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  surface: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3
  },
  lessonNotStartedContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 10,
    // padding: 5,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    elevation: 2
  },
  lessonNotStartedSelectedContainer: {
    backgroundColor: '#889185',
    borderRadius: 5,
    paddingTop: 10,
    // padding: 5,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    elevation: 2,
    marginBottom: 10
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  playContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  playView: {
    // borderWidth: 1,
    // borderColor: "red",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  increamentButton: {
    marginHorizontal: 5,
    // borderWidth: 1,
    // borderColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
    width: 26,
    minWidth: 26
  },
  increamentButtonContent: {
    // borderWidth: 1,
    // borderColor: "blue",
    width: 26
  },
  teachingType: {
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  teachingTypeSelected: {
    backgroundColor: '#9ca49a',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  studentCount: {
    backgroundColor: '#70D942',
    // padding: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  bottomBar: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  bottomBarSelected: {
    backgroundColor: '#A3A9A0',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  startedInformation: {
    alignItems: 'center',
    marginBottom: 20
  }
});
