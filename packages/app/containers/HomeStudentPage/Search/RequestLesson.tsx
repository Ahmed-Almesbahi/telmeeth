import * as React from 'react';
import { Surface, Button, Chip, ActivityIndicator } from 'react-native-paper';
import { TeachersListProps, SearchTeachersType } from './types';
import { View } from 'react-native';
import { Text, H2, Small } from '../../../components';
import styles from './styles';
import { themeStudent } from '../../App/themes';
import { initialStateHomeStudent } from '../ducks';
import CircularProgress from '../../../components/CircularProgress';
import messages from '../messages';
import { FormattedMessage, injectIntl } from 'react-intl';
// import Countdown from 'react-countdown-now';
// import Renderer from '../OtpPage/Renderer';

interface RequestLessonProps extends TeachersListProps {
  d: SearchTeachersType;
}

const RequestLesson: React.SFC<RequestLessonProps> = props => {
  const [countdown, setCountdown] = React.useState(100);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown => {
        if (countdown === 1) {
          clearInterval(interval);
          props.cancelRequest();
          return 0;
        }
        return countdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Surface
      style={{
        backgroundColor: themeStudent.colors.primary,
        paddingTop: 20,
        alignItems: 'center',
        borderRadius: 5,
        elevation: 3
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          width: '100%'
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <H2 light style={{ marginBottom: 15 }}>
            {props.d.first_name}
          </H2>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {props.homeStudent.range.home === 'student' ? (
            <Chip
              mode='outlined'
              style={{
                backgroundColor: themeStudent.colors.primary,
                borderColor: 'white'
              }}
              textStyle={{ fontSize: 12, margin: 0, color: 'white' }}
            >
              <FormattedMessage {...messages.homeStudent} />
            </Chip>
          ) : null}
          {props.homeStudent.range.home === 'teacher' ? (
            <Chip
              mode='outlined'
              style={{
                backgroundColor: themeStudent.colors.primary,
                borderColor: 'white'
              }}
              textStyle={{
                fontSize: 12,
                margin: 0,
                color: 'white'
              }}
            >
              <FormattedMessage {...messages.homeTeacher} />
            </Chip>
          ) : null}
        </View>
      </View>

      <CircularProgress
        percent={countdown}
        radius={80}
        bgRingWidth={5}
        progressRingWidth={5}
        ringColor='white'
        ringBgColor='#515151'
      >
        <Text light>
          <FormattedMessage {...messages.requesting} />
        </Text>
      </CircularProgress>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 25
        }}
      >
        <Text light>
          <FormattedMessage {...messages.sr} />
        </Text>
        {props.homeStudent.loading ? (
          <ActivityIndicator
            animating={true}
            color='white'
            style={{ marginHorizontal: 10 }}
          />
        ) : (
          <Text
            light
            style={{ fontSize: 25, marginHorizontal: 10, color: '#ffbb32' }}
          >
            {props.homeStudent.range.rate}
          </Text>
        )}

        <Text light>
          /<FormattedMessage {...messages.hr} />
        </Text>
      </View>

      <View style={styles.teacherListRightWrapper}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Button
            mode='outlined'
            style={{
              borderWidth: 1,
              borderColor: 'white',
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0
            }}
            theme={{ colors: { primary: 'white' } }}
            onPress={() =>
              props.cancelRequestLesson(
                props.homeStudent.notification_id,
                props.homeStudent.selectedTeacher.user_id
              )
            }
          >
            <FormattedMessage {...messages.cancel} />
          </Button>
        </View>
      </View>
    </Surface>
  );
};

export default RequestLesson;
