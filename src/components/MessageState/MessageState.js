/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageState as MessageStateType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Tooltip from '../Tooltip/Tooltip';
import styles from './MessageState.css';

type Props = {
  className?: string,
  state: MessageStateType,
  time: string,
  fullTime: Date,
  isEdited?: boolean,
  hover: boolean,
  compact: boolean,
  onClick: () => mixed
};

class MessageState extends PureComponent<Props> {
  handleClick = (event: SyntheticMouseEvent<>): void => {
    event.preventDefault();
    event.stopPropagation();

    this.props.onClick();
  };

  renderTimestamp() {
    if (this.props.compact && !this.props.hover) {
      return null;
    }

    const time = (
      <time
        className={styles.time}
        onClick={this.handleClick}
        dateTime={this.props.fullTime.toISOString()}
      >
        {this.props.time}
      </time>
    );

    if (this.props.state === 'unknown') {
      return time;
    }

    return (
      <Tooltip text={`MessageState.${this.props.state}`} className={styles.tooltip}>{time}</Tooltip>
    );
  }

  renderRenderEdited() {
    if ((this.props.compact && this.props.hover) || !this.props.isEdited) {
      return null;
    }

    return (
      <Text key="edited" className={styles.edited} id="MessageState.edited" />
    );
  }

  render() {
    if (this.props.compact && !(this.props.hover || this.props.isEdited)) {
      return null;
    }

    const className = classNames(styles.container, this.props.className, {
      [styles.compact]: this.props.compact
    });
    const spacebars = (this.props.isEdited && !this.props.compact) ? '\u00A0\u00A0' : null;

    return (
      <div className={className}>
        {this.renderTimestamp()}
        {spacebars}
        {this.renderRenderEdited()}
      </div>
    );
  }
}

export default MessageState;
