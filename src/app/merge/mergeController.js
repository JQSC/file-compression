//多文件合并压缩
angular.module('app').controller('mergeCtrl', ["$scope", "$timeout", "eipDefaultDialog", "eipShowLoadingService", function ($scope, $timeout, eipDefaultDialog, eipShowLoadingService) {

    let fs = require('./src/public/fs.js');
    let gulp = require('./src/public/gulpfile.js');
    const electron = require('electron');
    const dialog = electron.remote.dialog;
    //展示文件目录
    $scope.jsPath = "";
    $scope.createDirectory = function () {
        dialog.showOpenDialog({
            properties: ['openDirectory', 'createDirectory']
        }, function (path) {
            if(!path){
                return false
            }
            $scope.$apply(function () {
                $scope.jsPath = path
                $scope.jsPath = $scope.jsPath + "\\"
                let ml = fs.getFileDirectory($scope.jsPath)
                $timeout(function () {
                    $scope.treeData = ml
                }, 1000)
            })
        });
    }
    //打开目录
    $scope.openDirectory = function () {
        dialog.showOpenDialog({
            properties: ['openDirectory', 'createDirectory']
        }, function (path) {
            if(!path){
                return false
            }
            $scope.$apply(function () {
                $scope.distPath = path
                $scope.distPath = $scope.distPath + "\\"
            })
        });
    }
    //合并压缩
    $scope.distPath = ""
    let addTaskFile = function (treeData, arr) {
        treeData.forEach(function (o, n) {
            if (o.filePath.indexOf(".js") >= 0) {
                arr.push(o.filePath)
            }
            if (o.children.length > 0) {
                addTaskFile(o.children, arr)
            }
        })
    }
    let getTaskFile = function (treeData) {
        let arr = []
        addTaskFile(treeData, arr)
        return arr
    }
    $scope.mergeCatalogue = function () {
        if (!$scope.jsPath || !$scope.distPath) {
            eipDefaultDialog.open("压缩或输出目录为空!");
            return false
        }
        eipShowLoadingService.start();
        let directoryInfo = getTaskFile($scope.treeData)
        //启动合并压缩任务
        gulp.creatTask(directoryInfo, $scope.distPath, function (path) {
            let ifShow = eipShowLoadingService.isLoading();//是否弹框了
            if (ifShow) {
                eipShowLoadingService.stop();//关闭弹框
            }
            console.log(path)
        })

    }
}]);