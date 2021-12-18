import React from 'react';
import { FontAwesomeIcon as FontAwesome } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import {
  faImages,
  faMusic,
  faVideo,
  faCircleNotch,
  faExclamationCircle,
  faPause,
  faPlay,
  faUser,
  faSignInAlt,
  faBalanceScale,
  faEdit,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

const IconComponent = (iconType) => {
  switch (iconType) {
    case 'calendar-alt':
      return faCalendarAlt;
    case 'images':
      return faImages;
    case 'music':
      return faMusic;
    case 'video':
      return faVideo;
    case 'circle-notch':
      return faCircleNotch;
    case 'exclamation-circle':
      return faExclamationCircle;
    case 'pause':
      return faPause;
    case 'play':
      return faPlay;
    case 'balance-scale':
      return faBalanceScale;
    case 'sign-in-alt':
      return faSignInAlt;
    case 'user':
      return faUser;
    case 'edit':
      return faEdit;
    case 'home':
      return faHome;
    default:
      throw new Error('not defined yet.');
  }
};

/**
 * @typedef {object} Props
 * @property {string} iconType
 */

/** @type {React.VFC<Props>} */
const FontAwesomeIcon = ({ iconType }) => {
  return <FontAwesome className="font-awesome inline-block leading-none fill-current" icon={IconComponent(iconType)} />;
};

export { FontAwesomeIcon };
