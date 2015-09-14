angular.module("vendorModule", [])
  .controller("mainController", function ($scope, $http, jsonFilter)
  {
  		 $scope.total2 = 123;
  	  $scope.getOrders = function (param) {
      console.log("getOrders");
      var url = "/v1/vendor/order/";
      url = url + param;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.orderlist = data;
          $scope.total2 = data.length;
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };
  });
 //  function getOrders(param)
 //  {
 // console.log("getOrders 123");
 //  }