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
      url2 = url2 + "x@gmail.com";
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

    $scope.getMenuList = function (param) {
      console.log("getOrdersummary");
      var url3 = "/v1/vendor/menu/";
      url3 = url3 + "x@gmail.com";
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

    $scope.addMenu = function (form,param) {
      console.log("addMenu");
       console.log( $scope.fooditem);
      var url4 = "/v1/vendor/menu/";
      url4 = url4 + "y@gmail.com";
      var postData={fooditem:$scope.fooditem,foodprice:$scope.foodprice};
      $http.get(url4,postData)
        .success(function (data, status, headers, config)
        {
           console.log("success add");
           console.log(data);
          
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };
  });


// function menu_add(form,username) {
    
   
//      console.log("vendor.js  menu_add");
//       console.log(form);
//     var url = "/v1/vendor/menu/";
//     var postData={fooditem:form.fooditem.value,foodprice:form.foodprice.value};
//     url = url + username;
//     console.log(url);
//     $.post(url,
//       postData,
//       function(data, textStatus, jqXHR)
//       {
//        console.log(data)
//       },"json").fail(function(jqXHR, textStatus, errorThrown) 
//           {
//     console.log(textStatus);
//     console.log(errorThrown); 
//       });
// }