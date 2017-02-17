
new (function() {
    var device = null;
    var input = null;
    var poller = null;
    var ext = this;

    function read_callback(data) {
    };

    function deviceOpened(dev) {
        // if device fails to open, forget about it
        if (dev == null) device = null;
        // otherwise start polling
        poller = setInterval(function() {
          //  var data =  device.read(read_callback,48);
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
    ext.GPIO1on = function(pin) {
      write(0x0306);
    }

    var descriptor = {
        blocks: [
            [' ', 'GPIO1 on', 'GPIO1on'],
        ]
    };
    ScratchExtensions.register('MM-CP2112A', descriptor, ext, {type: 'hid', vendor:0x10C4, product:0xEA90});
})();
