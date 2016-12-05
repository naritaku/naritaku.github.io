//  button['a','b','up','down','left','right','1','2','+','-','home'],
var btn_state=[0,0,0,0,0,0,0,0,0,0,0];
var dateMode=15;//states check
new (function() {
    var device = null;
    var input = null;
    var poller = null;
    var ext = this;

    function read_callback(data) {
      btn_arr = new Uint8Array(data);
      console.log(btn_arr);
        return btn_arr;
    };

    function btn_update(data) {
      if (data.length !== 0){
        btn_state[0]=data[2]&0X08/0X08;
        btn_state[1]=data[2]&0X04/0X04;
        btn_state[2]=data[1]&0X08/0X08;
        btn_state[3]=data[1]&0X04/0X04;
        btn_state[4]=data[1]&0X01/0X01;
        btn_state[5]=data[1]&0X02/0X02;
        btn_state[6]=data[2]&0X02/0X02;
        btn_state[7]=data[2]&0X01/0X01;
        btn_state[8]=data[1]&0X10/0X10;
        btn_state[9]=data[2]&0X10/0X10;
        btn_state[10]=data[2]&0X80/0X80;
      }
    };

    function deviceOpened(dev) {
        // if device fails to open, forget about it
        if (dev == null) device = null;

        // otherwise start polling

        poller = setInterval(function() {
            device.write(0xA21500);
            var data =  device.read(read_callback,48);
            btn_update(data);
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
      switch (button) {
        case 'a':
          return(btn_state[0]);
        case 'b':
          return(btn_state[1]);
        case 'up':
          return(btn_state[2]);
        case 'down':
            return(btn_state[3]);
        case 'left':
            return(btn_state[4]);
        case 'right':
            return(btn_state[5]);
        case '1':
            return(btn_state[6]);
        case '2':
            return(btn_state[7]);
        case '+':
            return(btn_state[8]);
        case '-':
            return(btn_state[9]);
        case 'home':
            return(btn_state[10]);
      }
    }
    var descriptor = {
        blocks: [
            ['r', '%m.button value','send_button','a'],

        ],
        menus: {
          button:['a','b','up','down','left','right','1','2','+','-','home'],
        }
    };
    ScratchExtensions.register('Wiimote', descriptor, ext, {type: 'hid', vendor:0x057e, product:0x0306});
})();
