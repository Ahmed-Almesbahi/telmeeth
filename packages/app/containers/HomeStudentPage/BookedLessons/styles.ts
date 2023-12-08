import { StyleSheet, Dimensions, Platform } from 'react-native';
import { GRAY_BACKGROUND } from '../../../utils/constants';
import { themeStudent } from '../../App/themes';
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
  },

  BookedLessonContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 10,
    marginVertical: 10,
    marginRight: 10,
    // padding: 5,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    elevation: 2
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  teachingType: {
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomBar: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  }
});
