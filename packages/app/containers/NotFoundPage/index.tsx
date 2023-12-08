/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from "react";
import { FormattedMessage } from "react-intl";
import { Platform, StyleSheet, Text, View } from "react-native";

// import H1 from "../../components/H1";
import messages from "./messages";

export default function NotFound() {
  return (
    <View>
      <Text>
        <FormattedMessage {...messages.header} />
      </Text>
    </View>
  );
}
