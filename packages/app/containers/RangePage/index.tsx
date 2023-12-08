/**
 *
 * RangePage
 *
 */

import React, { memo, useEffect, useState, useRef, forwardRef } from 'react';
import { View } from 'react-native';

// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, { makeSelectRangePage, loadRange, updateRange } from './ducks';
import { RangePageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import { Appbar, Button as Buttonx } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { Helmet } from '../../components/Helmet';
import { H2, H1, Icon, Text } from '../../components';
import MapView from 'react-native-maps';
import Marker from '../../components/Marker';
import Circle from '../../components/Circle';

import styles from './styles';
import LoadingIndicator from '../../components/LoadingIndicator';
import { themeTeacher } from '../App/themes';
import Slider from '../../components/Slider';
import _debounce from 'lodash/debounce';
import SafeAreaView from 'react-native-safe-area-view';
import { Platform } from '../../components/Platform';
import { ROUTE_SETTINGS } from '../../Router';

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

const RangePage: React.SFC<RangePageProps> = props => {
  const [radius, setRadius] = useState(1);
  const circleRef: any = useRef(null);
  const mapRef: any = useRef(null);

  // useInjectReducer({ key: 'locationPage', reducer });
  useInjectSaga({ key: 'locationPage', saga });

  useEffect(() => {
    props.loadRange();
  }, []);

  useEffect(() => {
    if (props.range.loaded) {
      setRadius(props.range.data.user_km_range);
    }
  }, [props.range.loaded]);

  const calRadius = (unitKey = 'km', radius: number) => {
    const earthRadii: any = {
      // The radius of the earth in various units
      mi: 3963.1676,
      km: 6378.1,
      ft: 20925524.9,
      mt: 6378100,
      in: 251106299,
      yd: 6975174.98,
      fa: 3487587.49,
      na: 3443.89849,
      ch: 317053.408,
      rd: 1268213.63,
      fr: 31705.3408
    };
    // Get the radius in meters (as Google requires)
    return (radius / earthRadii[unitKey]) * earthRadii['mt'];
  };

  // returns four coordinates around the circle
  const get4PointsAroundCircumference = (
    latitude: number,
    longitude: number,
    radius: number
  ) => {
    const earthRadius = 6378.1; //Km
    const lat0 = latitude + (-radius / earthRadius) * (180 / Math.PI);
    const lat1 = latitude + (radius / earthRadius) * (180 / Math.PI);
    const lng0 =
      longitude +
      ((-radius / earthRadius) * (180 / Math.PI)) /
        Math.cos((latitude * Math.PI) / 180);
    const lng1 =
      longitude +
      ((radius / earthRadius) * (180 / Math.PI)) /
        Math.cos((latitude * Math.PI) / 180);

    return [
      {
        latitude: lat0,
        longitude: longitude
      }, //bottom
      {
        latitude: latitude,
        longitude: lng0
      }, //left
      {
        latitude: lat1,
        longitude: longitude
      }, //top
      {
        latitude: latitude,
        longitude: lng1
      } //right
    ];
  };

  const onValueChange = (range: number) => {
    setRadius(range);
    if (Platform.OS === 'web') {
      mapRef.current.fitBounds(circleRef.current.getBounds());
    } else {
      const bounds = get4PointsAroundCircumference(
        props.range.data.latitude,
        props.range.data.longitude,
        radius
      );
      mapRef.current.fitToCoordinates(bounds, {
        edgePadding: DEFAULT_PADDING,
        animated: true
      });
    }
  };

  // const openDrawer: any = React.useContext(DrawerContext);

  return (
    <View style={styles.container}>
      <Helmet titleTemplate='RANGE' defaultTitle='Description of RANGE' />

      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.navigation.goBack();
          }}
          color='white'
        />
        {/* <Appbar.Action icon='menu' onPress={() => props.navigation.openDrawer()} color='white' /> */}
        <Appbar.Content
          title={<FormattedMessage {...messages.range} />}
          color='white'
        />
        <Buttonx
          uppercase={false}
          mode='text'
          theme={{ colors: { primary: 'black' } }}
          // contentStyle={styles.setRangeContentStyle}
          onPress={() => {
            props.updateRange(radius);
          }}
        >
          <Text light>
            <FormattedMessage {...messages.done} />
          </Text>
        </Buttonx>
      </Appbar.Header>

      {props.range.loading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.mapMainContainer}>
          <MapView
            // style={styles.mapContainer}
            style={{ flex: 1 }}
            onPress={() => {}}
            // zoom={14}
            onMapReady={() => {
              if (Platform.OS === 'web') {
                mapRef.current.fitBounds(circleRef.current.getBounds());
              } else {
                const bounds = get4PointsAroundCircumference(
                  props.range.data.latitude,
                  props.range.data.longitude,
                  radius
                );
                mapRef.current.fitToCoordinates(bounds, {
                  edgePadding: DEFAULT_PADDING,
                  animated: true
                });
              }
            }}
            ref={mapRef}
            region={{
              latitude: props.range.data.latitude,
              longitude: props.range.data.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            // showsMyRangeButton={true}
            // showsUserRange
            showsPointsOfInterest={false}
            // options={{
            //   clickableIcons: false,
            //   disableDefaultUI: true
            // }}
          >
            <Marker
              coordinate={{
                latitude: props.range.data.latitude,
                longitude: props.range.data.longitude
              }}
              image={require('../../images/teacher-location.png')}
            />

            <Circle
              center={{
                // @ts-ignore
                lat: props.range.data.latitude,
                // @ts-ignore
                lng: props.range.data.longitude,
                latitude: props.range.data.latitude,
                longitude: props.range.data.longitude
              }}
              // strokeWidth={1}
              strokeColor={themeTeacher.colors.primary}
              ///// fillColor={themeTeacher.colors.primary}
              fillColor={'rgba(71, 237, 26,0.5)'}
              ref={circleRef}
              // zIndex={1}
              radius={calRadius(Platform.OS === 'web' ? 'km' : 'km', radius)}
              options={{
                // meters: 'mt',
                fillColor: themeTeacher.colors.primary,
                strokeColor: themeTeacher.colors.primary,
                strokeWeight: 1
              }}
            />
          </MapView>

          <SafeAreaView
            style={{
              // flex: 1,
              backgroundColor: 'white'
            }}
            forceInset={{ top: 'never', bottom: 'always' }}
          >
            <View style={styles.rangeSilderWrapper}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5
                }}
              >
                <Icon name='pin-drop' size={30} color='gray' />
                <Text>
                  {radius}
                  <FormattedMessage {...messages.KG} />
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <View style={[styles.auto, styles.sliderContainer]}>
                  <Slider
                    // inverted
                    // style={{ flexDirection: 'row-reverse' }}
                    value={radius}
                    minimumValue={1}
                    maximumValue={15}
                    step={1}
                    trackStyle={styles.track}
                    thumbStyle={styles.thumb}
                    minimumTrackTintColor='#30a935'
                    onValueChange={onValueChange}
                    // inverted={true}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <H1>15</H1>
                  <Text>
                    <FormattedMessage {...messages.KG} />
                  </Text>
                </View>
              </View>

              <H2>{props.range.data.address}</H2>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  range: makeSelectRangePage()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadRange: () => dispatch(loadRange()),
    updateRange: (data: any) => dispatch(updateRange(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(RangePage);
