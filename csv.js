var csvContent = 'あいうえお,かきくけこ,さしすせそ';
var csvName="test.csv"
(function(ext) {
   ext._shutdown = function() {};
   ext._getStatus = function() {
       return {status: 2, msg: 'Ready'};
   };
   ext.DL_csv = function() {
     var blob = new Blob([csvContent]);
     var url = window.URL || window.webkitURL;
     var blobURL = url.createObjectURL(blob);
     var a = document.createElement('a');
     a.download = csvName;
     a.href = blobURL;
     a.click();
    };
   // Block and block menu descriptions
    var descriptor = {
       blocks: [
          [' ', 'DownLoad test.csv','DL_csv'],
       ],
    };
  ScratchExtensions.register('DL_csv', descriptor, ext);
})({});
