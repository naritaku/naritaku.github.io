(function(ext) {
    var device = null;
    var input = null;
    var poller = null;
    var ext = this;

    function read_callback(data) {
      var data_arr = new Uint8Array(data);
      console.log(data_arr);
    };

    function deviceOpened(dev) {
        // if device fails to open, forget about it
        if (dev == null) device = null;
        poller = setInterval(function() {
            device.read(read_callback,64);
        }, 62.5);
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
        if(!device) return {status: 1, msg: 'disconnected'};
        return {status: 2, msg: 'connected'};
    }


    ext.mes3 = function(a,b,c) {
      device.write([a,b,c]);
      device.read(read_callback,64);
    }

    ext.mes2 = function(a,b) {
      device.write([a,b]);
      device.read(read_callback,64);
    }

    ext.mes1 = function(a) {
      device.write([a]);
      device.read(read_callback,64);
    }

    var descriptor = {
        blocks: [
            [' ', 'HID書き込み %n ','mes1','a'],
            [' ', 'HID書き込み %n , %n ','mes2','a','b'],
            [' ', 'HID書き込み %n , %n , %n','mes3','a','b','c'],
        ],
        menus: {
        }
    };
    ScratchExtensions.register('MMCP2112', descriptor, ext, {type: 'hid', vendor:0x10C4, product:0xEA90});
})();
