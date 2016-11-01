var csv_content = 'あいうえお,かきくけこ,さしすせそ';

(function(ext) {
   ext._shutdown = function() {};
   ext._getStatus = function() {
       return {status: 2, msg: 'Ready'};
   };
   ext.DL_csv = function() {
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
          [' ', 'DownLoad test.csv','DL_csv'],
       ],
    };
  ScratchExtensions.register('DL_csv', descriptor, ext);
})({});
