import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import Modal from '../Modal';

import styles from './styles';
import { Appbar, Searchbar, List, FAB } from 'react-native-paper';
import { ModalPickerProps } from './types';
import { Icon } from '../index';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocale } from '../../containers/LanguagePage/ducks';
import { compose } from '../../utils/helper';
// import { compose } from 'recompose';

const ModalPicker: React.SFC<ModalPickerProps> = ({
  title,
  titleTextStyle,
  overlayStyle,
  cancelContainerStyle,
  showFilter,
  placeholderText,
  // renderCancelButton,
  visible,
  options,
  modal,
  onCancel,
  onSelect,
  renderOption,
  autoFocus,
  listContainerStyle,
  androidUnderlineColor,
  placeholderTextColor,
  filterTextInputContainerStyle,
  filterTextInputStyle,
  noResultsText,
  listViewProps,
  keyboardShouldPersistTaps,
  selectedOption,
  optionTextStyle,
  renderList,
  selectedOptionTextStyle,
  showAdd,
  showAddPress,
  showAddContent,
  ...props
}) => {
  const [state, setState] = useState({
    visibleSearch: false,
    filter: '',
    // ds: new FlatList.DataSource({
    //   rowHasChanged: (r1, r2) => r1.key !== r2.key
    // }).cloneWithRows(options),
    ds: options,
    visibleShowAdd: false
  });

  useEffect(() => {
    // console.log("count changed", props.count);
    // if (
    //   (!visible && newProps.visible) ||
    //   options !== newProps.options
    // ) {
    setState({
      ...state,
      filter: '',
      // ds: state.ds.cloneWithRows(options)
      ds: options
    });
    // }
  }, [visible, options]);

  const renderListFun = () => {
    // const filter = !showFilter ? null : (
    //   <View
    //     style={filterTextInputContainerStyle || styles.filterTextInputContainer}
    //   >
    //     <TextInput
    //       onChangeText={onFilterChange}
    //       autoCorrect={false}
    //       blurOnSubmit={true}
    //       autoFocus={autoFocus}
    //       autoCapitalize="none"
    //       underlineColorAndroid={androidUnderlineColor}
    //       placeholderTextColor={placeholderTextColor}
    //       placeholder={placeholderText}
    //       style={filterTextInputStyle || styles.filterTextInput}
    //     />
    //   </View>
    // );

    return (
      <View style={listContainerStyle || styles.listContainer}>
        {renderOptionList()}
      </View>
    );
  };

  const renderOptionList = () => {
    const { ds } = state;

    // console.log("aaa adsf", ds);
    // console.log("aaa ee", ds.getRowData());

    if (ds.length === 0) {
      return (
        <FlatList
          // enableEmptySections={false}
          // {...listViewProps}
          // dataSource={ds.cloneWithRows([{ key: '_none' }])}
          data={[]}
          renderItem={({ item, index }) => (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                {props.intl.formatMessage(messages.noMatch)}
              </Text>
            </View>
          )}
        />
      );
    } else {
      return (
        <FlatList
          // enableEmptySections={false}
          // {...listViewProps}
          // dataSource={ds}
          data={ds}
          renderItem={(item: any) => renderOptionFunc(item)}
          // keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        />
      );
    }
  };

  const renderOptionFunc = ({ separators, item, index }: any) => {
    const { value, label, description } = item;

    let style = styles.optionStyle;
    let textStyle = optionTextStyle || styles.optionTextStyle;

    if (value === selectedOption) {
      style = styles.selectedOptionStyle;
      textStyle = selectedOptionTextStyle || styles.selectedOptionTextStyle;
    }

    // if (renderOption) {
    //   return renderOption(rowData, value === selectedOption);
    // } else {
    return (
      <List.Item
        key={value}
        style={{ borderBottomWidth: 1, borderBottomColor: '#dbdbdb' }}
        onPress={() => onSelect(value)}
        title={label}
        description={description}
      />
    );
    // }
  };

  const onFilterChange = (text: string) => {
    const filter = text.toLowerCase();

    // apply filter to incoming data
    const filtered = !filter.length
      ? options
      : options.filter(({ label, value }) => {
          return 0 <= label.toLowerCase().indexOf(filter);
        });

    setState({
      ...state,
      filter: text.toLowerCase(),
      // ds: state.ds.cloneWithRows(filtered)
      ds: filtered
    });
  };

  return (
    <Modal
      onRequestClose={onCancel}
      {...modal}
      visible={visible}
      transparent={false}
      // avoidKeyboard={true}
      presentationStyle='fullScreen'
      style={{ margin: 0, justifyContent: 'flex-start' }}
      supportedOrientations={['portrait', 'landscape']}
    >
      <Appbar.Header>
        {showFilter && state.visibleSearch ? (
          <>
            {/* <Appbar.Action
              icon="close"
              onPress={() => setState({ ...state, visibleSearch: false })}
            /> */}
            <View style={{ flex: 1 }}>
              <Searchbar
                value=''
                placeholder={props.intl.formatMessage(messages.filter)}
                onChangeText={onFilterChange}
                icon={p => (
                  <Icon
                    {...p}
                    name={
                      props.language == 'ar' ? 'arrow-forward' : 'arrow-back'
                    }
                  />
                )}
                onIconPress={() =>
                  setState({
                    ...state,
                    visibleSearch: false,
                    filter: '',
                    // ds: state.ds.cloneWithRows(options)
                    ds: options
                  })
                }
              />
            </View>
          </>
        ) : (
          <>
            <Appbar.BackAction onPress={onCancel} color='white' />
            <Appbar.Content title={title} color='white' />
            {showFilter ? (
              <Appbar.Action
                icon='magnify'
                color='white'
                onPress={() => setState({ ...state, visibleSearch: true })}
              />
            ) : null}
          </>
        )}
      </Appbar.Header>

      <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
        {state.visibleShowAdd && showAdd ? showAddContent() : renderListFun()}
      </View>
      {showAdd ? (
        <FAB
          style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
          small={false}
          icon='add'
          onPress={() => setState({ ...state, visibleShowAdd: true })}
        />
      ) : null}
    </Modal>
  );
};

ModalPicker.defaultProps = {
  placeholderText: 'Filter...',
  placeholderTextColor: '#ccc',
  androidUnderlineColor: 'rgba(0,0,0,0)',
  cancelButtonText: 'Cancel',
  noResultsText: 'No matches',
  visible: true,
  showFilter: true,
  keyboardShouldPersistTaps: 'never'
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(
  withConnect,
  injectIntl
)(ModalPicker);
