var message ="";

(function(ext) {
    var device=null;
    var rawData = null;
    var potentialDevices = [];
    ext._deviceConnected = function(dev) {
        potentialDevices.push(dev);

        if (!device) {
            tryNextDevice();
        }
    }

    var poller = null;
    var watchdog = null;
    function tryNextDevice() {

        device = potentialDevices.shift();
        if (!device) return;

        device.open({ stopBits: 0, ctsFlowControl: 0 });
        device.set_receive_handler(function(data) {
            rawData = new Uint8Array(data);
            processData();
        });
      }
      var inputArray=0;
          function processData() {
              var bytes = new Uint8Array(rawData);

                  inputArray = 0;
                  var hb = bytes[i*2] & 127;
                  var channel = hb >> 3;
                  var lb = bytes[i*2+1] & 127;
                  inputArray = ((hb & 7) << 7) + lb;

                  message = inputArray[0];
              }



    ext.get_message = function() {
            return message;
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['r', 'message','get_message']
        ]
    };

    ext._deviceRemoved = function(dev) {
    if(device != dev) return;
    if(poller) poller = clearInterval(poller);
    device = null;
};

    ext._shutdown = function() {
    if(poller) poller = clearInterval(poller);
    if(device) device.close();
    device = null;
  }

  ext._getStatus = function() {
    if(!device) return {status: 1, msg: 'Device not connected'};
    return {status: 2, msg: 'Device connected'};
  };
    // Register the extension
  ScratchExtensions.register('Connect to android via Bluetooth', descriptor, ext, {type: 'serial'});
})({});
