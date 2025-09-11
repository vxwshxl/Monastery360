// AREventEmitter.js
import { DeviceEventEmitter } from 'react-native';

export const AREventEmitter = {
  emit: (event, data) => DeviceEventEmitter.emit(event, data),
  addListener: (event, callback) => DeviceEventEmitter.addListener(event, callback),
  removeListener: (event, callback) => DeviceEventEmitter.removeListener(event, callback),
};

// Event types for better type safety
export const AR_EVENTS = {
  TOGGLE_RESET: 'arToggleReset',
  WEBVIEW_OPENED: 'webviewOpened',
};