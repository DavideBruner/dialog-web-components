/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import * as React from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ActivityListItem from '../ActivityList/ActivityListItem';
import Icon from '../Icon/Icon';
import styles from './ActivityListMedia.css';

export type Props = {
  className?: string,
  onClick: () => mixed
};

function ActivityListMedia(props: Props) {
  const className = classNames(styles.container, props.className);

  return (
    <ActivityListItem className={className} onClick={props.onClick} id="activity_list_media">
      <Icon
        inverted
        glyph="collections"
        theme="info"
        className={styles.icon}
        size={28}
      />
      <Text
        tagName="div"
        id="ActivityListMedia.title"
        className={styles.text}
      />
      <Icon glyph="keyboard_arrow_right" className={styles.arrow} />
    </ActivityListItem>
  );
}

export default ActivityListMedia;
