var connectionId=0
var reportId=0;
var SEND_GPIO = new ArrayBuffer(1);
var dev = new Object();
dev.vendorId = 0x10C4;
dev.productId = 0xEA90;
dev.filters = 1969;
var devid=0;

(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    ext.get_dev = function(color) {
      chrome.hid.getDevices(dev, dev_info)
    };

    ext.start_hid = function() {
      chrome.hid.connect(devid, connect_callback);
    };

    ext.receive_hid = function() {
      chrome.hid.connect(connectionId, receive_callback);
    };

    ext.send_hid = function() {
      chrome.hid.connect(connectionId, send_callback);
    };

    function connect_callback(hid){
      connectionId = hid.connectionId;
    }

    function dev_info(device) {
      console.log(device.deviceid);
    };

    function receive_callback(rId,data) {
      if(rId===reportId){
        var read_arr = new Uint8Array(data);
      }
    }

    function send_callback() {
      ext.receive_hid() 
    }

    // Block and block menu descriptions
    var descriptor = {
      blocks: [
          [' ', 'HID通信の開始','start_hid'],
          [' ', 'HIDの書き込み','write_hid'],
          [' ', 'HIDの読み込み','read_hid'],
          [' ', 'get HIDdevice','get_dev'],
      ],
      menus: {
        GPIO_direction:['input','output'],
      }
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});
