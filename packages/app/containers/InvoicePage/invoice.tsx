import React from 'react';
import { View } from 'react-native';

import { GlobalStyle, Small, XSmall, Text } from '../../components';
import { Card, Divider } from 'react-native-paper';
import styles from './styles';

import { InvoiceProps } from './types';
import { TEACHER_TYPE, STUDENT_TYPE } from '../../utils/constants';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

const Invoice: React.SFC<InvoiceProps> = ({ data, userType, language }) => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <View style={styles.preCard}>
        <View>
          <Text>{data.lesson_date}</Text>
        </View>
        <View>
          <Text>{data.hours}</Text>
        </View>
        <View>
          <Text>{data.teaching_type_name}</Text>
        </View>
      </View>
      <Card style={GlobalStyle.marginBottom10}>
        <View style={[styles.preCard, { paddingBottom: 5 }]}>
          <View>
            <Text>
              {userType === TEACHER_TYPE
                ? data.student_name
                : data.teacher_name}
            </Text>
          </View>
          <View>
            <Text>{language === 'ar' ? data.name_ar : data.name}</Text>
          </View>
        </View>
        <View style={[styles.preCard, { paddingTop: 0 }]}>
          <View>
            <Text>{data.teaching_location}</Text>
          </View>
          <View>
            <Text>
              {data.lesson_actual_start_time} - {data.lesson_actual_end_time}
            </Text>
          </View>
        </View>
        <View style={styles.preCard}>
          <View style={styles.invoiceAmountContainer}>
            <Small>{data.original_amt}</Small>
            <XSmall>
              <FormattedMessage {...messages.lesson} />
            </XSmall>
            <XSmall>
              <FormattedMessage {...messages.cost} />
            </XSmall>
          </View>
          {userType === TEACHER_TYPE ? (
            <View style={styles.invoiceAmountContainer}>
              <Small>{data.teacher_amount}</Small>
              <XSmall>
                <FormattedMessage {...messages.your} />%
              </XSmall>
            </View>
          ) : null}
          {userType === TEACHER_TYPE ? (
            <View>
              <Small>{data.telmeeth_amount}</Small>
              <XSmall>
                <FormattedMessage {...messages.telmeeth} />%
              </XSmall>
            </View>
          ) : null}
          {userType === TEACHER_TYPE ? (
            <View>
              <Small>{data.telmeeth_tax}</Small>
              <XSmall>
                <FormattedMessage {...messages.tax} />
              </XSmall>
            </View>
          ) : null}
          <View>
            <Small>{data.promocode_discount}</Small>
            <XSmall>
              <FormattedMessage {...messages.discounts} />
            </XSmall>
          </View>
          {userType === STUDENT_TYPE ? (
            <View>
              <Small>{data.creditearn_discount}</Small>
              <XSmall>
                <FormattedMessage {...messages.invite} />
              </XSmall>
              <XSmall>
                <FormattedMessage {...messages.discounts} />
              </XSmall>
            </View>
          ) : null}
          {userType === TEACHER_TYPE ? (
            <View>
              <Small>{data.total_amount}</Small>
              <XSmall>
                <FormattedMessage {...messages.net} />
              </XSmall>
            </View>
          ) : null}

          <View>
            <Small>
              <FormattedMessage {...messages.SR} />
              {userType === TEACHER_TYPE ? data.total_due : data.total_amount}
            </Small>
            <XSmall>
              <FormattedMessage {...messages.due} />
            </XSmall>
          </View>
        </View>
        <Divider />
        <View style={styles.preCard}>
          <View>
            <Text>
              {data.students} <FormattedMessage {...messages.student} />
            </Text>
          </View>
          <View>
            <Text>
              <FormattedMessage {...messages.invoice} />: {data.unique_id}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default Invoice;
