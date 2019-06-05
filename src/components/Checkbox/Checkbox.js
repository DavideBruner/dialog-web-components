/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import styles from './Checkbox.css';

export type Props = {
  className?: string,
  label?: Node,
  id: string,
  value: boolean,
  disabled: boolean,
  tabIndex?: number,
  onChange: (event: SyntheticInputEvent<>) => mixed,
};

class Checkbox extends PureComponent<Props> {
  input: ?HTMLInputElement;

  static defaultProps = {
    value: false,
    disabled: false,
  };

  setInput = (input: ?HTMLInputElement): void => {
    this.input = input;
  };

  focus(): void {
    if (this.input) {
      this.input.focus();
    }
  }

  blur(): void {
    if (this.input) {
      this.input.blur();
    }
  }

  render() {
    const { id, value, label, disabled, tabIndex, onChange } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.checked]: value,
      [styles.disabled]: disabled,
    });

    return (
      <div className={className}>
        <input
          className={styles.checkbox}
          id={id}
          ref={this.setInput}
          type="checkbox"
          checked={value}
          tabIndex={tabIndex}
          disabled={disabled}
          onChange={onChange}
        />

        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
