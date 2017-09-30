//js 实时压缩
angular.module('app').controller('RealtimeCondCtrl', ["$scope", "$timeout", "eipDefaultDialog", "eipShowLoadingService", "$q", function ($scope, $timeout, eipDefaultDialog, eipShowLoadingService, $q) {
    const path = './test.js';
    const dist = './';
    let fs = require('./src/public/fs.js');
    let gulp = require('./src/public/gulpfile.js');
    let isShow = function () {
        if (eipShowLoadingService.isLoading()) {
            eipShowLoadingService.stop();//关闭弹框
        } else {
            eipShowLoadingService.start()
        }
    };
    let writeFileContent = function () {
        let defer = $q.defer();
        fs.writeFileJQ(path, $scope.codeOld, function (e) {
            if (e) {
                isShow()
                defer.reject("文件写入失败");
            }
            defer.resolve("文件写入成功");
        });
        return defer.promise;
    };
    let readRealTimeTask = function () {
        let defer = $q.defer();
        gulp.realTimeTask(path, dist, function (err) {
            if (err) {
                isShow()
                defer.reject("js代码格式错误!");
                eipDefaultDialog.open("js代码格式错误!", err.message);
            } else {
                defer.resolve("文件压缩成功");
            }
        });
        return defer.promise
    };
    let readFile = function () {
        let defer = $q.defer();
        fs.readFileJQ(path, function (data) {
            console.info("文件读取成功!")
            $scope.$apply(function () {
                $scope.codeNew = data
            })
            isShow()
            $q.resolve();
        });
        return defer.promise
    }
    $scope.minify = function () {
        if (typeof ($scope.codeOld) == "undefined" || !$scope.codeOld) {
            eipDefaultDialog.open("请输入要压缩的代码!");
            return false;
        };
        isShow();
        writeFileContent()
            .then(function () {
                return readRealTimeTask();
            })
            .then(function () {
                return readFile();
            })
    };
}])