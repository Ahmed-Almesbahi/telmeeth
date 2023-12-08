import * as React from 'react';
import { TeachersListProps } from './types';
import { View } from 'react-native';

import Teacher from './Teacher';
import TeacherSelected from './TeacherSelected';
import RequestLesson from './RequestLesson';

const TeachersList: React.SFC<TeachersListProps> = props => {
  console.log('props', props);
  return (
    <View style={{ padding: 15, flex: 1 }}>
      {props.homeStudent.teachers.map((d, k) =>
        props.homeStudent.notification_id > 0 ? (
          <RequestLesson d={d} key={k} {...props} />
        ) : props.homeStudent.selectedTeacher.user_id > 0 &&
          d.user_id === props.homeStudent.selectedTeacher.user_id ? (
          <TeacherSelected
            d={d}
            key={k}
            {...props}
            // onRequestPress={() => {
            //   // @ts-ignore
            //   props.makeRequestLesson();
            // }}
          />
        ) : (
          <Teacher d={d} key={k} {...props} />
        )
      )}
    </View>
  );
};

export default TeachersList;
