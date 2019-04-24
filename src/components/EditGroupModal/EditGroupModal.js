/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalClose from '../Modal/ModalClose';
import EditGroupModalForm from './EditGroupModalForm';
import ImageEdit from '../ImageEdit/ImageEdit';
import Icon from '../Icon/Icon';
import styles from './EditGroupModal.css';
import type { Props, State } from './types';
import HotKeys from '../HotKeys/HotKeys';

class EditGroupModal extends PureComponent<Props, State> {
  static defaultProps = {
    isPublicGroupsEnabled: true,
    isUsersVisibleEnabled: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      screen: 'info',
      group: {
        name: props.group.name,
        about: props.group.about,
        shortname: props.group.shortname,
        avatar: props.group.avatar,
        isUsersVisible: props.group.isUsersVisible,
      },
    };
  }

  handleChange = (value: mixed, { target }: $FlowIssue) => {
    this.setState(({ group }) => {
      return {
        group: {
          ...group,
          [target.name]: value,
        },
      };
    });
  };

  handleChangeIsUsersVisible = (isUsersVisible: boolean): void => {
    this.setState(({ group }) => {
      return {
        group: {
          ...group,
          isUsersVisible,
        },
      };
    });
  };

  handleAvatarChange = (avatar: File): void => {
    this.setState(({ group }) => {
      return {
        screen: 'info',
        group: {
          ...group,
          avatar,
        },
      };
    });
  };

  handleAvatarRemove = (): void => {
    this.setState(({ group }) => {
      return {
        group: {
          ...group,
          avatar: null,
        },
      };
    });
  };

  handleAvatarEdit = (avatar: File): void => {
    this.setState(({ group }) => {
      return {
        screen: 'avatar',
        group: {
          ...group,
          avatar,
        },
      };
    });
  };

  handleGoToInfo = (): void => {
    this.setState(({ group }) => {
      return {
        screen: 'info',
        group: {
          ...group,
          avatar: this.props.group.avatar,
        },
      };
    });
  };

  handleSubmit = (event?: SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }

    this.props.onSubmit(this.props.group, this.state.group);
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      if (this.state.screen !== 'avatar') {
        this.handleSubmit();
      }
    }
  };

  isChanged(): boolean {
    const {
      context: { avatar, name, about, shortname },
    } = this.props;

    return (
      this.state.group.name !== name.value ||
      this.state.group.about !== about.value ||
      this.state.group.shortname !== shortname.value ||
      this.state.group.avatar !== avatar.value
    );
  }

  isPending(): boolean {
    const {
      context: { avatar, name, about, shortname },
    } = this.props;

    return avatar.pending || name.pending || about.pending || shortname.pending;
  }

  renderHeader() {
    switch (this.state.screen) {
      case 'info':
        return (
          <ModalHeader withBorder>
            <Text id={`EditGroupModal.title.${this.props.group.type}`} />
            <ModalClose
              pending={this.isPending()}
              onClick={this.props.onClose}
              id="edit_group_close_button"
            />
          </ModalHeader>
        );
      case 'avatar':
        return (
          <ModalHeader withBorder>
            <Icon
              glyph="arrow_back"
              onClick={this.handleGoToInfo}
              className={styles.back}
              id="edit_group_back_button"
              size={28}
            />
            <Text id="EditGroupModal.title.avatar" />
            <ModalClose
              pending={this.isPending()}
              onClick={this.props.onClose}
              id="edit_group_close_button"
            />
          </ModalHeader>
        );
      default:
        return null;
    }
  }

  renderForm() {
    return (
      <EditGroupModalForm
        className={styles.info}
        group={this.props.group}
        name={{ ...this.props.context.name, value: this.state.group.name }}
        about={{ ...this.props.context.about, value: this.state.group.about }}
        shortname={{
          ...this.props.context.shortname,
          value: this.state.group.shortname,
        }}
        avatar={this.state.group.avatar}
        shortnamePrefix={this.props.shortnamePrefix}
        isPublicGroupsEnabled={this.props.isPublicGroupsEnabled}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onAvatarChange={this.handleAvatarEdit}
        onAvatarRemove={this.handleAvatarRemove}
        isUsersVisible={this.state.group.isUsersVisible}
        onChangeIsUsersVisible={this.handleChangeIsUsersVisible}
        isUsersVisibleEnabled={this.props.isUsersVisibleEnabled}
      />
    );
  }

  renderAvatarEdit() {
    if (
      this.state.group.avatar &&
      typeof this.state.group.avatar !== 'string'
    ) {
      return (
        <ImageEdit
          image={this.state.group.avatar}
          type="circle"
          size={250}
          height={400}
          onSubmit={this.handleAvatarChange}
        />
      );
    }

    return null;
  }

  renderBody() {
    switch (this.state.screen) {
      case 'info':
        return (
          <ModalBody className={styles.body}>{this.renderForm()}</ModalBody>
        );
      case 'avatar':
        return (
          <ModalBody className={styles.body}>
            {this.renderAvatarEdit()}
          </ModalBody>
        );
      default:
        return null;
    }
  }

  renderFooter() {
    if (this.state.screen === 'info') {
      return (
        <ModalFooter className={styles.footer}>
          <Button
            wide
            theme="success"
            rounded={false}
            loading={this.isPending()}
            disabled={!this.isChanged() || this.isPending()}
            onClick={this.handleSubmit}
            id="edit_group_submit_button"
          >
            <Text id="EditGroupModal.submit" />
          </Button>
        </ModalFooter>
      );
    }

    return null;
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.props.onClose}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </Modal>
      </HotKeys>
    );
  }
}

export default EditGroupModal;
