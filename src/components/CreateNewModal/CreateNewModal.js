/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { Props } from './types';
import type { SelectorState } from '../../entities';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import CreateGroupTypeForm from './CreateGroupTypeForm';
import CreateGroupInfoForm from './CreateGroupInfoForm';
import CreateGroupMembersForm from './CreateGroupMembersForm';
import ImageEdit from '../ImageEdit/ImageEdit';
import styles from './CreateNewModal.css';
import HotKeys from '../HotKeys/HotKeys';

class CreateNewModal extends PureComponent<Props> {
  static defaultProps = {
    id: 'create_new_modal',
    isPublicGroupsEnabled: true,
    isMaxGroupSizeVisible: false,
    isUsersVisibleEnabled: false,
  };

  handlePrevStepClick = (): void => {
    const { step } = this.props;

    if (step === 'info') {
      this.props.onStepChange('type');
    }

    if (step === 'members') {
      this.props.onStepChange('info');
    }
  };

  handleNextStepClick = (): void => {
    const { step } = this.props;

    if (step === 'type') {
      this.props.onStepChange('info');
    }

    if (step === 'info') {
      this.props.onStepChange('members');
    }
  };

  handleChange = (value: string, { target }: SyntheticInputEvent<>) => {
    this.props.onRequestChange({
      ...this.props.request,
      [target.name]: value,
    });
  };

  handleMembersChange = (members: SelectorState<PeerInfo>): void => {
    this.props.onRequestChange({
      ...this.props.request,
      members,
    });
  };

  handleAvatarChange = (avatar: File): void => {
    this.props.onRequestChange({
      ...this.props.request,
      avatar,
    });
    this.props.onStepChange('info');
  };

  handleAvatarRemove = (): void => {
    this.props.onRequestChange({
      ...this.props.request,
      avatar: null,
    });
  };

  handleAvatarEdit = (avatar: File): void => {
    this.props.onRequestChange({
      ...this.props.request,
      avatar,
    });
    this.props.onStepChange('avatar');
  };

  handleSubmit = (event: ?SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }
    this.props.onSubmit(this.props.request);
  };

  handleCancelAvatarEdit = (): void => {
    this.props.onStepChange('info');
  };

  handleChangeIsUsersVisible = (isUsersVisible: boolean): void => {
    if (this.props.onChangeIsUsersVisible) {
      this.props.onChangeIsUsersVisible(isUsersVisible);
    }
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      switch (this.props.step) {
        case 'avatar':
          // do nothing because ImageEdit has own HotKeys handlers
          break;
        case 'members':
          this.handleSubmit();
          break;
        default:
          this.handleNextStepClick();
      }
    }
  };

  isMaxGroupSizeExceeded(): boolean {
    const {
      maxGroupSize,
      request: { type, members },
    } = this.props;
    const membersCount = members.getSelected().size;

    return type === 'group' && membersCount > maxGroupSize;
  }

  renderError() {
    const { error } = this.props;

    if (this.isMaxGroupSizeExceeded()) {
      return (
        <div className={styles.error}>
          <Text id="CreateNewModal.group.error.max_group_size" />
        </div>
      );
    }

    if (!error) {
      return null;
    }

    return (
      <div className={styles.error}>
        <Text id={error} />
      </div>
    );
  }

  renderTypeStep() {
    const {
      id,
      maxGroupSize,
      request: { type },
      step,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Text id={`CreateNewModal.${type}.title`} />
          <ModalClose
            pending={this.props.pending}
            onClick={this.props.onClose}
            id={`${this.props.id}_close_button`}
          />
        </ModalHeader>
        {this.renderError()}
        <ModalBody className={styles.body}>
          <CreateGroupTypeForm
            id={id}
            type={type}
            maxGroupSize={maxGroupSize}
            onChange={this.handleChange}
            onSubmit={this.handleNextStepClick}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            wide
            form={id}
            id={`${id}_step_${step}_submit_button`}
            type="submit"
            theme="success"
            rounded={false}
            onClick={this.handleNextStepClick}
          >
            <Text id={`CreateNewModal.next.${step}`} />
          </Button>
        </ModalFooter>
      </div>
    );
  }

  renderInfoStep() {
    const {
      id,
      step,
      request: { type, about, title, shortname, avatar, isUsersVisible },
      shortnamePrefix,
      isUsersVisibleEnabled,
      isPublicGroupsEnabled,
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handlePrevStepClick}
            className={styles.back}
          />
          <Text id={`CreateNewModal.${type}.title`} />
          <ModalClose
            pending={this.props.pending}
            onClick={this.props.onClose}
            id={`${this.props.id}_close_button`}
          />
        </ModalHeader>
        {this.renderError()}
        <ModalBody className={styles.body}>
          <CreateGroupInfoForm
            vertical
            id={id}
            type={type}
            about={about}
            title={title}
            avatar={avatar}
            shortname={shortname}
            shortnamePrefix={shortnamePrefix}
            onChange={this.handleChange}
            onSubmit={this.handleNextStepClick}
            onAvatarRemove={this.handleAvatarRemove}
            onAvatarChange={this.handleAvatarEdit}
            isPublicGroupsEnabled={isPublicGroupsEnabled}
            isUsersVisible={isUsersVisible}
            isUsersVisibleEnabled={isUsersVisibleEnabled}
            onChangeIsUsersVisible={this.handleChangeIsUsersVisible}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            wide
            id={`${id}_step_${step}_submit_button`}
            type="submit"
            theme="success"
            rounded={false}
            onClick={this.handleNextStepClick}
          >
            <Text id={`CreateNewModal.next.${step}`} />
          </Button>
        </ModalFooter>
      </div>
    );
  }

  renderAvatarStep() {
    const {
      request: { avatar },
    } = this.props;

    if (avatar && typeof avatar !== 'string') {
      return (
        <div className={styles.wrapper}>
          <ModalHeader className={styles.header} withBorder>
            <Icon
              glyph="arrow_back"
              onClick={this.handleCancelAvatarEdit}
              className={styles.back}
              id={`${this.props.id}_back_button`}
            />
            <Text id="CreateNewModal.avatar_edit" />
            <ModalClose
              pending={this.props.pending}
              onClick={this.props.onClose}
              id={`${this.props.id}_close_button`}
            />
          </ModalHeader>
          {this.renderError()}
          <ModalBody className={styles.body}>
            <ImageEdit
              image={avatar}
              type="circle"
              size={250}
              height={400}
              onSubmit={this.handleAvatarChange}
            />
          </ModalBody>
        </div>
      );
    }

    return null;
  }

  renderMembersCount() {
    const {
      request: { type, members },
      maxGroupSize,
      isMaxGroupSizeVisible,
    } = this.props;

    if (type !== 'group') {
      return null;
    }

    const membersCount = members.getSelected().size;
    const membersCountClassNames = classNames(styles.membersCount, {
      [styles.membersCountError]: this.isMaxGroupSizeExceeded(),
    });

    return (
      <small className={membersCountClassNames}>
        {`(${membersCount}${isMaxGroupSizeVisible ? '/' + maxGroupSize : ''})`}
      </small>
    );
  }

  renderMembersStep() {
    const {
      id,
      request: { type, members },
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handlePrevStepClick}
            className={styles.back}
            id={`${id}_back_button`}
          />
          <Text id={`CreateNewModal.${type}.title`} />
          {this.renderMembersCount()}
          <ModalClose
            pending={this.props.pending}
            onClick={this.props.onClose}
            id={`${id}_close_button`}
          />
        </ModalHeader>
        {this.renderError()}
        <ModalBody className={styles.body}>
          <CreateGroupMembersForm
            members={members}
            autoFocus={this.props.autoFocus}
            onChange={this.handleMembersChange}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            onClick={this.handleSubmit}
            rounded={false}
            type="submit"
            theme="success"
            loading={this.props.pending}
            disabled={this.isMaxGroupSizeExceeded() || this.props.pending}
            id={`${id}_finish_button`}
            wide
          >
            <Text id={`CreateNewModal.${type}.finish`} />
          </Button>
        </ModalFooter>
      </div>
    );
  }

  renderStep() {
    const { step } = this.props;

    switch (step) {
      case 'type':
        return this.renderTypeStep();
      case 'info':
        return this.renderInfoStep();
      case 'avatar':
        return this.renderAvatarStep();
      case 'members':
        return this.renderMembersStep();
      default:
        return null;
    }
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.props.onClose}>
          {this.renderStep()}
        </Modal>
      </HotKeys>
    );
  }
}

export default CreateNewModal;
