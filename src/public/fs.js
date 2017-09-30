const fs = require('fs');
//递归读取文件的目录结构
let readFile = function (tmp, fileTree) {
    fs.readdir(tmp, function (err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function (file) {
            fs.stat(tmp + file, function (err, stats) {
                let obj = {
                    fileName: file,
                    filePath: tmp + file + "/",
                    size: (stats.size / 1024).toFixed(2) + 'KB',
                    ctime: stats.ctime,
                    children: []
                }
                //判断是否为目录
                let isDirectorys = stats.isDirectory()
                if (isDirectorys) {
                    obj.size = ""
                    fileTree.push(obj)
                    readFile(tmp + file + "/", obj.children)
                } else if (file.indexOf(".js") >= 0) {
                    fileTree.push(obj)
                }

            })
        })
    })
};
let formatTmp = function (tmp) {
    let re = /^\\*$/g
    return tmp.replace(re, "\\\\")
};
//根据传入的初始路径获取文件的目录
let getFileDirectory = function (tmp) {
    //将文件路径进行格式化
    let fileTmp = tmp  //formatTmp(tmp)
    let fileTree = [];
    fileTmp = fileTmp || './src/lib/'
    readFile(fileTmp, fileTree)
    return fileTree
};

let writeFileJQ = function (path, data, callback) {
    fs.writeFile(path, data, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (err) {
        callback(err)
    })
};

let readFileJQ = function (path, callback) {
    fs.readFile(path, function (err, data) {
        if (err) {
            console.log("bad")
        } else {
            callback(data.toString())
        }
    })
};

exports.getFileDirectory = getFileDirectory;
exports.writeFileJQ = writeFileJQ;
exports.readFileJQ = readFileJQ;
