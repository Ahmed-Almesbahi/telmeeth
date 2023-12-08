/**
 *
 * HomeStudentPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import styles from './styles';

import { useInjectSaga } from '../../utils/injectSaga';
// import { useInjectReducer } from "../../utils/injectReducer";
// import makeSelectHomeStudentPage from "./selectors";
// import reducer from "./reducer";
import saga from './saga';
import messages from './messages';

// import { BottomNavigation } from 'react-native-paper';
import { HomeStudentProps } from './types';
import Search from './Search';
import BookedLessons from './BookedLessons';
import BottomNavigation from './bottomNavigation';
import { makeSelectUser } from '../User/ducks';
import {
  makeSelectHomeStudent,
  setHomeStudentOption,
  makeSelectHomeStudentBottomTab
} from './ducks';

const HomeStudentPage: React.SFC<HomeStudentProps> = props => {
  // useInjectSaga({ key: 'homeStudentPage', saga });
  const [state, setState] = useState({
    index: props.bottomTab === 'Search' ? 0 : 1,
    routes: [
      {
        key: 'search',
        title: props.intl.formatMessage(messages.search),
        color: '#009688'
        // icon: 'queue-music'
      },
      {
        key: 'bookedLessons',
        title: props.intl.formatMessage(messages.bookedLessons),
        color: '#009688'
        // icon: 'queue-music'
      }
    ]
  });

  useEffect(() => {
    setState({ ...state, index: props.bottomTab === 'Search' ? 0 : 1 });
  }, [props.bottomTab]);

  // useInjectReducer({ key: "homeStudentPage", reducer });

  const _handleIndexChange = (index: number) => {
    setState({ ...state, index });
    props.setHomeStudentOption(
      'bottomTab',
      index === 0 ? 'Search' : 'BookedLessons'
    );
  };

  // @ts-ignore
  const _renderScene = BottomNavigation.SceneMap({
    search: (p: any) => (
      <Search {...p} navigation={props.navigation} user={props.user} />
    ),
    bookedLessons: (p: any) => (
      <BookedLessons navigation={props.navigation} {...p} />
    )
  });

  return (
    <View style={styles.container}>
      <BottomNavigation
        // getColor={() => "white"}
        barStyle={{
          backgroundColor: 'white'
        }}
        // renderIcon={() => null}
        // renderLabel={() => null}
        // activeColor='blue'
        navigationState={state}
        onIndexChange={_handleIndexChange}
        renderScene={_renderScene}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  // homeStudent: makeSelectHomeStudent(),
  bottomTab: makeSelectHomeStudentBottomTab(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch: any) {
  return {
    setHomeStudentOption: (key: any, value: any) =>
      dispatch(setHomeStudentOption(key, value))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(HomeStudentPage);
