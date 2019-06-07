/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ListItem } from '@dlghq/markdown/src/types';
import React from 'react';
import classNames from 'classnames';
import MarkdownText from './MarkdownText';
import Checkbox from '../Checkbox/Checkbox';
import styles from './Markdown.css';

type MarkdownListProps = {
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
}: MarkdownListProps) {
  return (
    <ul className={styles.list}>
      {content.map((item, i) => {
        const isCheckbox = typeof item.done === 'boolean';
        const listItemClassName = classNames(styles.listItem, {
          [styles.listItemBoolean]: isCheckbox,
        });

        return (
          <li key={i} className={listItemClassName}>
            {isCheckbox ? (
              <Checkbox
                id={idPrefix + '_' + i}
                value={item.done}
                disabled={!isEditable}
                onChange={() => onChange(i, !item.done)}
                label={
                  <MarkdownText
                    tokens={item.content}
                    emojiSize={emojiSize}
                    isInline
                  />
                }
              />
            ) : (
              <MarkdownText
                tokens={item.content}
                emojiSize={emojiSize}
                isInline
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default MarkdownList;
