import React, { useState } from 'react';
import { View, Linking } from 'react-native';
import {
  Button,
  Surface,
  Paragraph,
  Dialog,
  Portal,
  TouchableRipple,
  IconButton
} from 'react-native-paper';
import {
  MaterialCommunityIcons,
  H2,
  Small,
  XSmall,
  H1
} from '../../components';
import styles from './styles';
import { LessonNotStartedType } from './types';
import { ROUTE_FIND_WAY } from '../../Router';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

const LessonNotStarted: React.SFC<LessonNotStartedType> = props => {
  const [dialog, setDialog] = useState(false);

  const _showDialog = () => setDialog(true);

  const _hideDialog = () => setDialog(false);

  const openURL = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  const { data } = props;

  return (
    <>
      <TouchableRipple
        style={{ marginBottom: 10, borderRadius: 5 }}
        onPress={() => {
          props.selectLesson(data);
        }}
        rippleColor='rgba(0, 0, 0, .32)'
      >
        <Surface style={styles.lessonNotStartedContainer}>
          <View style={[styles.flexDirectionRow, { paddingHorizontal: 10 }]}>
            <View style={styles.teachingType}>
              <Small dark>{data.teaching_location}</Small>
            </View>
            <View style={styles.flexDirectionRow}>
              <MaterialCommunityIcons
                name='account'
                size={20}
                color='#B3B7AF'
              />
              <H2 gray>{data.number_of_students}</H2>
            </View>
          </View>

          <View
            style={[
              styles.flexDirectionRow,
              { marginHorizontal: 10, marginBottom: 10, marginTop: 30 }
            ]}
          >
            <View>
              <H1 dark style={{ marginBottom: 10 }}>
                {props.language === 'ar' ? data.name_ar : data.name}
              </H1>
              <Small dark>
                <FormattedMessage {...messages.lesson} /> - 1
              </Small>
              {/* <Small style={{ color: '#B3B7AF', marginHorizontal: 5 }}>
            {data.start} - {data.end}
          </Small> */}
            </View>
            <View
              style={{
                justifyContent: 'flex-end'
              }}
            >
              <Small
                style={{
                  color: '#E9AE30',
                  marginHorizontal: 5
                }}
              >
                <MaterialCommunityIcons
                  name='clock-outline'
                  size={15}
                  color='#B3B7AF'
                />
                {data.start} - {data.end}
              </Small>
            </View>
          </View>

          <View style={[styles.flexDirectionRow, styles.bottomBar]}>
            <IconButton
              onPress={() => {
                props.selectLesson(data);
                // props.push(ROUTE_FIND_WAY);
                props.navigation.push('FindWay');
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name='map-marker-radius'
                  color='#70D942'
                  size={30}
                />
              )}
            />
            <IconButton
              onPress={() => {
                openURL('tel:' + data.mobile_no);
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name='phone'
                  color='#70D942'
                  size={30}
                />
              )}
            />
            <IconButton
              onPress={_showDialog}
              icon={() => (
                <MaterialCommunityIcons
                  name='close-circle-outline'
                  color='red'
                  size={30}
                />
              )}
            />
          </View>
        </Surface>
      </TouchableRipple>

      <Portal>
        <Dialog visible={dialog} onDismiss={_hideDialog}>
          <Dialog.Content>
            <Paragraph>
              <FormattedMessage {...messages.confirmCancel} />
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={_hideDialog}>
              <FormattedMessage {...messages.cancel} />
            </Button>
            <Button
              onPress={() => {
                props.cancelLesson(data.lesson_id);
                _hideDialog();
              }}
            >
              <FormattedMessage {...messages.ok} />
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default LessonNotStarted;
