import React, { Component } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { Menu, TextInput, Theme } from 'react-native-paper';
// import PaperMenu from "./PaperMenu";

export interface TextInputAutocompleteProps {
  width: number;
  items: string[];
  value: string;
  theme: Theme;
  label: string;
  onChange: (value: string) => void;
}

interface TextInputAutocompleteState {
  filteredItems: string[];
  value: string;
  showMenu: boolean;
}

export default class TextInputAutocomplete extends Component<
  TextInputAutocompleteProps,
  TextInputAutocompleteState
> {
  public props: any;
  public setState: any;
  state = {
    filteredItems: [] as string[],
    value: '',
    showMenu: false
  };
  componentDidMount = () => this.updateStateFromProps(this.props);

  componentWillReceiveProps = (props: TextInputAutocompleteProps) =>
    this.updateStateFromProps(props);

  updateStateFromProps = (props: TextInputAutocompleteProps) =>
    this.setState({ value: props.value });

  filterItems = (value: any) => {
    const filteredItems =
      value.trim() !== ''
        ? this.props.items.filter(
            (item: any) =>
              item !== value &&
              item.toUpperCase().startsWith(value.toUpperCase())
          )
        : [];
    const showMenu = filteredItems.length > 0;
    this.setState({
      showMenu,
      filteredItems
    });
  };

  onTextInputFocus = () => this.filterItems(this.state.value);

  onTextInputBlur = () => this.setState({ showMenu: false });

  onMenuDismiss = () => {
    this.setState({ showMenu: false });
    Keyboard.dismiss();
  };

  onItemPress = (item: string) => {
    this.onMenuDismiss();
    this.setState({ value: item });
    this.props.onChange(item);
  };

  onTextInputChange = (value: any) => {
    this.setState({ value });
    this.filterItems(value);
  };

  render() {
    const menuItems = this.state.filteredItems.map((item, i) => {
      const onPress = () => this.onItemPress(item);
      return (
        <Menu.Item
          style={{ minWidth: this.props.width, maxWidth: this.props.width }}
          onPress={onPress}
          key={i}
          title={item}
        />
      );
    });
    return (
      <Menu
        style={{ marginTop: 50, width: this.props.width }}
        visible={this.state.showMenu}
        onDismiss={this.onMenuDismiss}
        anchor={
          <TextInput
            label={this.props.label}
            mode='outlined'
            theme={this.props.theme}
            value={this.state.value}
            onChangeText={this.onTextInputChange}
            onFocus={this.onTextInputFocus}
            onBlur={this.onTextInputBlur}
          />
        }
      >
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps='always'
          style={{ height: 135 }}
        >
          {menuItems}
        </ScrollView>
      </Menu>
    );
  }
}
