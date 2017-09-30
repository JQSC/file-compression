////弹出窗口封装
angular.module('app').factory("eipDefaultDialog", ['ngDialog', '$timeout', function (ngDialog, $timeout) {
    return {
        open: function (msg) {
            return ngDialog.open({
                template: 'src/template/dialogMessage.html',
                className: 'ngdialog-theme-default',
                closeByDocument: true,
                showClose: true,
                controller: ['$scope', function ($scope) {
                    $scope.msgStr = msg;
                    $scope.csq = msg;
                }]
            });
        },
        show: function (msg, time) {
            time = isNaN(time) ? 1 : time * 1;
            return ngDialog.open({
                template: 'popContent',
                //className: 'popContent',
                closeByDocument: true,
                showClose: false,
                overlay:false, 
                controller: ['$scope', function ($scope) {
                    $scope.msgStr = msg;
                    $timeout(function () {
                        $scope.closeThisDialog();
                    }, time * 1000);
                }]
            });
        },
        confirm: function (msg) {
            return ngDialog.openConfirm({
                template: 'msgTwo',
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                showClose: true,
                controller: ['$scope', function ($scope) {
                    $scope.msgStr = msg;
                }]
            });
        }

    };
}]);

//弹窗加载loading层
angular.module('app').service("eipShowLoadingService", function () {
    return {
        //开始弹框
        start: function () {
            var contentHtml = '<div id="loadingMoal">' +
                       '<div style="position: fixed;top:30%;width: 100%;z-index:1050;" >' +
                           '<div style="position: relative;width:200px;margin:0px auto;">' +
                               '<div>' +
                              '<img src="src/assets/img/spinner.gif" />   Loading' +
                               '</div>' +
                           '</div>' +
                       '</div>' +
                       '<div class="modal-backdrop fade in" ></div>' +
                   '</div>';
            //将遮罩效果代码添加到body标签中
            $("body").append(contentHtml);
        },
        //停止弹框
        stop: function () {
            $("#loadingMoal").remove();
        },
        //判断是否弹框
        isLoading: function () {
            if ($("#loadingMoal").length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }
})