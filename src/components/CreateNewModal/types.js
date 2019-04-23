/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { PeerInfo } from '@dlghq/dialog-types';

export type Request = {
  type: 'group' | 'channel',
  title: string,
  shortname: string,
  about: string,
  avatar: ?File,
  members: SelectorState<PeerInfo>,
  isUsersVisible: ?boolean,
};

export type Step = 'type' | 'info' | 'avatar' | 'members';

export type Props = {
  id: string,
  className?: string,
  step: Step,
  error: ?string,
  pending: boolean,
  request: Request,
  shortnamePrefix?: ?string,
  autoFocus: boolean,
  maxGroupSize: number,
  isPublicGroupsEnabled: boolean,
  onClose: () => mixed,
  onSubmit: (request: Request) => mixed,
  onStepChange: (step: Step) => mixed,
  onRequestChange: (request: Request) => mixed,
  isMaxGroupSizeVisible: boolean,
  isUsersVisibleEnabled: ?boolean,
  onChangeIsUsersVisible: (isUsersVisible: boolean) => mixed,
};
