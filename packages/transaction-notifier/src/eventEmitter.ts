import { Emitter } from './types';
export function createEmitter(): Emitter {
  return {
    listeners: {},
    on: function (eventCode, listener) {
      switch (eventCode) {
        case 'txSent':
        case 'txConfirmed':
        case 'txFailed':
        case 'txError':
          break;
        default:
          throw new Error('Not a valid event');
      }
      if (typeof listener !== 'function') {
        throw new Error('Listener must be a function');
      }
      this.listeners[eventCode] = listener;
    },
    emit: function (eventCode, data) {
      if (this.listeners[eventCode]) {
        return this.listeners[eventCode](data);
      }
    },
  };
}
