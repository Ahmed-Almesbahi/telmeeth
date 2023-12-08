import React from 'react';
import { View } from 'react-native';
import { Text, H1, H2, Small, MaterialCommunityIcons } from '../../components';
import styles from './styles';
import { TEACHER_TYPE } from '../../utils/constants';
import { initialStateDrawerType } from './types';
import StarRating from '../../components/StarRating';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

interface UserInfoProps {
  drawerState: initialStateDrawerType;
  type: number;
}

const UserInfo: React.SFC<UserInfoProps> = ({ drawerState, type }) => {
  const _rating =
    typeof drawerState.data.rating === 'string'
      ? parseFloat(drawerState.data.rating)
      : drawerState.data.rating;
  return (
    <View style={styles.userInfoContainer}>
      {type === TEACHER_TYPE ? (
        <View style={styles.teacherInfoContainer}>
          <H2 light style={styles.marginBottom10}>
            {drawerState.data.first_name} {drawerState.data.last_name}
          </H2>
          <StarRating
            starSize={20}
            disabled={true}
            maxStars={5}
            halfStarEnabled={false}
            fullStarColor='#ffd200'
            rating={_rating}
            // selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
          <Small light>
            {drawerState.data.rating} <FormattedMessage {...messages.rating} />
          </Small>
          <View style={styles.teacherStatics}>
            <View style={styles.alignCenter}>
              <Text light style={styles.marginBottom10}>
                {drawerState.data.number_rating}
              </Text>
              <Small light>
                <FormattedMessage {...messages.ratings} />
              </Small>
              <Small light>
                <FormattedMessage {...messages.received} />
              </Small>
            </View>
            <View style={styles.alignCenter}>
              <Text light style={styles.marginBottom10}>
                {drawerState.data.request_accepted} %
              </Text>
              <Small light>
                <FormattedMessage {...messages.requests} />
              </Small>
              <Small light>
                <FormattedMessage {...messages.accepted} />
              </Small>
            </View>
            <View style={styles.alignCenter}>
              <Text light style={styles.marginBottom10}>
                {drawerState.data.request_canceled} %
              </Text>
              <Small light>
                <FormattedMessage {...messages.requests} />
              </Small>
              <Small light>
                <FormattedMessage {...messages.cancelled} />
              </Small>
            </View>
          </View>
        </View>
      ) : (
        <>
          <H1 style={[styles.userInfoContainerText, styles.marginBottom10]}>
            {drawerState.data.first_name} {drawerState.data.last_name}
          </H1>
          <Text style={styles.userInfoContainerText}>
            {drawerState.data.address}
          </Text>
          <Text style={styles.userInfoContainerText}>94108</Text>
        </>
      )}
    </View>
  );
};

export default UserInfo;
