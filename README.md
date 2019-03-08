# MMM-VolumeControl
THIS MODULE WILL BE ARCHIVED. PLEASE USE https://github.com/eouia/MMM-Volume INSTEAD. IF SOMETHING IS MISSING I WILL TRY TO ADD IT TO THIS MODULE INSTEAD!

MMM-VolumeControl is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project by [Michael Teeuw](https://github.com/MichMich).

This modules controls the volume of a configurable amixer channel based on received notifications; the volume can either be decremented/incremented based on a configurable stepping in percentage or it can be set to a fixed percent value; if necessary the command which controls the volume can be overriden in the configuration. the module shows an alert after each action which displays the current value; also a notification can be send to get the current value; after each action a notification "VOLUME_CURRENT" with the id and value in the payload will be send. 

## Installation
    cd ~/MagicMirror/modules
    git clone git@github.com:Tom-Hirschberger/MMM-VolumeControl.git
    cd MMM-VolumeControl
    npm install


## Configuration
To use the module insert it in the config.js file. Here is an example:

    {
        module: 'MMM-VolumeControl',
        config: {
            id: 'PCM',
            step: '3',
          }
        }
    },


| Option  | Description | Type | Default |
| ------- | --- | --- | --- |
| id | the id of the device (channel) you want to control | String | PCM |
| step | how many units (default=%) should the volume be decremented/increamted in one step | Integer | 3 |
| alertTimer | how many milliseconds should the alerts be displayed (values smaller than 0 deactivate them) | String | 2000 |
| volGetCmd | the command which will be called to get the current volume (###ID### will automatically be replaced by the id) | String | amixer sget \'###ID###\' | grep -E -o \'[[:digit:]]+%\' | head -n 1| sed \'s/%//g\' |
| volUpByStepCmd | the command which will be called to increase the volume by one step (###ID### will automatically be replaced by the id, ###STEP### will be replaced by step) | String | amixer sget \'###ID###\' | amixer sset \'###ID###\' ###STEP###%+ |
| volDownByStepCmd | the command which will be called to decrease the volume by one step (###ID### will automatically be replaced by the id, ###STEP### will be replaced by step) | String | amixer sget \'###ID###\' | amixer sset \'###ID###\' ###STEP###%- |
| volSetByValueCmd | the command which will be called to set the volume to specific value (###ID### will automatically be replaced by the id, ###VALUE### will be replaced by value) | String | amixer sget \'###ID###\' | amixer sset \'###ID###\' ###VALUE###% |
| unit | the unit which is used in the alerts | String | % |
| iconGet | the font-awesome icon which is displayed in the current volume alert | String | fas fa-volume-up |
| iconUp | the font-awesome icon which is displayed in the volume increased alert | String | fas fa-volume-up |
| iconUp | the font-awesome icon which is displayed in the volume decreased alert | String | fas fa-volume-down |


| NOTFICATION | Result | payload |
| ------------| ------ | ------- |
| VOLUME_UP | Volume will be increased one step; a VOLUME_CURRENT notification will be send, an SHOW_ALERT notification will be send | {step: Integer} (optional) |
| VOLUME_DOWN | Volume will be decreased one step; a VOLUME_CURRENT notification will be send, an SHOW_ALERT notification will be send | {step: Integer} (optional) |
| VOLUME_GET | A VOLUME_CURRENT notification will be send, an SHOW_ALERT notification will be send | {step: Integer} (optional) |
| VOLUME_SET | Volume will be set to the value; a VOLUME_CURRENT notification will be send, an SHOW_ALERT notification will be send | {value: Integer} (mandatory) |
