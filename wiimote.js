(function(ext) {
    var device = null;
    var input = null;
    var poller = null;
    var ext = this;
    var btn_a,btn_b,btn_up,btn_down,btn_left,btn_right,btn_1,btn_2,btn_plus,btn_minus,btn_home;
    var acc_x,acc_y,acc_z,acc_mag;
    var rumble_state,led_state;
    var LED=['□□□□','■□□□','□■□□','■■□□','□□■□','■□■□','□■■□','■■■□','□□□■','■□□■','□■□■','■■□■','□□■■','■□■■','□■■■','■■■■'];
    var LED_RUMBLE=[0x11,0x00];
    var MUTE=[0x19,0x04];
    var SETUP=[0x12,0x04,0x37];
    var GETSTATE=[0x15,0x00];
    var Sound_SETUP=[[0x14,0x04],
                    [0x19,0x04],
                    [0x16,0x04,0x20,0x00,0x09,0x01,0x01],
                    [0x16,0x04,0xA2,0x00,0x01,0x01,0x00],
                    [0x16,0x04,0xA2,0x00,0x02,0x01,0x00],
                    [0x16,0x04,0xA2,0x00,0x03,0x01,0x00],
                    [0x16,0x04,0xA2,0x00,0x04,0x01,0x00],
                    [0x16,0x04,0xA2,0x00,0x05,0x01,0x40],
                    [0x16,0x04,0xA2,0x00,0x06,0x01,0x00],
                    [0x16,0x04,0xA2,0x00,0x07,0x01,0x00],
                    [0x16,0x04,0xA2,0x00,0x08,0x01,0x01],
                  [0x16,0x04,0x20,0x00,0x09,0x01,0x01]];

    function read_callback(data) {
      var data_arr = new Uint8Array(data);
      console.log(data_arr);
      btn_a=(data_arr[2]&0X08)/0X08;
      btn_b=(data_arr[2]&0X04)/0X04;
      btn_up=(data_arr[1]&0X08)/0X08;
      btn_down=(data_arr[1]&0X04)/0X04;
      btn_left=(data_arr[1]&0X01)/0X01;
      btn_right=(data_arr[1]&0X02)/0X02;
      btn_1=(data_arr[2]&0X02)/0X02;
      btn_2=(data_arr[2]&0X01)/0X01;
      btn_plus=(data_arr[1]&0X10)/0X10;
      btn_minus=(data_arr[2]&0X10)/0X10;
      btn_home=(data_arr[2]&0X80)/0X80;

      acc_x=((data_arr[3]*4+(data_arr[1]&&0x60)/0x20)*2/1023-1)*100;
      acc_y=((data_arr[4]*4+(data_arr[1]&&0x40)/0x20)*2/1023-1)*100;
      acc_z=((data_arr[5]*4+(data_arr[1]&&0x20)/0x10)*2/1023-1)*100;
      acc_mag=Math.sqrt(acc_x*acc_x+acc_y*acc_y+acc_z*acc_z)/Math.sqrt(3);
    };
    ext.send_accel_axis = function(acc_axis) {
      switch (acc_axis) {
        case 'x軸加速度':
          return(acc_x);
        case 'y軸加速度':
          return(acc_y);
        case 'z軸加速度':
          return(acc_z);
        case '加速度の大きさ':
          return(acc_mag);
      }
    }
    function deviceOpened(dev) {
        if (dev == null) device = null;
        for (var i=0;i<7;i++){
          device.write(new Uint8Array(IR_SETUP[i]).buffer);
        }
        device.write(new Uint8Array(SETUP).buffer);
				device.read(read_callback,48);
        device.write(new Uint8Array(GETSTATE).buffer);
        poller = setInterval(function() {
            device.read(read_callback,64);
        }, 75);
    };
    ext._deviceConnected = function(dev) {
        if(device) return;
        device = dev;
        device.open(deviceOpened);
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
      console.log(btn_a);
      switch (button) {
        case 'a':
          console.log("a check");
          return(btn_a);
        case 'b':
          return(btn_b);
        case 'up':
          return(btn_up);
        case 'down':
            return(btn_down);
        case 'left':
            return(btn_left);
        case 'right':
            return(btn_right);
        case '1':
            return(btn_1);
        case '2':
            return(btn_2);
        case '+':
            return(btn_plus);
        case '-':
            return(btn_minus);
        case 'home':
            return(btn_home);
        default:
            return("err");
      }
    }

    ext.trunOnLED = function(led) {
				for (var led_num=0 ; led_num<16 ; led_num++){
  				if(LED[led_num]===led){break;};
				}
        led_state=led_num*16;
				LED_RUMBLE[1]=led_state+rumble_state;
        device.write(new Uint8Array(LED_RUMBLE).buffer);
    }

    ext.playFreq = function(freq,time) {
      Sound_SETUP[6][6]= ( 0xff00 & Math.round(6000000 /freq) )/0x100
      Sound_SETUP[5][6]=  0xff & Math.round(6000000 /freq)
      for (var i=0 ; i<14 ; i++){
        device.write(new Uint8Array(Sound_SETUP[i]).buffer);
      }
      setTimeout(sound_off, time*1000);
    }

    ext.sound_off = function() {
      device.write(new Uint8Array(MUTE).buffer);
    }



    ext.rumble_on = function(time) {
      rumble_state=1
      LED_RUMBLE[1]=led_state+rumble_state;
      device.write(new Uint8Array(LED_RUMBLE).buffer);
      setTimeout(rumble_off, time*1000);
    }

    ext.rumble_off = function() {
      rumble_state=0
      LED_RUMBLE[1]=led_state+rumble_state;
      device.write(new Uint8Array(LED_RUMBLE).buffer);
    }



    ext.when_accel = function(acc_axis,magnitude) {
      switch (acc_axis) {
        case 'x軸加速度':
          return(acc_x>magnitude);
        case 'y軸加速度':
          return(acc_y>magnitude);
        case 'z軸加速度':
          return(acc_z>magnitude);
        case '加速度の大きさ':
          return(acc_mag>magnitude);
        }
    }

    ext.when_push = function(button) {
      switch (button) {
        case 'a':
          return(btn_a===1);
        case 'b':
          return(btn_b===1);
        case 'up':
          return(btn_up===1);
        case 'down':
            return(btn_down===1);
        case 'left':
            return(btn_left===1);
        case 'right':
            return(btn_right===1);
        case '1':
            return(btn_1===1);
        case '2':
            return(btn_2===1);
        case '+':
            return(btn_plus===1);
        case '-':
            return(btn_minus===1);
        case 'home':
            return(btn_home===1);
      }
    }

    var descriptor = {
        blocks: [
            ['r', '%m.acc_axis の値','send_accel_axis','加速度の大きさ'],
            ['r', '%m.btton ボタンの値','get_button','a'],

      //    ['r', '赤外線ポインタの%m.ir_axis 軸の座標','send_ir_axis','x'],
      //    ['b', 'リモコンが画面が向いている','send_ir_find'],
            ['w', '周波数%n の音を%n 秒鳴らす','playFreq','262', '1'],
            [' ', '音を止める ','sound_off'],
            [' ', 'LEDを %m.led で点灯 ','trunOnLED','□□□□'],
            [' ', 'モーターを %n 秒振動させる ','rumble_on','0.5'],
            [' ', 'モーターの振動を止める ','rumble_off'],
            ['h', '%m.button ボタンが押されたとき', 'when_push','a'],
            ['h', '%m.acc_axis > %n のとき', 'when_accel','加速度の大きさ','40'],
        ],
        menus: {
          button:['a','b','up','down','left','right','1','2','+','-','home'],
          acc_axis:['x軸加速度','y軸加速度','z軸加速度','加速度の大きさ'],
          ir_axis:['x','y'],
          led:['□□□□','■□□□','□■□□','■■□□','□□■□','■□■□','□■■□','■■■□','□□□■','■□□■','□■□■','■■□■','□□■■','■□■■','□■■■','■■■■'],
        }
    };
    ScratchExtensions.register('Wiimote', descriptor, ext, {type: 'hid', vendor:0x057e, product:0x0306});
})();
