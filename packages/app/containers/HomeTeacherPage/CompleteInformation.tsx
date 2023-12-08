import * as React from 'react';
import { SettingsDataType } from '../SettingPage/types';
import { View } from 'react-native';
import { MaterialCommunityIcons, H2, Text } from '../../components';
import { GRAY_TEXT } from '../../utils/constants';
import { ProgressBar, Colors, List, Banner } from 'react-native-paper';
import { themeTeacher } from '../App/themes';
import messages from './messages';
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { ScrollView } from 'react-native-gesture-handler';

interface CompleteInformationProps {
  validation: SettingsDataType;
  navigation: NavigationStackProp;
  intl: any;
}

const CompleteInformation: React.SFC<CompleteInformationProps> = props => {
  const getProgress = () => {
    let rate = 5;
    if (props.validation.personalInfo) {
      rate = rate + 15;
    }
    if (props.validation.teachingInfo) {
      rate = rate + 15;
    }
    if (props.validation.userAttachment) {
      rate = rate + 15;
    }
    if (props.validation.userLocation) {
      rate = rate + 15;
    }
    if (props.validation.locationPreference) {
      rate = rate + 15;
    }
    if (props.validation.locationRange) {
      rate = rate + 15;
    }
    if (props.validation.is_pending) {
      rate = rate + 5;
    }

    return rate;
  };

  const goTo = () => {
    // if (props.validation.personalInfo) {
    //   rate = rate + 20;
    // }
    // if (props.validation.teachingInfo) {
    //   rate = rate + 20;
    // }
    // if (props.validation.userAttachment) {
    //   rate = rate + 20;
    // }
    // if (props.validation.userLocation) {
    //   rate = rate + 20;
    // }
    // if (props.validation.is_pending) {
    //   rate = rate + 5;
    // }

    props.navigation.navigate('Settings');
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: 'never', bottom: 'always' }}
    >
      <View
        style={{
          backgroundColor: themeTeacher.colors.primary,
          paddingVertical: 10,
          paddingHorizontal: 20
        }}
      >
        <H2 light style={{ textAlign: 'center' }}>
          {props.intl.formatMessage(messages.registrationProgress)} (
          {getProgress()}%)
        </H2>
        <ProgressBar
          progress={getProgress() / 100}
          color='white'
          style={{ height: 8 }}
        />
      </View>
      <Banner
        visible={true}
        actions={[
          {
            label: props.intl.formatMessage(messages.startNow),
            onPress: () => goTo()
          }
        ]}
        icon='star'
      >
        {props.intl.formatMessage(messages.byCompleteYour)}
      </Banner>

      <ScrollView>
        <List.Item
          title={props.intl.formatMessage(messages.completePesonal)}
          description={props.intl.formatMessage(messages.completePesonalDes)}
          left={p =>
            props.validation.personalInfo ? (
              <List.Icon
                {...p}
                icon='clipboard-check-outline'
                color={themeTeacher.colors.primary}
              />
            ) : (
              <List.Icon {...p} icon='clipboard-alert-outline' />
            )
          }
        />
        <List.Item
          title={props.intl.formatMessage(messages.completeTeachingInformation)}
          description={props.intl.formatMessage(
            messages.completeTeachingInformationDes
          )}
          left={p =>
            props.validation.teachingInfo ? (
              <List.Icon
                {...p}
                icon='clipboard-check-outline'
                color={themeTeacher.colors.primary}
              />
            ) : (
              <List.Icon {...p} icon='clipboard-alert-outline' />
            )
          }
        />
        <List.Item
          title={props.intl.formatMessage(messages.completeDocument)}
          description={props.intl.formatMessage(messages.completeDocumentDes)}
          left={p =>
            props.validation.userAttachment ? (
              <List.Icon
                {...p}
                icon='clipboard-check-outline'
                color={themeTeacher.colors.primary}
              />
            ) : (
              <List.Icon {...p} icon='clipboard-alert-outline' />
            )
          }
        />
        <List.Item
          title={props.intl.formatMessage(messages.completeLocation)}
          description={props.intl.formatMessage(messages.completeLocationDes)}
          left={p =>
            props.validation.userLocation ? (
              <List.Icon
                {...p}
                icon='clipboard-check-outline'
                color={themeTeacher.colors.primary}
              />
            ) : (
              <List.Icon {...p} icon='clipboard-alert-outline' />
            )
          }
        />
        <List.Item
          title={props.intl.formatMessage(messages.setRange)}
          description={props.intl.formatMessage(messages.setRangeDes)}
          descriptionNumberOfLines={3}
          left={p =>
            props.validation.locationRange ? (
              <List.Icon
                {...p}
                icon='clipboard-check-outline'
                color={themeTeacher.colors.primary}
              />
            ) : (
              <List.Icon {...p} icon='clipboard-alert-outline' />
            )
          }
        />
        <List.Item
          title={props.intl.formatMessage(messages.setPreferenceStudyLocation)}
          description={props.intl.formatMessage(
            messages.setPreferenceStudyLocationDes
          )}
          left={p =>
            props.validation.locationPreference ? (
              <List.Icon
                {...p}
                icon='clipboard-check-outline'
                color={themeTeacher.colors.primary}
              />
            ) : (
              <List.Icon {...p} icon='clipboard-alert-outline' />
            )
          }
        />
        <List.Item
          title={props.intl.formatMessage(messages.waitForVerification)}
          descriptionNumberOfLines={3}
          description={props.intl.formatMessage(
            messages.waitForVerificationDes
          )}
          left={p =>
            props.validation.is_pending ? (
              <List.Icon
                {...p}
                icon='clipboard-check-outline'
                color={themeTeacher.colors.primary}
              />
            ) : (
              <List.Icon {...p} icon='clipboard-alert-outline' />
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteInformation;
