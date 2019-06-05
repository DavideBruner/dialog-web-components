/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { TextToken } from '@dlghq/markdown/src/types';
import * as React from 'react';
import Emoji from '../Emoji/Emoji';
import styles from './Markdown.css';

type Props = {
  tokens: Array<TextToken>,
  isInline: boolean,
  emojiSize: number,
};

function MarkdownText({ tokens, isInline, emojiSize }: Props) {
  const result = [];

  for (let index = 0; index < tokens.length; index++) {
    const { content, highlight, options } = tokens[index];

    switch (highlight) {
      case 'link': {
        const url = (options && (options.url || options.href)) || content;
        const target = (options && options.target) || '_blank';

        result.push(
          <a
            key={index}
            className={styles.link}
            href={url}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {content}
          </a>,
        );

        break;
      }

      case 'email':
        result.push(
          <a
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            href={`mailto:${content}`}
          >
            {content}
          </a>,
        );

        break;

      case 'emoji':
        result.push(
          <Emoji
            key={index}
            char={content}
            size={emojiSize}
            inline={isInline}
            className={styles.emoji}
          />,
        );

        break;

      default: {
        const className = highlight ? styles[highlight] : null;

        result.push(
          <span key={index} className={className}>
            {content.split(/( {2,})/).map((string: string) => {
              if (
                string.length >= 2 &&
                string[0] === ' ' &&
                string[1] === ' '
              ) {
                return string.split('').map(() => ['\u00A0', '\u2063']);
              }

              return string;
            })}
          </span>,
        );
        break;
      }
    }
  }

  return result;
}

export default MarkdownText;
