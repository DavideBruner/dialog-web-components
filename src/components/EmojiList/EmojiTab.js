/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './EmojiList.css';
import Icon from '../Icon/Icon';

type Props = {
  name: string,
  glyph: string,
  active: boolean,
  disabled: ?boolean,
  onClick: (name: string) => mixed,
};

class EmojiTab extends PureComponent<Props> {
  static defaultProps = {
    disabled: false,
  };

  handleClick = (event: SyntheticMouseEvent<>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (!this.props.disabled) {
      this.props.onClick(this.props.name);
    }
  };

  render() {
    const className = classNames(styles.footerTabIcon, {
      [styles.active]: this.props.active,
      [styles.disabled]: this.props.disabled,
    });

    return (
      <div title={this.props.name} className={styles.footerTab}>
        <Icon
          glyph={this.props.glyph}
          className={className}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default EmojiTab;
