var csv_content = 'あいうえお,かきくけこ,さしすせそ';

(function(ext) {
   ext._shutdown = function() {};
   ext._getStatus = function() {
       return {status: 2, msg: 'Ready'};
   };
  /*  var device = null;
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
          if(mes[0]===0x30){//receive message
              mes=mes.slice(1);
              mes=new TextDecoder("utf8").decode(mes);
              message=mes;
          }else{
              var mode=mes[0]&0xF0;
              if (mode===0x00) {
                blue=(mes[0]&1);
                red=(mes[0]&2)/2;
                green=(mes[0]&4)/4;
                yellow=(mes[0]&8)/8;
              }
          }
        });
      }


      ext.when_push = function(color) {
        switch (color) {
          case 'blue':
            return(blue===1);
          case 'red':
            return(red===1);
          case 'green':
            return(green===1);
          case 'yellow':
              return(yellow===1);
        }
    };
*/
    ext.DL_csv = function(color) {
        var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        var blob = new Blob([ bom, csv_content ], { "type" : "text/csv" });
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, "test.csv");
            window.navigator.msSaveOrOpenBlob(blob, "test.csv");
        }else{
            document.getElementById("download").href = window.URL.createObjectURL(blob);
        }
    };
   // Block and block menu descriptions


    var descriptor = {
        blocks: [
      //    ['h', 'when %m.color button pushed', 'when_push','blue'],
          [' ', 'DownLoad test.csv','DL_csv'],
        ],
      /*  menus: {
          color: ['blue ', 'red', 'green', 'yellow'],
        }*/
    };

/*    ext._deviceRemoved = function(dev) {
    if(device != dev) return;
    if(poller) poller = clearInterval(poller);
    device = null;
};

    ext._shutdown = function() {
    if(poller) poller = clearInterval(poller);
    if(device) device.close();
    device = null;
  };

  ext._getStatus = function() {
    if(!device) return {status: 1, msg: 'Device not connected'};
    return {status: 2, msg: 'Device connected'};
  };*/
    // Register the extension
  ScratchExtensions.register('DL_csv', descriptor, ext);
})({});
