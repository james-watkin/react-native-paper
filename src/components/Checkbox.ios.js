/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import color from 'color';
import Icon from './Icon';
import TouchableRipple from './TouchableRipple';
import withTheme from '../core/withTheme';
import type { Theme } from '../types/Theme';

type Props = {
  /**
   * Whether checkbox is checked
   */
  checked?: boolean,
  /**
   * Whether checkbox is disabled
   */
  disabled?: boolean,
  /**
   * Function to execute on press
   */
  onPress?: Function,
  /**
   * Custom color for checkbox
   */
  color?: string,
  theme: Theme,
};

/**
 * Checkboxes allow the selection of multiple options from a set
 */
class Checkbox extends Component<void, Props, void> {
  render() {
    const { checked, disabled, onPress, theme, ...rest } = this.props;

    const checkedColor = disabled
      ? theme.colors.disabled
      : this.props.color || theme.colors.accent;

    let rippleColor;

    if (disabled) {
      rippleColor = 'rgba(0, 0, 0, .16)';
    } else {
      rippleColor = color(checkedColor)
        .clearer(0.32)
        .rgbaString();
    }

    return (
      <TouchableRipple
        {...rest}
        borderless
        rippleColor={rippleColor}
        onPress={disabled ? undefined : onPress}
        style={styles.container}
      >
        <View style={styles.iconContainer}>
          {checked && (
            <Icon
              allowFontScaling={false}
              name={checked && 'done'}
              size={24}
              style={[styles.icon, { color: checkedColor }]}
            />
          )}
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
  },
  icon: {
    margin: 6,
  },
  iconContainer: {
    height: 36,
  },
});

export default withTheme(Checkbox);
