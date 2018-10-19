/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';
import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalClose from '../Modal/ModalClose';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ErrorMessage from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import InputNext from '../InputNext/InputNext';
import Icon from '../Icon/Icon';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import styles from './AddContactModal.css';
import HotKeys from '../HotKeys/HotKeys';

export type Props = {
  className?: string,
  query: string,
  error: ?Error,
  pending: boolean,
  added: boolean,
  contact: ?User,
  onClose: () => mixed,
  onChange: (query: string) => mixed,
  onSearch: (query: string) => mixed,
  onAdd: (id: number) => mixed,
  onOpenChat: (id: number) => mixed
};

class AddContactModal extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.handleSearch = debounce(this.handleSearch, 200);
  }

  handleSearch = (query: string): void => {
    this.props.onSearch(query);
  };

  handleQueryChange = (query: string): void => {
    this.handleSearch(query);
    this.props.onChange(query);
  };

  handleAddClick = (): void => {
    const { contact } = this.props;

    if (contact) {
      this.props.onAdd(contact.id);
    }
  };

  handleOpenChat = (): void => {
    const { contact } = this.props;

    if (contact) {
      this.props.onOpenChat(contact.id);
    }
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      const { added, contact } = this.props;
      if (added || (contact && contact.isContact)) {
        this.handleOpenChat();
      } else {
        this.handleAddClick();
      }
    }
  };

  isLocked(): boolean {
    const { pending, contact, query } = this.props;

    return pending || !contact || query === '';
  }

  renderStatus() {
    const { query, pending, contact } = this.props;

    if (!query) {
      return <Text id="AddContactModal.hint" className={styles.hint} />;
    }

    if (pending) {
      return <Spinner type="round" size="large" />;
    }

    if (contact) {
      if (contact.isContact) {
        return (
          <div>
            <div className={styles.addedAvatar}>
              <Avatar
                size={36}
                title={contact.name}
                image={contact.avatar}
                placeholder={contact.placeholder}
              />
              <Icon glyph="done" className={styles.iconSmall} inverted size={14} theme="success" />
            </div>
            <Text
              id="AddContactModal.user_in_contact"
              values={{ username: contact.name }}
              className={styles.found}
              html
            />
          </div>
        );
      }

      return (
        <div>
          <Avatar
            className={styles.foundAvatar}
            size={36}
            title={contact.name}
            image={contact.avatar}
            placeholder={contact.placeholder}
          />
          <Text
            id="AddContactModal.user_found"
            values={{ username: contact.name }}
            className={styles.found}
            html
          />
        </div>
      );
    }

    return <Text id="AddContactModal.not_found" className={styles.hint} />;
  }

  renderContact() {
    const { error, contact } = this.props;

    if (!contact) {
      return null;
    }

    if (error) {
      return (
        <div className={styles.contact}>
          <div className={styles.avatar}>
            <Avatar
              size={100}
              title={contact.name}
              image={contact.avatar}
              placeholder={contact.placeholder}
            />
            <Icon glyph="clear" className={styles.iconError} inverted theme="danger" size={32} />
          </div>
          <ErrorMessage className={styles.error}>{error.message}</ErrorMessage>
        </div>
      );
    }

    return (
      <div className={styles.contact}>
        <div className={styles.avatar}>
          <Avatar
            size={100}
            title={contact.name}
            image={contact.avatar}
            placeholder={contact.placeholder}
          />
          <Icon glyph="done" className={styles.icon} inverted theme="success" size={32} />
        </div>
        <Text
          id="AddContactModal.user_added"
          values={{ username: contact.name }}
          tagName="p"
          className={styles.text}
          html
        />
      </div>
    );
  }

  renderBody() {
    const { query, added } = this.props;

    if (added) {
      return <ModalBody className={styles.body}>{this.renderContact()}</ModalBody>;
    }

    return (
      <ModalBody className={styles.body}>
        <InputNext
          htmlAutoFocus
          className={styles.input}
          id="add_contact_query"
          type="text"
          value={query}
          placeholder="AddContactModal.placeholder"
          onChange={this.handleQueryChange}
        />
        <div className={styles.status}>{this.renderStatus()}</div>
      </ModalBody>
    );
  }

  renderFooter() {
    const { error, added, contact, query } = this.props;

    if (added || (contact && contact.isContact && query !== '')) {
      return (
        <ModalFooter className={styles.footer}>
          <Button
            wide
            theme="primary"
            rounded={false}
            disabled={Boolean(error)}
            onClick={this.handleOpenChat}
            id="add_contact_send_button"
          >
            <Text id="AddContactModal.button_send" />
          </Button>
        </ModalFooter>
      );
    }

    return (
      <ModalFooter className={styles.footer}>
        <Button
          wide
          theme="primary"
          rounded={false}
          disabled={this.isLocked()}
          onClick={this.handleAddClick}
          id="add_contact_add_button"
        >
          <Text id="AddContactModal.button_add" />
        </Button>
      </ModalFooter>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.props.onClose}>
          <ModalHeader withBorder>
            <Text id="AddContactModal.title" />
            <ModalClose onClick={this.props.onClose} id="add_contact_close_button" />
          </ModalHeader>
          {this.renderBody()}
          {this.renderFooter()}
        </Modal>
      </HotKeys>
    );
  }
}

export default AddContactModal;
