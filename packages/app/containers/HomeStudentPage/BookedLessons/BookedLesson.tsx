import * as React from 'react';

import {
  Button,
  Surface,
  Paragraph,
  Dialog,
  Portal,
  TouchableRipple,
  IconButton
} from 'react-native-paper';
import { View, Linking } from 'react-native';
import {
  MaterialCommunityIcons,
  H2,
  Small,
  XSmall,
  H1
} from '../../../components';
import styles from './styles';
import { themeStudent } from '../../App/themes';
import StarRating from '../../../components/StarRating';
import { BookedLessonProps } from './types';
import { ROUTE_FIND_WAY } from '../../../Router';
import messages from '../messages';
import { FormattedMessage, injectIntl } from 'react-intl';

const BookedLesson: React.SFC<BookedLessonProps> = props => {
  const [dialog, setDialog] = React.useState(false);

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
  // console.log('data', data);

  return (
    <>
      <Surface style={styles.BookedLessonContainer}>
        <View style={[styles.flexDirectionRow, { paddingHorizontal: 10 }]}>
          <View style={styles.teachingType}>
            <Small dark>{data.booked_teaching_location}</Small>
          </View>
          <View style={styles.flexDirectionRow}>
            <MaterialCommunityIcons name='account' size={20} color='#B3B7AF' />
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
              {data.booked_lesson_name}
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
              {data.lesson_start} - {data.lesson_end}
            </Small>
          </View>
        </View>

        <View style={[styles.flexDirectionRow, styles.bottomBar]}>
          <IconButton
            onPress={() => {
              //   props.selectLesson(data);
              //   props.push(ROUTE_FIND_WAY);
            }}
            color='#70D942'
            icon='map-marker-radius'
          />

          <IconButton
            onPress={() => {
              openURL('tel:' + data.teacher_mobile_no);
            }}
            color='#70D942'
            icon='phone'
          />

          <IconButton
            onPress={_showDialog}
            color='red'
            icon='close-circle-outline'
          />
        </View>
      </Surface>

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
                // TODO: cancel schedule lesson
                // props.cancelLesson(data.lesson_id);
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

export default BookedLesson;
