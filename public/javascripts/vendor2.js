app = angular.module("vendorModule", []);
  app.controller("mainController", function ($scope, $http, jsonFilter)
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
          $scope.getOrderSummary(param);
          $scope.getMenuList(param);
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };


    $scope.getOrderSummary = function (param) {
      console.log("getOrdersummary");
      var url2 = "/v1/vendor/order/summary/";
      url2 = url2 + param;
      $http.get(url2)
        .success(function (data, status, headers, config)
        {
          $scope.orderSummarylist = data;
          
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

   
  });

  app.controller("menuController", function ($scope, $http, jsonFilter)
  {
 $scope.getMenuList = function (param) {
      console.log("getmenulist");
      var url3 = "/v1/vendor/menu/";
      url3 = url3 + param;
      $http.get(url3)
        .success(function (data, status, headers, config)
        {
          $scope.menuList = data;
          
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

    $scope.addMenu = function (param) {
      console.log("addMenu");
       console.log( $scope.fooditem);
      var url4 = "/v1/vendor/menu/";
      url4 = url4 + param;
      var postData={fooditem:$scope.fooditem,foodprice:$scope.foodprice};
      $http.post(url4,postData)
        .success(function (data, status, headers, config)
        {
           console.log("success add");
           console.log(data);
        })
        .error(function (data, status, headers, config)
        {
           getMenuList(param);
          console.log("errod on add");
          console.log(status);
          console.log(data);
        });
         $scope.getMenuList(param);
    };
  });
  app.controller("DetailsController", function ($scope, $http, jsonFilter)
  {
      $scope.addDetails = function (param) {
      console.log("addDetails 1");
      console.log($scope.deliverareas);
      var url = "/v1/vendor/info/";
      url = url + param;
      var postData={Name:$scope.hotelName, username: param, Address1:$scope.hotelAddress1, phone:$scope.hotelphone,
        Address2:"", street :"",Landmark:$scope.hotelLandmark, Areaname:$scope.hotelAreaname, 
        City:$scope.hotelcity, zip:$scope.hotelzip,latitude:$scope.latitude, longitude:$scope.longitude, logo:"",
         vegornonveg:$scope.vegornonveg, speciality: $scope.speciality , deliverrange:$scope.deliverrange,deliverareas:$scope.deliverareas};
      $http.post(url,postData)
        .success(function (data, status, headers, config)
        {
            console.log("addDetails success");
        })
        .error(function (data, status, headers, config)
        {
          console.log("addDetails error");
        });
    };
  });


