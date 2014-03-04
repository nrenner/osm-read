var buf = require('./buffer.js');

function readBlobHeaderSize(fd, position, size, callback){
    var headerSize = new DataView(fd).getInt32(position, false);
    return callback(null, headerSize);
}

function readPBFElement(fd, position, size, pbfDecode, callback){
    //var buffer = new Uint8Array(fd, position, size);
    var buffer = new Uint8Array(size);
    buffer.set(new Uint8Array(fd, position, size));
    return buf.readPBFElementFromBuffer(buffer, pbfDecode, callback);
}

function getFileSize(fd, callback){
    return callback(null, fd.byteLength);
}

function open(opts, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', opts.filePath, true);
    xhr.responseType = 'arraybuffer';
    xhr.onerror = function(evt) {
        callback(new Error(this.status + ': ' + this.statusText));
    };
    xhr.onload = function(evt) {
        callback(null, this.response);
    };
    xhr.send();
}

function close(fd, callback){
    if (callback) {
        callback(null);
    }
}

module.exports = {
    readBlobHeaderSize: readBlobHeaderSize,
    readPBFElement: readPBFElement,
    getFileSize: getFileSize,
    open: open,
    close: close
};