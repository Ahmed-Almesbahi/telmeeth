import React from 'react';
import { Picker } from 'react-native';

interface WheelPickerProps {
  data: Array<string>;
  selectedItem?: number;
  style?: any;
  onItemSelected?: (item: any) => void;
  initPosition?: any;
  isCyclic?: any;
}

interface WheelPickerState {
  selectedItem: number;
}

export default class WheelPicker extends React.Component<
  WheelPickerProps,
  WheelPickerState
> {
  static defaultProps = {
    style: {
      width: 200,
      height: 150
    }
  };

  constructor(props: WheelPickerProps) {
    super(props);
    this.state = {
      selectedItem: props.selectedItem ? props.selectedItem : 0
    };
  }

  componentDidUpdate(prevProps: WheelPickerProps, prevState: WheelPickerState) {
    if (prevState.selectedItem !== this.props.selectedItem) {
      this.setState({
        selectedItem: this.props.selectedItem ? this.props.selectedItem : 0
      });
    }
  }

  onItemSelected = (value: any, index: number) => {
    if (this.props.onItemSelected) {
      this.props.onItemSelected(index);
    }
    this.setState({ selectedItem: index });
  };

  render() {
    const data = this.props.data;
    if (!data || data.length < 0) return null;
    return (
      <Picker
        // {...this.props}
        style={this.props.style}
        selectedValue={data[this.state.selectedItem]}
        onValueChange={this.onItemSelected}
      >
        {this.props.data.map((i, index) => (
          <Picker.Item key={index} label={i} value={i} />
        ))}
      </Picker>
    );
  }
}
