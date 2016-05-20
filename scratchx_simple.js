(function(ext) {
    
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    /*定義した各ブロックの動作*/
    ext.Hello_scratchx = function() {
        alert("Hello_scratchx")
    };

    var descriptor = {//追加するブロックと呼ばれる関数のリスト
        blocks: [
          [' ', 'Hello_scratchx', 'Hello_scratchx'],
        ]
    };

    // エクステンションの種類や名前の定義
    ScratchExtensions.register('simple extension', descriptor, ext);
})({});
