
new (function() {
    var device = null;
    var input = null;
    var poller = null;
    var ext = this;

    function arangedata(data) {
        console.log(data);
        console.log(data[0]);
        return new Float64Array(data);
    };

    function deviceOpened(dev) {
        // if device fails to open, forget about it
        if (dev == null) device = null;

        // otherwise start polling

        poller = setInterval(function() {
            input =  device.read(arangedata,48);
            console.log(input);
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
        if(!device) return {status: 1, msg: 'disconnected'};
        return {status: 2, msg: 'connected'};
    }

    // Converts a byte into a value of the range -1 -> 1 with two decimal places of precision
//    function convertByteStr(byte) { return (parseInt(byte, 16) - 128) / 128; }
    ext.send_button = function(buttton) {
      return button;
    }
    var descriptor = {
        blocks: [
            ['r', '%m.button value','send_button'],

        ],
        menus: {
          button:['a','b','1','2','+','-','home'],
        }
    };
    ScratchExtensions.register('Wiimote', descriptor, ext, {type: 'hid', vendor:0x057e, product:0x0306});
})();
