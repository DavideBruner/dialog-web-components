/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import ActivityListItem from '../ActivityList/ActivityListItem';
import ActivityMediaDocument from './ActivityMediaDocument/ActivityMediaDocument';
import ActivityMediaPhoto from './ActivityMediaPhoto/ActivityMediaPhoto';
import ActivityMediaVoice from './ActivityMediaVoice/ActivityMediaVoice';
import ActivityMediaVideo from './ActivityMediaVideo/ActivityMediaVideo';
import styles from './ActivityMedia.css';

type Props = {
  message: Message,
  onGoToMessage: (message: Message) => mixed,
  onLightboxOpen: (message: Message) => mixed,
};

class ActivityMediaItem extends PureComponent<Props> {
  handleGoToMessage = () => {
    this.props.onGoToMessage(this.props.message);
  };

  handleLightboxOpen = () => {
    this.props.onLightboxOpen(this.props.message);
  };

  render() {
    const { message } = this.props;

    switch (message.content.type) {
      case 'photo':
        return (
          <ActivityListItem
            onClick={this.handleGoToMessage}
            className={styles.item}
            withoutArrow
          >
            <ActivityMediaPhoto
              title={message.content.fileName}
              photo={message.content.fileUrl}
              preview={message.content.preview}
              sender={message.sender ? message.sender.title : null}
              onClick={this.handleLightboxOpen}
              date={message.fullDate}
            />
          </ActivityListItem>
        );
      case 'document':
        return (
          <ActivityListItem
            onClick={this.handleGoToMessage}
            className={styles.item}
            withoutArrow
          >
            <ActivityMediaDocument
              title={message.content.fileName}
              size={message.content.fileSize}
              extension={message.content.fileExtension}
              sender={message.sender ? message.sender.title : null}
              date={message.fullDate}
            />
          </ActivityListItem>
        );
      case 'voice':
        return (
          <ActivityListItem
            onClick={this.handleGoToMessage}
            className={styles.item}
            withoutArrow
          >
            <ActivityMediaVoice
              url={message.content.fileUrl}
              duration={message.content.duration}
              sender={message.sender ? message.sender.title : null}
            />
          </ActivityListItem>
        );
      case 'video':
        return (
          <ActivityListItem
            onClick={this.handleGoToMessage}
            className={styles.item}
            withoutArrow
          >
            <ActivityMediaVideo
              title={message.content.fileName}
              duration={message.content.duration}
              preview={message.content.preview}
              size={message.content.fileSize}
              sender={message.sender ? message.sender.title : null}
              date={message.fullDate}
            />
          </ActivityListItem>
        );
      default:
        console.warn('Unsupported message type');

        return null;
    }
  }
}

export default ActivityMediaItem;
