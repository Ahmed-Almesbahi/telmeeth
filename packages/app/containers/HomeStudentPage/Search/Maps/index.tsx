import OriginalMapView from 'react-native-web-maps2';

import * as React from 'react';

interface MapViewProps {
  user: any;
}

const MapView: React.SFC<MapViewProps> = props => {
  return (
    <OriginalMapView
      // style={styles.mapContainer}
      style={{ flex: 1 }}
      onPress={() => {}}
      initialRegion={{
        latitude: props.user.latitude,
        longitude: props.user.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      showsMyLocationButton={false}
      showsUserLocation={false}
      options={{
        clickableIcons: false,
        mapTypeControl: false,
        //   disableDefaultUI: true,
        fullscreenControl: false,
        streetViewControl: false
      }}
    >
      {props.children}
    </OriginalMapView>
  );
};

export default MapView;
