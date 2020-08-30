const COLOR = {
  BLACK: '30',
  RED: '31',
  GREEN: '32',
  YELLOW: '33',
  BLUE: '34',
  PINK: '35',
  CYAN: '36',
  GREY: '37',
};

/* eslint-disable no-console */
module.exports = class Logger {

  static error(...messages) {
    messages.map(message => Logger.show(message, COLOR.RED));
  }

  static success(...messages) {
    messages.map(message => Logger.show(message, COLOR.GREEN));
  }

  static warning(...messages) {
    messages.map(message => Logger.show(message, COLOR.YELLOW));
  }

  static info(...messages) {
    messages.map(message => Logger.show(message, COLOR.CYAN));
  }

  static log(...messages) {
    messages.map(message => Logger.show(message));
  }

  static raw(...messages) {
    if (process.env.NODE_ENV === 'test' && process.env.DEBUG !== 'true') { return null; }
    messages.map(message => console.log(message));
  }

  static stringify(...messages) {
    if (process.env.NODE_ENV === 'test' && process.env.DEBUG !== 'true') { return null; }
    messages.map(message => console.log(JSON.stringify(message)));
  }

  static debug(message) {
    Logger.show(JSON.stringify(message), COLOR.YELLOW);
    return message;
  }

  static show(message, color) {
    const string = (typeof message === 'string' || typeof message === 'number')
      ? message : message;
    if (!color) console.log(string);
    else console.log(`\x1b[${color}m${string}\x1b[0m`);
  }

};