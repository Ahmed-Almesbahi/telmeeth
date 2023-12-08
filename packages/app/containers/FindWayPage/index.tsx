/**
 *
 * FindWayPage
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';

// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, {
  makeSelectFindWayPage,
  updateOnMyWay,
  updateUserLocation
} from './ducks';
import { FindWayPageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import { Appbar } from 'react-native-paper';
import { Helmet } from '../../components/Helmet';

import styles from './styles';
import { ROUTE_HOME_TEACHER } from '../../Router';
import MapView from 'react-native-maps';
import Marker from '../../components/Marker';
import Pulse from '../../components/Pulse';
import { OverlayView } from 'react-google-maps';
import _toString from 'lodash/toString';
import { themeTeacher, themeStudent } from '../App/themes';
import { makeSelectHomeTeacherLesson } from '../HomeTeacherPage/ducks';
import { Button } from '../../components';
import { Platform } from '../../components/Platform';
import { DEFAULT_MAP_PADDING } from '../../utils/constants';
import Geolocation from '@react-native-community/geolocation';

const FindWayPage = (props: FindWayPageProps) => {
  const [state, setState] = useState({
    latitude: 0,
    longitude: 0
  });
  const mapRef: any = useRef(null);
  // useInjectReducer({ key: 'findWayPage', reducer });
  useInjectSaga({ key: 'findWayPage', saga });

  ///updateUserLocation

  useEffect(() => {
    // WillMount

    // register run limit for updating location
    // _runGeoLocationUpdate = _debounce(data => {
    //   onGeoLocationUpdate(data);
    // }, 3000);

    // DidMount

    let _isMounted = true;
    // This handler fires whenever bgGeo receives a location update.
    // if (
    //   typeof global.geo !== 'undefined' &&
    //   state.initialPosition == 'unknown'
    // ) {
    //   props.onGeoLocationComplete({
    //     latitude: floorFigure(global.geo.coords.latitude),
    //     longitude: floorFigure(global.geo.coords.longitude)
    //   });
    //   setState({ ...state, initialPosition: global.geo });
    // } else {
    Geolocation.getCurrentPosition(
      position => {
        // console.log('position', position);
        //  //console.log('initialPosition',position.coords);

        // update client request initial location
        // if (state.initialPosition == 'unknown') {
        // props.onGeoLocationComplete({
        //   latitude: floorFigure(position.coords.latitude),
        //   longitude: floorFigure(position.coords.longitude)
        // });

        setState({
          ...state,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        // }
      },
      error => {
        // if (lastPosition == 'unknown') {
        // console.log("Seems like you have not started your location service. Please enable GPS")
        // Alert.alert(
        //   'No GPS',
        //   'Seems like you have not started your location service. Please enable GPS'
        // );
        // }
        console.warn('No GPS', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // watchID = Geolocation.watchPosition(position => {
    //   //  console.log('watch',position.coords);
    //   lastPosition = position;

    //   // update client request initial location
    //   if (state.initialPosition == 'unknown') {
    //     props.onGeoLocationComplete({
    //       latitude: floorFigure(position.coords.latitude),
    //       longitude: floorFigure(position.coords.longitude)
    //     });
    //     setState({ ...state, initialPosition: position });
    //   } else {
    //     _runGeoLocationUpdate(position);
    //   }
    // });
  }, []);

  const getPixelPositionOffset = (width: number, height: number) => ({
    x: -(width / 2),
    y: -(height / 2)
  });

  const openGoogleDirection = (scoordinate: string, ecoordinate: string) => {
    if (Platform.OS == 'ios') {
      var urlLocation = `http://maps.apple.com/?saddr=${scoordinate}&daddr=${ecoordinate}`;
    } else {
      var urlLocation = `https://www.google.com/maps/dir/${scoordinate}/${ecoordinate}`;
    }
    Linking.canOpenURL(urlLocation).then(supported => {
      if (supported) {
        Linking.openURL(urlLocation);
      } else {
        console.log("Don't know how to open");
      }
    });
  };

  console.log('xxx', props);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.navigation.navigate('HomeTeacher');
          }}
          color='white'
        />

        <Appbar.Content
          title={<FormattedMessage {...messages.findWay} />}
          color='white'
        />
      </Appbar.Header>
      <Helmet titleTemplate='FIND WAY' defaultTitle='Description of FIND WAY' />

      {/* <ScrollView style={styles.bodyContainer}> */}
      <View style={styles.mapMainContainer}>
        <MapView
          // style={styles.mapContainer}
          style={{ flex: 1 }}
          // TODO: We need to check here if lat & lng is number and is not string
          initialRegion={{
            // latitude: parseFloat(props.lesson.latitude),
            latitude: props.lesson.latitude,
            // longitude: parseFloat(props.lesson.longitude),
            longitude: props.lesson.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onMapReady={() => {
            if (Platform.OS === 'web') {
              // mapRef.current.fitBounds(circleRef.current.getBounds());
            } else {
              // const bounds = get4PointsAroundCircumference(
              //   props.range.data.latitude,
              //   props.range.data.longitude,
              //   radius
              // );
              console.log('gong');
              mapRef.current.fitToSuppliedMarkers(['Marker1', 'Marker2'], {
                edgePadding: DEFAULT_MAP_PADDING,
                animated: true
              });
            }
          }}
          ref={mapRef}
          showsMyLocationButton={false}
          showsUserLocation={false}
        >
          {Platform.OS === 'web' ? (
            <OverlayView
              position={{
                lat: props.lesson.latitude,
                lng: props.lesson.longitude
              }}
              mapPaneName={OverlayView.OVERLAY_LAYER}
              getPixelPositionOffset={getPixelPositionOffset}
            >
              <Pulse
                color={themeStudent.colors.primary}
                numPulses={1}
                diameter={50}
                speed={40}
                duration={5000}
              />
            </OverlayView>
          ) : null}
          <Marker
            identifier='Marker1'
            coordinate={{
              latitude: props.lesson.latitude,
              // latitude: parseFloat(props.lesson.latitude),
              longitude: props.lesson.longitude
              // longitude: parseFloat(props.lesson.longitude)
            }}
            image={require('../../images/student-location.png')}
            // label={_toString(props.homeStudent.teachers.length)}
          />
          {state.longitude > 0 && state.latitude > 0 ? (
            <Marker
              identifier='Marker2'
              coordinate={{
                latitude: state.latitude,
                longitude: state.longitude
              }}
              image={require('../../images/teacher-location.png')}
              // label={_toString(props.homeStudent.teachers.length)}
            />
          ) : null}
        </MapView>

        <Button
          uppercase={false}
          style={styles.onMyWay}
          contentStyle={styles.bookYourLessonContent}
          onPress={() => {
            props.updateOnMyWay(
              props.lesson.student_id,
              props.lesson.lesson_id
            );
            // props.setHomeStudentOption('step', 2);
          }}
        >
          <FormattedMessage {...messages.imOnMyWay} />
        </Button>
        <Button
          uppercase={false}
          style={styles.viewDirection}
          contentStyle={styles.bookYourLessonContent}
          onPress={() => {
            openGoogleDirection(
              state.latitude + ',' + state.longitude,
              props.lesson.latitude + ',' + props.lesson.longitude
            );
            // props.setHomeStudentOption('step', 2);
          }}
        >
          <FormattedMessage {...messages.viewDirection} />
        </Button>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  findWay: makeSelectFindWayPage(),
  lesson: makeSelectHomeTeacherLesson()
});

function mapDispatchToProps(dispatch: any) {
  return {
    updateUserLocation: (current_latitude: number, current_longitude: number) =>
      dispatch(updateUserLocation(current_latitude, current_longitude)),
    updateOnMyWay: (recipient_id: number, lesson_id: number) =>
      dispatch(updateOnMyWay(recipient_id, lesson_id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(FindWayPage);
