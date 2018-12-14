/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthSession } from '@dlghq/dialog-types';
import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { LocalizationContextType, Text } from '@dlghq/react-l10n';
import Field from '../../Field/Field';
import Button from '../../Button/Button';
import styles from './Security.css';
import UAParser from 'ua-parser-js';

export type Props = {
  session: AuthSession,
  onSessionTerminate?: (id: number) => mixed,
};

class Session extends PureComponent<Props> {
  context: ProviderContext;

  static contextTypes = {
    l10n: LocalizationContextType,
  };

  handleTerminateClick = (): void => {
    const { session } = this.props;

    if (this.props.onSessionTerminate) {
      this.props.onSessionTerminate(session.id);
    }
  };

  renderTerminateButton() {
    if (!this.props.onSessionTerminate) {
      return null;
    }

    return (
      <Button
        size="small"
        theme="danger"
        onClick={this.handleTerminateClick}
        className={styles.terminateButton}
        id={`preferences_security_terminate_${this.props.session.id}_button`}
      >
        <Text id="PreferencesModal.security.terminate" />
      </Button>
    );
  }

  renderAuthTime() {
    const {
      l10n: { locale },
    } = this.context;
    const {
      session: { authTime },
    } = this.props;

    return (
      <time
        className={styles.sessionAuthTime}
        dateTime={authTime.toISOString()}
      >
        {authTime.toLocaleTimeString(locale, {
          hour: 'numeric',
          minute: 'numeric',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
    );
  }

  renderDeviceTitle() {
    const { session } = this.props;
    const parsed = UAParser(session.deviceTitle);
    let deviceTitle = '';

    if (parsed.browser.name || parsed.browser.os) {
      if (parsed.browser.name) {
        deviceTitle += parsed.browser.name;
        if (parsed.browser.version) {
          deviceTitle += ` ${parsed.browser.version}`;
        }
      }
      if (parsed.os.name) {
        if (parsed.browser.name) {
          deviceTitle += ', ';
        }
        deviceTitle += parsed.os.name;
        if (parsed.os.version) {
          deviceTitle += ` ${parsed.os.version}`;
        }
      }
    } else {
      deviceTitle = session.deviceTitle;
    }

    return <div className={styles.sessionDeviceTitle}>{deviceTitle}</div>;
  }

  render() {
    const { session } = this.props;

    return (
      <Field className={styles.session}>
        <div className={styles.sessionMeta}>
          <div className={styles.sessionTitle}>{session.appTitle}</div>
          {this.renderAuthTime()}
          {this.renderDeviceTitle()}
        </div>
        {this.renderTerminateButton()}
      </Field>
    );
  }
}

export default Session;
