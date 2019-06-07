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
  onChange: (idx: number, value: boolean) => void,
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
      {content.map((item, index) => {
        const isCheckbox = typeof item.done === 'boolean';
        const listItemClassName = classNames(styles.listItem, {
          [styles.listItemBoolean]: isCheckbox,
        });

        function handleChange() {
          onChange(index, !item.done);
        }

        return (
          <li key={index} className={listItemClassName}>
            {isCheckbox ? (
              <Checkbox
                id={idPrefix + '_' + index}
                value={item.done}
                disabled={!isEditable}
                onChange={handleChange}
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
