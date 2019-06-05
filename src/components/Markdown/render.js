/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { BlockToken, TextToken } from '@dlghq/markdown/src/types';
import * as React from 'react';
import MarkdownText from './MarkdownText';
import MarkdownList from './MarkdownList';
import styles from './Markdown.css';

export function renderText(
  tokens: Array<TextToken>,
  isInline: boolean = false,
  emojiSize: number = 16,
) {
  return (
    <MarkdownText tokens={tokens} isInline={isInline} emojiSize={emojiSize} />
  );
}

function containsOnlyEmoji(tokens: Array<BlockToken>): boolean {
  if (tokens.length === 1) {
    const token = tokens[0];
    if (token.type === 'paragraph') {
      return token.content.every((child) => child.highlight === 'emoji');
    }
  }

  return false;
}

export function renderBlocks(
  tokens: Array<BlockToken>,
  renderBigEmoji: boolean,
  emojiSize: number = 16,
  idPrefix: string = 'md',
  isEditable: boolean = false,
) {
  const result = [];

  const isOnlyEmoji = containsOnlyEmoji(tokens);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (token.type) {
      case 'paragraph':
        if (token.content.length) {
          result.push(
            <p key={i} className={styles.paragraph}>
              {renderText(
                token.content,
                false,
                isOnlyEmoji && renderBigEmoji ? 44 : emojiSize,
              )}
            </p>,
          );
        } else {
          result.push(<br key={i} className={styles.break} />);
        }
        break;

      case 'code_block':
        result.push(
          <pre key={i} className={styles.pre}>
            <code>{token.content}</code>
          </pre>,
        );
        break;

      case 'blockquote':
        result.push(
          <blockquote key={i} className={styles.blockquote}>
            {renderBlocks(token.content, renderBigEmoji, emojiSize)}
          </blockquote>,
        );
        break;

      case 'list':
        result.push(
          <MarkdownList
            key={i}
            idPrefix={idPrefix}
            content={token.content}
            emojiSize={emojiSize}
            isEditable={isEditable}
            onChange={(id, value) =>
              console.log('checkbox changed', { id, value })
            }
          />,
        );
        break;

      default:
        // do nothing
        break;
    }
  }

  return result;
}
