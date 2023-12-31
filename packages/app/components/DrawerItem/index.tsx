import color from 'color';
import * as React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '../index';
import { themeTeacher } from '../../containers/App/themes';

type Props = {
  /**
   * The label text of the item.
   */
  label: string;
  /**
   * Icon to display for the `DrawerItem`.
   */
  icon?: string;
  right?: any;
  /**
   * Whether to highlight the drawer item as active.
   */
  active?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
};

/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Drawer.Item label="First Item" />
 * );
 *
 * export default MyComponent;
 * ```
 */
class DrawerItem extends React.Component<Props> {
  static displayName = 'Drawer.Item';

  render() {
    const { icon, label, active, style, onPress, right, ...rest } = this.props;
    // const { colors, roundness } = theme;
    const backgroundColor = active
      ? color(themeTeacher.colors.primary)
          .alpha(0.12)
          .rgb()
          .string()
      : 'transparent';
    const contentColor = active
      ? themeTeacher.colors.primary
      : color(themeTeacher.colors.text)
          .alpha(0.68)
          .rgb()
          .string();
    const font = themeTeacher.fonts.medium;
    const labelMargin = icon ? 32 : 0;

    return (
      <View
        {...rest}
        style={[
          styles.container,
          { backgroundColor, borderRadius: themeTeacher.roundness },
          style
        ]}
      >
        <TouchableRipple
          borderless
          delayPressIn={0}
          onPress={onPress}
          style={{ borderRadius: themeTeacher.roundness }}
          accessibilityTraits={active ? ['button', 'selected'] : 'button'}
          accessibilityComponentType='button'
          accessibilityRole='button'
          accessibilityStates={active ? ['selected'] : []}
        >
          <View style={styles.wrapper}>
            {icon ? (
              <MaterialCommunityIcons
                name={icon}
                size={24}
                color={contentColor}
              />
            ) : null}
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                {
                  color: contentColor,
                  ...font,
                  marginLeft: labelMargin
                }
              ]}
            >
              {label}
            </Text>

            {right ? right : null}
          </View>
        </TouchableRipple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  label: {
    marginRight: 32
  }
});

export default DrawerItem;
