import React from 'react';
import { View, Text, Image } from 'react-native';
// import MapView from 'react-native-maps';

import styles from './styles';
import { MapProps } from './types';
import { OverlayView } from 'react-google-maps';
import { themeStudent } from '../../App/themes';
import Pulse from '../../../components/Pulse';
import { List } from 'react-native-paper';
import _toString from 'lodash/toString';
import { Button, H1 } from '../../../components';
import { Platform } from '../../../components/Platform';
import Marker from '../../../components/Marker';
import MapView from './Maps';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';

const Map: React.SFC<MapProps> = props => {
  const getPixelPositionOffset = (width: number, height: number) => ({
    x: -(width / 2),
    y: -(height / 2)
  });
  return (
    <View style={styles.mapContent}>
      <View style={styles.mapMainContainer}>
        <MapView user={props.user}>
          {/* <OverlayView
            position={{
              lat: props.user.latitude,
              lng: props.user.longitude
            }}

            mapPaneName={OverlayView.OVERLAY_LAYER}

            getPixelPositionOffset={getPixelPositionOffset}
  
          >
            <Pulse
              color={themeStudent.colors.primary}
              numPulses={2}
              diameter={150}
              speed={20}
              duration={2000}
            />
          </OverlayView> */}
          <Marker
            coordinate={{
              latitude: props.user.latitude,
              longitude: props.user.longitude
            }}
            // centerOffset={{ y: -27, x: 0 }}
            // image={
            //   Platform.OS === 'web'
            //     ? {
            //         scaledSize: new google.maps.Size(51, 60),
            //         origin: new google.maps.Point(0, 0),
            //         anchor: new google.maps.Point(51 / 2, 60),
            //         labelOrigin: new google.maps.Point(51 / 2, 24),
            //         url: require('../../../images/circle-pin.png')
            //       }
            //     : require('../../../images/circle-pin.png')
            // }
            // image={require('../../images/circle-pin.png')}
            label={_toString(props.homeStudent.teachers.length)}
          >
            <View
              style={{
                // paddingHorizontal: 13,
                // paddingTop: 8,
                position: 'relative'
              }}
            >
              <Image
                source={require('../../../images/circle-pin.png')}
                style={{ width: 70, height: 83, marginBottom: 44 }}
              />
              <View
                style={{
                  position: 'absolute',

                  top: 22,
                  left: 28
                }}
              >
                <H1>{_toString(props.homeStudent.teachers.length)}</H1>
              </View>
            </View>
          </Marker>
        </MapView>

        {props.homeStudent.teachers.length > 0 ? (
          <Button
            uppercase={false}
            style={styles.bookYourLesson}
            contentStyle={styles.bookYourLessonContent}
            onPress={() => {
              props.setHomeStudentOption('step', 2);
            }}
          >
            <FormattedMessage {...messages.bookYourLesson} />
          </Button>
        ) : null}

        {props.homeStudent.subjects.length > 0 &&
        props.homeStudent.openSubjectMenu ? (
          <View style={styles.subjectsList}>
            {props.homeStudent.subjects.map((d: any) => (
              <List.Item
                key={d.item_id}
                title={props.language === 'ar' ? d.name_ar : d.name}
                onPress={() => {
                  if (props.selectSubject) {
                    props.selectSubject(d);
                  }
                  if (props.loadHomeTeachers) {
                    props.loadHomeTeachers(
                      props.homeStudent.tab,
                      d.item_id,
                      props.user.user_student_id,
                      props.homeStudent.student_count
                    );
                  }
                }}
              />
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Map;
