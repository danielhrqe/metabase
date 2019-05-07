import React, { Component } from "react";
import PropTypes from "prop-types";
import { t } from "ttag";

import Button from "metabase/components/Button";
import Icon from "metabase/components/Icon";

import cx from "classnames";

export default class RunButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    isRunnable: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
    isDirty: PropTypes.bool.isRequired,
    isPreviewing: PropTypes.bool,
    onRun: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  };

  render() {
    let {
      isRunnable,
      isRunning,
      isDirty,
      isPreviewing,
      onRun,
      onCancel,
      className,
    } = this.props;
    let buttonText = null;
    let isSmall = false;
    if (isRunning) {
      buttonText = (
        <div className="flex align-center">
          <Icon className="sm-mr1" name="close" />
          <span className="hide sm-show">{t`Cancel`}</span>
        </div>
      );
    } else if (isRunnable && isDirty) {
      if (isPreviewing) {
        isSmall = true;
        buttonText = <Icon name="right" />;
      } else {
        buttonText = t`Get Answer`;
      }
    } else if (isRunnable && !isDirty) {
      buttonText = (
        <div className="flex align-center">
          <Icon className="sm-mr1" name="refresh" />
          <span className="hide sm-show">{t`Refresh`}</span>
        </div>
      );
    }
    return (
      <Button
        medium
        primary={isDirty}
        className={cx(
          "RunButton circular",
          {
            "RunButton--hidden": !buttonText,
            "text-medium": !isDirty,
            "text-brand-hover": !isDirty,
          },
          className,
        )}
        style={isSmall ? { minWidth: "5em" } : {}}
        onClick={isRunning ? onCancel : onRun}
      >
        {buttonText}
      </Button>
    );
  }
}
