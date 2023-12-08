import React, { useState } from 'react';
import { View, TextInput as NativeTextInput } from 'react-native';
import _ from 'lodash';

import styles from './styles';
import { TextInput, TouchableRipple } from 'react-native-paper';
import { Icon } from '../index';
import ModalFilterPicker from './ModalFilterPicker';
import { SelectPickerProps } from './types';
import H2 from '../H2';

const SelectPicker: React.SFC<SelectPickerProps> = props => {
  const [state, setState] = useState({
    visible: false,
    picked: ''
  });

  const onShow = () => {
    setState({ ...state, visible: true });
  };

  const onSelect = (picked: string): void => {
    setState({
      picked: picked,
      visible: false
    });
    props.onSelect(picked);
  };

  const onCancel = (): void => {
    setState({
      ...state,
      visible: false
    });
  };

  const { visible, picked } = state;
  let displayLabel = _.find(props.options, function(o: any) {
    const selected =
      typeof props.selected === 'string'
        ? parseFloat(props.selected)
        : props.selected;
    return (
      parseFloat(o.value) === parseFloat(picked) ||
      parseFloat(o.value) === selected ||
      o.value === props.selected
    );
  });

  return (
    <View style={props.style}>
      <TextInput
        style={styles.textInput}
        // onChangeText={handleChange("first_name")}
        onFocus={() => onShow()}
        // onBlur={handleBlur("first_name")}
        // error={errors.first_name && touched.first_name}
        value={displayLabel && displayLabel.label}
        label={props.label}
        placeholder={props.placeholder}
        theme={{
          colors: {
            placeholder: 'black'
          }
        }}
        render={p => {
          return (
            <TouchableRipple
              style={styles.searchSection}
              onPress={() => onShow()}
              rippleColor='rgba(0, 0, 0, .32)'
            >
              <>
                {p.value != '' ? (
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'red',
                      marginTop: props.mode === 'outlined' ? 20 : 30,
                      marginLeft: 10
                    }}
                  >
                    <H2 style={{ color: 'black', textAlign: 'left' }}>
                      {p.value}
                    </H2>
                  </View>
                ) : null}
                <Icon
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 8,
                    padding: 10
                  }}
                  name='keyboard-arrow-down'
                  size={30}
                  color='#000'
                  // color={props.iconColor}
                />
              </>
            </TouchableRipple>
          );
        }}
        // render={p => (
        //   <View style={styles.searchSection}>
        //     <NativeTextInput
        //       value={p.value}
        //       onFocus={p.onFocus}
        //       placeholder={p.placeholder}
        //       style={p.style}
        //     />
        //     <Icon
        //       style={styles.toggleDown}
        //       name='arrow-drop-down'
        //       size={30}
        //       color='#000'
        //     />
        //   </View>
        // )}
      />

      <ModalFilterPicker
        title={props.label}
        visible={visible}
        onSelect={onSelect}
        onCancel={onCancel}
        showFilter={props.showFilter}
        showAddPress={props.showAddPress}
        showAdd={props.showAdd}
        showAddContent={props.showAddContent}
        options={props.options}
      />
    </View>
  );
};

export default SelectPicker;
