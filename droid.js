var message ="";
var red=0;
var blue=0;
var green=0;
var yellow=0;
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
          var mes= new Uint8Array(data);
          console.log(mes);
          if(mes[0]===30){//receive message
            mes.shift();
            console.log(mes);
            var mes=new TextDecoder("utf8").decode(mes);
            console.log(mes);
            message=mes;
          }else{
            mes[0]=mes[0]&&0x10;
            if (mes[0]===0x00) {
              red=mes[0]&&0x01==0x01;
              bule=mes[0]&&0x02==0x02;
              green=mes[0]&&0x04==0x04;
              yellow=mes[0]&&0x08==0x08;
            }
          }
        });
      }

    ext.get_message = function() {
              return message;
    };
    ext.get_red = function() {
            return red;
    };
    ext.get_blue = function() {
            return blue;
    };
    ext.get_green = function() {
            return green;
    };
    ext.get_yellow = function() {
            return yellow;
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['r', 'message','get_message'];
          ['r', 'red_btn','get_red'];
          ['r', 'blue_btn','get_blue'];
          ['r', 'green_btn','get_green'];
          ['r', 'yellow_btn','get_yellow'];

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
