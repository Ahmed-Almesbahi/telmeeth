import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '../../components';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

interface RendererProps {
  hours: any;
  minutes: any;
  seconds: any;
  completed: any;
  resend: any;
  values?: any;
  actions?: any;
  resetCountdown: any;
}

const Renderer: React.SFC<RendererProps> = props => {
  const {
    hours,
    minutes,
    seconds,
    completed,
    resend,
    values,
    actions,
    resetCountdown
  } = props;
  if (completed) {
    // Render a completed state
    return (
      <Button
        onPress={() => {
          // resend(values, actions);
          resetCountdown();
        }}
        mode='text'
      >
        <FormattedMessage {...messages.ResendOTP} />
      </Button>
    );
  } else {
    // Render a countdown
    return (
      <Text light>
        {minutes}:{seconds} <FormattedMessage {...messages.secondsLeft} />
      </Text>
    );
  }
};

export default React.memo(Renderer);
