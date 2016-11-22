
new (function() {
    var device = null;
    var input = null;
    var poller = null;
    var ext = this;

    var GPIO_inp='00000000';
    var GPIO_dir='00000000';
    var GPIO_out='--------';

    function callback(data) {
        input=data
    };

    function deviceOpened(dev) {
        // if device fails to open, forget about it
        if (dev == null) device = null;

        // otherwise start polling

        poller = setInterval(function() {
            input = device.read(48,callback);
            console.log(input[0]);
        }, 20);

    };
    ext._deviceConnected = function(dev) {
        if(device) return;

        device = dev;
        device.open(deviceOpened);

//        setInterval(function() { console.log(input); }, 100);
    };

    ext._deviceRemoved = function(dev) {
        if(device != dev) return;
        device = null;
        stopPolling();
    };

    function stopPolling() {
        if(poller) clearInterval(poller);
        poller = null;
    }

    ext._shutdown = function() {
        if(poller) clearInterval(poller);
        poller = null;

        if(device) device.close();
        device = null;
    }

    ext._getStatus = function() {
        if(!device) return {status: 1, msg: 'MM-CP2112A disconnected'};
        return {status: 2, msg: 'MM-CP2112A connected'};
    }

    // Converts a byte into a value of the range -1 -> 1 with two decimal places of precision
    function convertByteStr(byte) { return (parseInt(byte, 16) - 128) / 128; }
    ext.set_GPIOdirection = function(pin,direction) {
        /*var retval = null;
        switch(name) {
            case 'leftX': retval = convertByteStr(input[12] + input[13]); break;
            case 'leftY': retval = -convertByteStr(input[14] + input[15]); break;
            case 'rightX': retval = convertByteStr(input[16] + input[17]); break;
            case 'rightY': retval = -convertByteStr(input[18] + input[19]); break;
        }
        // If it's hardly off center then treat it as centered
        if(Math.abs(retval) < 0.1) retval = 0;
        return retval.toFixed(2)*/
        if(direction==='output'){
          GPIO_dir[7-pin]='1';
          GPIO_inp[7-pin]='-';
        }else{
          GPIO_dir[7-pin]='0';
          GPIO_out[7-pin]='-';
        }
    }
    ext.readGPIO = function(pin) {
      return GPIO_inp[7-pin]
    }
    ext.setGPIOvoltage = function(pin,level) {
      if(GPIO_dir[7-pin]!='-'){
        if(direction==='high'){
          GPIO_out[7-pin]='1';
        }else{
          GPIO_out[7-pin]='0';
        }
      }else{
        alert("GPIO"+pin+"is used as input!");
      }
    }

    var descriptor = {
        blocks: [
            [' ', 'set GPIO %m.port as %m.direction', 'set_GPIOdirection', '0','input'],
            ['r', 'GPIO %m.port value','readGPIO', '0'],
            [' ', 'set GPIO %m.port to %m.voltage','setGPIOvoltage','0','low']
        ],
        menus: {
          port:['0','1','2','3','4','5','6','7'],
          direction: ['input','output'],
          voltage: ['high','low']
        }
    };
    ScratchExtensions.register('MM-CP2112A', descriptor, ext, {type: 'hid', vendor:0x10C4, product:0xEA90});
})();
