var btn_state=[0,0,0,0,0,0,0,0,0,0,0];
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
        //device.write(GETSTATE);
        //device.write(SETUP);
        poller = setInterval(function() {
        }, 62.5);
    };
    ext._deviceConnected = function(dev) {
        if(device) return;

        device = dev;
        device.open(deviceOpened);

//        setInterval(function() { LED_RUMBLE }, 100);
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

    ext.readstart = function(button) {
      poller = setInterval(function() {
          device.read(read_callback,64);
          console.log()
      }, 62.5);
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
            [' ', '読み取り開始', 'readstart'],
            ['h', '%m.button ボタンが押されたとき', 'when_push','a'],
        ],
        menus: {
          button:['a','b','up','down','left','right','1','2','+','-','home'],
        }
    };
    ScratchExtensions.register('Wiimote', descriptor, ext, {type: 'hid', vendor:0x057e, product:0x0306});
})();
