/**
 *
 * CertificatePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import saga from './saga';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import { Helmet } from '../../components/Helmet';

import { Appbar, Divider, Surface } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import {
  H1,
  GlobalStyle,
  H2,
  Button,
  MaterialCommunityIcons,
  Text
} from '../../components';
import styles from './styles';
import {
  loadCertificates,
  makeSelectCertificates,
  downloadCertificate
} from './ducks';
import { Platform } from '../../components/Platform';
import ModalFilterPicker from '../../components/SelectPicker/ModalFilterPicker';
import { CertifactePageProps } from './types';
import { makeSelectLocale } from '../LanguagePage/ducks';
import Responsive from '../../components/Responsive';

const CertificatePage: React.SFC<CertifactePageProps> = ({
  loadCertificates,
  downloadCertificate,
  certificates,
  ...props
}) => {
  useInjectSaga({ key: 'certificatePage', saga });
  // useInjectReducer({ key: "certificates", reducer });
  const [state, setState] = useState({
    visible: false,
    picked: ''
  });
  useEffect(() => {
    loadCertificates();
  }, []);

  const onShow = () => {
    setState({ ...state, visible: true });
  };

  const onSelect = (subject_ids: string) => {
    setState({
      picked: subject_ids,
      visible: false
    });
    downloadCertificate(subject_ids);
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false
    });
  };

  const openPdf = (url: string) => {
    if (Platform.OS === 'web') {
      window.location.href = url;
    } else {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      });
    }
  };

  //go to download URL
  if (certificates && certificates.pdfUrl && certificates.pdfUrl.length > 0) {
    openPdf(certificates.pdfUrl[0]);
  }

  const options: any = [];
  certificates.data.map(d => {
    options.push({
      value: d.item_id,
      label: props.language === 'ar' ? d.subject_name_ar : d.subject_name,
      description: `${
        props.language === 'ar' ? d.edu_type_name_ar : d.edu_type_name
      } (${d.complate_lessons} Lessons,${d.total_hours} Hours)`
    });
  });

  // const openDrawer: any = React.useContext(DrawerContext);
  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='CERTIFICATION'
        defaultTitle='Description of CERTIFICATION'
      />
      <Appbar.Header>
        <Responsive
          large={
            <Appbar.Action
              icon='menu'
              onPress={() => props.navigation.openDrawer()}
              color='white'
            />
          }
          xlarge={null}
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.certificate} />}
          color='white'
        />
      </Appbar.Header>
      <ScrollView style={styles.bodyContainer}>
        <Surface style={styles.surface}>
          <View style={[GlobalStyle.alignCenter, styles.uniqueNo]}>
            <Text gray>
              <FormattedMessage {...messages.teacherUniqueNo} />
            </Text>
            <H1>{certificates.total_data.unique_id}</H1>
          </View>
          <Divider />
          <View style={styles.rowDirection}>
            <View
              style={[
                styles.counts,
                { borderRightWidth: 1, borderRightColor: '#e5e5e5' }
              ]}
            >
              <MaterialCommunityIcons
                name='clock-outline'
                color='#b2b2b2'
                size={60}
              />
              <Text gray>
                <FormattedMessage {...messages.worked} />
              </Text>
              <Text gray>
                <FormattedMessage {...messages.hours} />
              </Text>
              <View style={styles.hoursText}>
                <H1 style={styles.teacherColor}>
                  {certificates.total_data.total_hours}{' '}
                </H1>
                <H1 gray>
                  <FormattedMessage {...messages.h} />
                </H1>
              </View>
            </View>
            <View style={styles.counts}>
              <MaterialCommunityIcons
                name='theater'
                color='#b2b2b2'
                size={60}
              />
              <Text gray>
                <FormattedMessage {...messages.completed} />
              </Text>
              <Text gray>
                <FormattedMessage {...messages.lessons} />
              </Text>
              <H1 style={styles.teacherColor}>
                {certificates.total_data.total_completed_lesson}
              </H1>
            </View>
          </View>
          <Divider />
          <View style={GlobalStyle.alignCenter}>
            <View style={styles.registrationDate}>
              <Text gray style={[GlobalStyle.marginHorizontal5]}>
                <FormattedMessage {...messages.registrationDate} />
              </Text>
              <Text style={styles.teacherColor}>
                {certificates.total_data.registraion_date}
              </Text>
            </View>
          </View>
        </Surface>
        <View style={styles.downloadContainer}>
          <Text style={{ textAlign: 'center', marginBottom: 30 }}>
            <FormattedMessage {...messages.getYourExperince} />
          </Text>
          {/* <Dropdown
            label="Education Information"
            placeholder="Select Education Information"
            onSelect={picked => {
              console.log("aaa", picked);
            }}
            options={options}
          /> */}
          <ModalFilterPicker
            title={props.intl.formatMessage(messages.selectSubject)}
            visible={state.visible}
            onSelect={onSelect}
            onCancel={onCancel}
            options={options}
          />
          <Button
            color='white'
            style={{ width: '100%', marginBottom: 0 }}
            contentStyle={{ width: '100%' }}
            onPress={onShow}
          >
            <FormattedMessage {...messages.certificationButton} />
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  certificates: makeSelectCertificates(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadCertificates: () => dispatch(loadCertificates()),
    downloadCertificate: (uid: any) => dispatch(downloadCertificate(uid)),
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(CertificatePage);
