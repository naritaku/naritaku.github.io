(function(ext) {
    // shutdown���ɌĂ΂��
    ext._shutdown = function() {};

    // status��Ԃ��Ă��B�f�o�C�X�ƂȂ����ĂȂ����Ƃ������ŐF�X�Ԃ���B
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // block���Ăяo���ꂽ���ɌĂ΂��֐���o�^����B
    // ���ɂ���descriptor�Ńu���b�N�Ɗ֐��̂Ђ��t�����s���Ă���B
    ext.do_domething = function(str) {
    };

    // �u���b�N�Ɗ֐��̂Ђ��t��
    var descriptor = {
        blocks: [
            [' ', 'do_something %s', 'do_something', 'sample text'],
        ]
    };

    // �Ō��Extension��o�^����
    ScratchExtensions.register('Simple extension', descriptor, ext);
})({});