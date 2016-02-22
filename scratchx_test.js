var color;


(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.Hello_scratchx = function() {
        alert("Hello_scratchx")
        // Code that gets executed when the block is run
    };
    ext.set_color = function(Red,Green,Blue) {
        color=Red*0x10000+Green*0x100+Blue
    };
    ext.send_color = function() {
            return color;
        };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          [' ', 'Hello_scratchx', 'Hello_scratchx'],
          [' ', 'set color R:%n, G:%n, B:%n', 'set_color',0,0,0],
          ['r', 'color','send_color'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});
