var btn_state=[0,0,0,0,0,0,0,0,0,0,0];
var LED=['□□□□','□□□■','□□■□','□□■■','□■□□','□■□■','□■■□','□■■■','■□□□','■□□■','■□■□','■□■■','■■□□','■■□■','■■■□','■■■■'];
var led_state=1;
var SETUP=[0xA2,0x12,0x04,0x33];
var GETSTATE=[0xA2,0x15,0x00];
var led_rumble=[0xA2,0x11,0x00];
(function(ext) {
    var device = null;
    var input = null;
    var poller = null;
    var ext = this;

    function read_callback(data) {
      var btn_arr = new Uint8Array(data);
      console.log(btn_arr);
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
    };

    function deviceOpened(dev) {
        // if device fails to open, forget about it
        if (dev == null) device = null;
        // otherwise start polling
        device.write(SETUP);
        poller = setInterval(function() {
            device.write(GETSTATE);
            device.read(read_callback,64);
            //device.write(0xA2120415);
            //var data =  device.read(read_callback,48);
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


    ext.get_button = function(buttton) {
      console.log(button);
      console.log(btn_state[0]);
      switch (button) {
        case 'a':
          console.log("a check");
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
        default:
            return("err");
      }
    }

    ext.trunOnLED = function(led) {
      for (var i=0 ; i<=15 ; i++){}
        if (led=== LED[i]){
          led_state=i
          console.log(led_state);
          led_rumble[2]=led_rumble[2]%16+led_state*16;
          device.write(led_rumble);
          device.read(read_callback,64);
        }
    }

    ext.rumble_on = function() {
        led_rumble[2]= led_state*16+1 ;
        console.log(led_rumble)
        device.write(led_rumble);
        device.read(read_callback,64);
        setTimeout(rumble_off, 1000*rumble_time);
    }

    ext.rumble_off = function() {
      led_rumble[2]=led_state*16;
      device.write( led_rumble);
      device.read(read_callback,64);
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
            ['r', '%m.button ボタンの値','get_button','a'],

      //      ['r', '%m.acc_axis 軸の加速度の値','send_accel_axis','x'],
      //    ['r', '赤外線ポインタの%m.ir_axis 軸の座標','send_ir_axis','x'],
      //    ['b', 'リモコンが画面が向いている','send_ir_find'],
      //      ['r', '加速度の大きさ','send_accel_scale_magnitude','a'],
            [' ', 'LEDを %m.led で点灯 ','trunOnLED','□□□□'],
            [' ', 'モーターを振動させる ','rumble_on'],
            ['h', '%m.button ボタンが押されたとき', 'when_push','a'],
        ],
        menus: {
          button:['a','b','up','down','left','right','1','2','+','-','home'],
          acc_axis:['x','y','z'],
          ir_axis:['x','y'],
          led:['□□□□','□□□■','□□■□','□□■■','□■□□','□■□■','□■■□','□■■■','■□□□','■□□■','■□■□','■□■■','■■□□','■■□■','■■■□','■■■■',],
        }
    };
    ScratchExtensions.register('Wiimote', descriptor, ext, {type: 'hid', vendor:0x057e, product:0x0306});
})();
