import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
// const _ReducerInjector = ({ key, reducer }: any) => (WrappedComponent: any) => {
//   class ReducerInjector extends React.Component {
//     static WrappedComponent = WrappedComponent;

//     static contextType = ReactReduxContext;

//     static displayName = `withReducer(${WrappedComponent.displayName ||
//       WrappedComponent.name ||
//       'Component'})`;

//     constructor(props: any, context: any) {
//       super(props, context);

//       getInjectors(context.store).injectReducer(key, reducer);
//     }

//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   }

//   return hoistNonReactStatics(ReducerInjector, WrappedComponent);
// };

export const useInjectReducer = ({ key, reducer }: any) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  }, []);
};

// TODO : I think this is going to make issue
// export default _ReducerInjector;
