import * as React from 'react';
import { ScheduleType } from '../../containers/SchedulePage/types';
import { View, StyleSheet } from 'react-native';
import { Text, Small, MaterialCommunityIcons } from '..';
import {
  Surface,
  IconButton,
  Portal,
  Dialog,
  Paragraph,
  Button
} from 'react-native-paper';
import H1 from '../H1';
import { deleteSchedule } from '../../containers/SchedulePage/ducks';
import { useState } from 'react';

interface ScheduledProps {
  data: ScheduleType;
  deleteSchedule: typeof deleteSchedule;
}

const Scheduled: React.SFC<ScheduledProps> = ({ data, ...props }) => {
  const [visible, setVisible] = useState(false);

  const _showDialog = () => setVisible(true);

  const _hideDialog = () => setVisible(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'flex-end',
            flex: 1,
            width: '100%'
          }}
        >
          <IconButton
            color='white'
            size={18}
            style={{ margin: 0 }}
            icon={p => (
              <MaterialCommunityIcons {...p} name='close-circle-outline' />
            )}
            onPress={() => _showDialog()}
          />
        </View>
        <H1 light style={{ marginBottom: 10, marginTop: -10 }}>
          {data.schedule_start_time}
        </H1>
        <Text light style={{ marginBottom: 10, marginTop: -10 }}>
          {data.lesson_date}
        </Text>

        <Small light style={{ marginVertical: 10 }}>
          {data.schedule_type}
        </Small>
        <Surface style={styles.schedule_preferred_location}>
          <Small gray>{data.schedule_preferred_location}</Small>
        </Surface>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={_hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                _hideDialog();
              }}
            >
              Cancel
            </Button>
            <Button
              mode='contained'
              dark={true}
              onPress={() => {
                props.deleteSchedule(
                  data.firebase_lesson_id,
                  data.firebase_lesson_date
                );
                _hideDialog();
              }}
            >
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    flex: 1
  },
  container: {
    backgroundColor: '#899184',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
    // margin: 5
  },
  schedule_preferred_location: {
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: -5
  }
});

export default Scheduled;
