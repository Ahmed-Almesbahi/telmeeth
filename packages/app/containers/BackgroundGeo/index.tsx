import * as React from 'react';
import BackgroundGeolocation, {
  Location,
  MotionChangeEvent,
  ProviderChangeEvent,
  HttpEvent,
  HeartbeatEvent,
  MotionActivityEvent
} from 'react-native-background-geolocation';
import Geolocation from '@react-native-community/geolocation';
import { API_URL } from '../../utils/constants';
import { store } from '../../App';

interface BackgroundGeoProps {}
interface BackgroundGeoState {}

class BackgroundGeo extends React.Component<
  BackgroundGeoProps,
  BackgroundGeoState
> {
  eventId: number;
  constructor(props: BackgroundGeoProps) {
    super(props);

    this.eventId = 1;

    this.state = {
      enabled: true,
      isMoving: false,
      username: '',
      events: []
    };
  }

  componentDidMount() {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'always'
    });

    Geolocation.requestAuthorization();
    // Step 1:  Listen to events:
    BackgroundGeolocation.onLocation(this.onLocation.bind(this));
    BackgroundGeolocation.onMotionChange(this.onMotionChange.bind(this));
    BackgroundGeolocation.onActivityChange(this.onActivityChange.bind(this));
    BackgroundGeolocation.onProviderChange(this.onProviderChange.bind(this));
    BackgroundGeolocation.onPowerSaveChange(this.onPowerSaveChange.bind(this));
    BackgroundGeolocation.onHttp(this.onHttp.bind(this));
    BackgroundGeolocation.onHeartbeat(this.onHeartbeat.bind(this));

    // Step 2:  #configure:
    BackgroundGeolocation.ready(
      {
        distanceFilter: 500,

        stopOnTerminate: false,
        startOnBoot: true,
        foregroundService: true,
        // heartbeatInterval: 60,
        url: `${API_URL}/user/update-location`,
        headers: {
          // <-- Optional HTTP headers
          Authorization: 'Bearer ' + store.getState().user.access_token
        },
        persistMode: BackgroundGeolocation.PERSIST_MODE_LOCATION,
        // autoSyncThreshold: 5,
        // batchSync: true,
        autoSync: true,
        debug: false,
        useSignificantChangesOnly: true,
        locationAuthorizationRequest: 'Any',
        logLevel: BackgroundGeolocation.LOG_LEVEL_OFF
      },
      x => {
        console.log('- Configure success: ', x);
        this.setState({
          enabled: x.enabled,
          isMoving: x.isMoving
        });
      }
    );
  }

  /**
   * @event location
   */
  onLocation(location: Location) {
    console.log('[event] location: ', location);
  }
  /**
   * @event motionchange
   */
  onMotionChange(event: MotionChangeEvent) {
    console.log('[event] motionchange: ', event.isMoving, event.location);
    this.setState({
      isMoving: event.isMoving
    });
  }
  /**
   * @event activitychange
   */
  onActivityChange(event: MotionActivityEvent) {
    console.log('[event] activitychange: ', event);
  }

  /**
   * @event providerchange
   */
  onProviderChange(event: ProviderChangeEvent) {
    console.log('[event] providerchange', event);
  }
  /**
   * @event powersavechange
   */
  onPowerSaveChange(isPowerSaveMode: boolean) {
    console.log('[event] powersavechange', isPowerSaveMode);
  }
  /**
   * @event heartbeat
   */
  onHttp(response: HttpEvent) {
    console.log('[event] http: ', response);
  }
  /**
   * @event heartbeat
   */
  onHeartbeat(event: HeartbeatEvent) {
    console.log('[event] heartbeat: ', event);
  }

  render() {
    return null;
  }
}

export default BackgroundGeo;
