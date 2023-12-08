import { NavigationActions, NavigationRoute } from 'react-navigation';
const config: any = {};
export function setNavigator(nav: any) {
  if (nav) {
    config.navigator = nav;
  }
}
export function navigate(routeName: string, params: any = null) {
  // console.log('config', config);
  if (config.navigator && routeName) {
    let action = NavigationActions.navigate({ routeName, params });
    config.navigator.dispatch(action);
  }
}

export function getCurrentRoute(): NavigationRoute | null {
  if (!config.navigator || !config.navigator.state.nav) {
    return null;
  }

  return (
    config.navigator.state.nav.routes[config.navigator.state.nav.index] || null
  );
}

export function goBack() {
  if (config.navigator) {
    let action = NavigationActions.back({});
    config.navigator.dispatch(action);
  }
}
