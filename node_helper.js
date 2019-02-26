/* Magic Mirror
 * Module: VolumeControl
 *
 * By Tom Hirschberger
 * MIT Licensed.
 */

const NodeHelper = require('node_helper')
const execSync = require('child_process').execSync

module.exports = NodeHelper.create({

  start: function () {
    this.started = false
  },

  increaseVol(id, step){
    var curCommand = this.config.volUpByStepCmd.replace(/###ID###/g,id).replace(/###STEP###/g,step)
    return execSync(curCommand)
  },

  decreaseVol(id, step){
    var curCommand = this.config.volDownByStepCmd.replace(/###ID###/g,id).replace(/###STEP###/g,step)
    return execSync(curCommand)
  },

  setVol(id, value){
    var curCommand = this.config.volSetCmd.replace(/###ID###/g,id).replace(/###VALUE###/g,value)
    return execSync(curCommand)
  },

  getVol(id){
    var curCommand = this.config.volGetCmd.replace(/###ID###/g,id)
    return execSync(curCommand)
  },

  socketNotificationReceived: function (notification, payload) {
    const self = this
    if (notification === 'CONFIG' && self.started === false) {
      self.config = payload
      self.started = true
    } else if (notification === 'VOLUME_GET'){
      var curValue = self.getVol(self.config.id)
      if (self.config.alertTimer > 0){
        var curMessage = ''
        if((self.config.iconGet) && (self.config.iconGet !== "")){
          curMessage += '<i class="'+self.config.iconGet + '"></i>&emsp;'
        }
        curMessage += curValue
        curMessage += self.config.unit
        self.sendSocketNotification("SHOW_ALERT",{'title':'Volume', 'message':curMessage, 'timer':self.config.alertTimer})
      }
      self.sendSocketNotification("VOLUME_CURRENT",{id:"id", value:curValue+self.config.unit})
    } else if (notification === 'VOLUME_SET'){
      if(payload.value){
        self.setVol(self.config.id, payload.value)
      }
      var curValue = self.getVol(self.config.id)
      if (self.config.alertTimer > 0){
        var curMessage = ''
        if((self.config.iconGet) && (self.config.iconGet !== "")){
          curMessage += '<i class="'+self.config.iconGet + '"></i>&emsp;'
        }
        curMessage += curValue
        curMessage += self.config.unit
        self.sendSocketNotification("SHOW_ALERT",{'title':'Volume', 'message':curMessage, 'timer':self.config.alertTimer})
      }
      self.sendSocketNotification("VOLUME_CURRENT",{id:"id", value:curValue+self.config.unit})
    } else if (notification === 'VOLUME_UP'){
      var curStep = self.config.step
      if(payload.step){
        curStep = payload.step
      }

      self.increaseVol(self.config.id, curStep)

      var curValue = self.getVol(self.config.id)
      if (self.config.alertTimer > 0){
        var curMessage = ''
        if((self.config.iconUp) && (self.config.iconUp !== "")){
          curMessage += '<i class="'+self.config.iconUp + '"></i>&emsp;'
        }
        curMessage += curValue
        curMessage += self.config.unit
        self.sendSocketNotification("SHOW_ALERT",{'title':'Volume', 'message':curMessage, 'timer':self.config.alertTimer})
      }
      self.sendSocketNotification("VOLUME_CURRENT",{id:"id", value:curValue+self.config.unit})
    } else if (notification === 'VOLUME_DOWN'){
      var curStep = self.config.step
      if(payload.step){
        curStep = payload.step
      }

      self.decreaseVol(self.config.id, curStep)

      var curValue = self.getVol(self.config.id)
      if (self.config.alertTimer > 0){
        var curMessage = ''
        if((self.config.iconDown) && (self.config.iconDown !== "")){
          curMessage += '<i class="'+self.config.iconDown + '"></i>&emsp;'
        }
        curMessage += curValue
        curMessage += self.config.unit
        self.sendSocketNotification("SHOW_ALERT",{'title':'Volume', 'message':curMessage, 'timer':self.config.alertTimer})
      }
      self.sendSocketNotification("VOLUME_CURRENT",{id:"id", value:curValue+self.config.unit})
    }
  }
})
