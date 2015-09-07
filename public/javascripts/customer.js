angular.module("mainModule", [])
  .controller("mainController", function ($scope, $http, jsonFilter)
  {
    $scope.findRestaurants = function () {
      console.log("findRestaurants");
      var url = "/v1/vendor/city/";
      url = url + $scope.areaname;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.hotellist = data;
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

    $scope.postOrder = function (ordarr) {
      console.log("postOrder");
      console.log(ordarr);
      var url = "/v1/vendor/order";
      $http.post(url, ordarr)
        .success(function (data, status, headers)
        {
          console.log("Success in postorder")
        })
        .error(function (data, status, headers)
        {
          console.log("ERROR in postorder");
        });
    };


    $scope.currentHotel = function (index) {
      console.log("currentHotel");
      console.log(index);
      console.log($scope.hotellist[index]);
      $scope.hotel =  $scope.hotellist[index];
       angular.forEach($scope.hotel.menu, function(item) {
            item.qty = 0 ;
        })
    };

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.hotel.menu, function(item) {
            total += item.price * item.qty;
        })
        return total;
    };
    $scope.order = function() {

console.log("order function");
       var ordMenu =  [];
      // ordarr.hotel.name = $scope.hotel.name;
      // ordarr.hotel.email = $scope.hotel.email;
      // ordarr.menu.name = "dosa";
      // ordarr.menu.no_of_order = 13;
      // ordarr.customer.name = "daya";
      // ordarr.customer.email = "daya@gmail.com";
      // ordarr.customer.phone = "98798798";


        angular.forEach($scope.hotel.menu, function(item) {
          var obj = new Object();
          if(item.qty > 0)
          {
            obj.name = item.name;
            obj.no_of_order = item.qty;
            ordMenu.push(obj);
          }
        });
        var ordarr = {
         "hotel":{"name":$scope.hotel.hotel.name,"email": $scope.hotel.hotel.email},
          "menu":ordMenu,
          "customer":{"name":"kumar","email": "rajkumar@gmail.com","phone":"958698234"}
        };
        $scope.postOrder(ordarr);
    };
  });