/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ListItem } from '@dlghq/markdown/src/types';
import * as React from 'react';
import MarkdownText from './MarkdownText';
import styles from './Markdown.css';
import Checkbox from '../Checkbox/Checkbox';

type Props = {
  idPrefix: string,
  content: Array<ListItem>,
  emojiSize: number,
  isEditable: boolean,
  onChange: (idx: Number, value: boolean) => void,
};

function MarkdownList({
  idPrefix,
  content,
  emojiSize,
  isEditable,
  onChange,
}: Props) {
  return (
    <ul className={styles.list}>
      {content.map((item, i) => (
        <li key={i} className={styles.listItem}>
          {typeof item.done === 'boolean' ? (
            <Checkbox
              id={idPrefix + '_' + i}
              value={item.done}
              disabled={!isEditable}
              onChange={() => onChange(i, !item.done)}
            />
          ) : null}
          <MarkdownText tokens={item.content} emojiSize={emojiSize} isInline />
        </li>
      ))}
    </ul>
  );
}

export default MarkdownList;
