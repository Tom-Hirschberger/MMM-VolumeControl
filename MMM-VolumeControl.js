/* global Module

/* Magic Mirror
 * Module: VolumeControl
 *
 * By Tom Hirschberger
 * MIT Licensed.
 */
Module.register('MMM-VolumeControl', {

  defaults: {
    id: 'PCM',
    step: '3',
    volGetCmd: 'amixer sget \'###ID###\' | grep -E -o \'[[:digit:]]+%\' | head -n 1| sed \'s/%//g\'',
    volUpByStepCmd: 'amixer sset \'###ID###\' ###STEP###%+',
    volDownByStepCmd: 'amixer sset \'###ID###\' ###STEP###%-',
    volSetByValueCmd: 'amixer sset \'###ID###\' ###VALUE###%',
    iconGet: 'fas fa-volume-up',
    iconUp: 'fas fa-volume-up',
    iconDown: 'fas fa-volume-down',
    alertTimer: 2000,
    unit: "%"
  },

  start: function () {
    console.error(this.name + ' is started')
    this.sendSocketNotification('CONFIG', this.config)
  },

  socketNotificationReceived: function (notification, payload) {
    this.sendNotification(notification, payload)
  },

  notificationReceived: function (notification, payload) {
    if ((notification === 'VOLUME_UP') ||
        (notification === 'VOLUME_DOWN') ||
        (notification === 'VOLUME_GET') ||
        (notification === 'VOLUME_SET'))
     {
      this.sendSocketNotification(notification, payload)
    }
  }
})
