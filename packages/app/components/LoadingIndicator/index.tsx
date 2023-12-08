import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { ActivityIndicator } from "react-native-paper";

const LoadingIndicator = () => (
  <View style={styles.noRecordContainder}>
    <ActivityIndicator animating={true} size="large" />
  </View>
);

export default LoadingIndicator;
