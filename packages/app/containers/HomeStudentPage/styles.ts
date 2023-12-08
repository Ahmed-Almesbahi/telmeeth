import { StyleSheet, Dimensions, Platform } from 'react-native';
import { GRAY_BACKGROUND } from '../../utils/constants';
import { themeStudent } from '../App/themes';
const { width, height } = Dimensions.get('window');
const headerHeight = Platform.OS === 'ios' ? 64 : 81;

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
  secondBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: 'white',
    borderTopWidth: 1,
    backgroundColor: themeStudent.colors.primary
  },
  thirdBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  groupButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapContent: {
    flex: 1
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  mapMainContainer: {
    flex: 1,
    width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  mapCcontainer: {
    flex: 1,
    width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 39,
    height: 90,
    position: 'absolute',
    left: width / 2 - 20, // 20 is the half width of marker
    bottom: (height - (headerHeight + 63)) / 2

    //  borderWidth:1,
    //  borderColor:'red',
  },
  imageMarker: {
    width: 39,
    height: 53
  },
  subjectsList: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  arrow: {
    position: 'absolute',
    bottom: -17,
    right: '40%'
  },
  bookYourLesson: {
    position: 'absolute',
    bottom: 30,
    right: width / 2 - 100
    // width: 300
  },
  bookYourLessonContent: {
    width: 200
  },
  teacherListRightWrapper: {
    //borderWidth: 1,
    //borderColor: 'white',
    width: '100%',
    flex: 1,
    flexDirection: 'row'
  }
});
