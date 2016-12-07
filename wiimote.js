//  button['a','b','up','down','left','right','1','2','+','-','home'],
var btn_state=[0,0,0,0,0,0,0,0,0,0,0];
var led_state=1;
var rumble=0;

var dateMode=15;//states check
new (function() {
    var device = null;
    var input = null;
    var poller = null;
    var ext = this;

    function read_callback(data) {
      var btn_arr = new Uint8Array(data);
      console.log(btn_arr[1]);
      console.log((btn_arr[2]&0X08)/0X08);
      btn_state[0]=(btn_arr[2]&0X08)/0X08;
      btn_state[1]=(btn_arr[2]&0X04)/0X04;
      btn_state[2]=(btn_arr[1]&0X08)/0X08;
      btn_state[3]=(btn_arr[1]&0X04)/0X04;
      btn_state[4]=(btn_arr[1]&0X01)/0X01;
      btn_state[5]=(btn_arr[1]&0X02)/0X02;
      btn_state[6]=(btn_arr[2]&0X02)/0X02;
      btn_state[7]=(btn_arr[2]&0X01)/0X01;
      btn_state[8]=(btn_arr[1]&0X10)/0X10;
      btn_state[9]=(btn_arr[2]&0X10)/0X10;
      btn_state[10]=(btn_arr[2]&0X80)/0X80;
      console.log((btn_arr[2]&0X08)/0X08);
      console.log(btn_stare[0]);
    };

    function deviceOpened(dev) {
        // if device fails to open, forget about it
        if (dev == null) device = null;

        // otherwise start polling

        poller = setInterval(function() {
            device.write(0xA21500);
            device.read(read_callback,20);
            //device.write(0xA2120415);
            //var data =  device.read(read_callback,48);
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

    function trunOnLED(LED)
    {
        if ( LED>= 0 && LED<=15){
          led_state=Math.round(LED)
        }
    }

    function rumble_on(rumble_time) {
        rumble=1;
        setTimeout(rumble_off, 1000*rumble_time);
    }

    function rumble_off() {
        rumble=0;
    }


    ext.when_push = function(button) {
      switch (button) {
        case 'a':
          return(btn_state[0]===1);
        case 'b':
          return(btn_state[1]===1);
        case 'up':
          return(btn_state[2]===1);
        case 'down':
            return(btn_state[3]===1);
        case 'left':
            return(btn_state[4]===1);
        case 'right':
            return(btn_state[5]===1);
        case '1':
            return(btn_state[6]===1);
        case '2':
            return(btn_state[7]===1);
        case '+':
            return(btn_state[8]===1);
        case '-':
            return(btn_state[9]===1);
        case 'home':
            return(btn_state[10]===1);
      }
    }

    var descriptor = {
        blocks: [
            ['r', '%m.button ボタンの値','send_button','a'],
      //      ['r', '%m.acc_axis 軸の加速度の値','send_accel_axis','x'],
      //    ['r', '赤外線ポインタの%m.ir_axis 軸の座標','send_ir_axis','x'],
      //    ['b', 'リモコンが画面が向いている','send_ir_find'],
      //      ['r', '加速度の大きさ','send_accel_scale_magnitude','a'],
            [' ', 'LEDを %n で点灯 ','trunOnLED',1],
            [' ', '%n 秒間振動させる ','rumble_on',1],
            ['h', '%m.button ボタンが押されたとき', 'when_push','a'],
        ],
        menus: {
          button:['a','b','up','down','left','right','1','2','+','-','home'],
          acc_axis:['x','y','z'],
          ir_axis:['x','y'],
        }
    };
    ScratchExtensions.register('Wiimote', descriptor, ext, {type: 'hid', vendor:0x057e, product:0x0306});
})();
