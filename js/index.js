angular.module('ionicApp', ['ionic'])

  .factory('PetService', function ($http) {

  var pets = [];

  $http.get("https://torrid-heat-4811.firebaseio.com/people.json")
  .success(function (response) {
    var data = response;
    for (var i=0; i<1000; i++) {
      pets[i] = {
        id: i,
        'firstName': data[i].first_name,
        'lastName': data[i].last_name,
        'email': data[i].email
      };
    }
  });



  return {
    all: function () {
      return pets;
    },
    get: function (petId) {

      return pets[petId];
    }
  };

})

  .config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tabs', {
    url: "/tabs",
    abstract: true,
    templateUrl: "tabs.html"
  })


    .state('tabs.master', {
    url: "/master",
    views: {
      'main': {
        controller:'MasterCtrl',
        templateUrl: "master.html"
      }
    }
  })

    .state('tabs.detail', {
    url: "/detail/:petsId",
    views: {
      'main': {
        controller:'DetailCtrl',
        templateUrl: "detail.html"
      }
    }
  })

  .state('tabs.plus', {
  url: "/plus",
  views: {
    'plus': {
      controller:'PlusCtrl',
      templateUrl: "plus.html"
    }
  }
})

  $urlRouterProvider.otherwise("tabs/master");
})




  .controller('MasterCtrl', function($scope, PetService, $ionicScrollDelegate, $ionicHistory) {

  $scope.$on('$ionicView.afterLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeEnter', function(){
    //$ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.afterEnter', function(){
    $ionicHistory.clearCache();
  });

  $scope.pets = PetService.all();

  $scope.scrollBottom = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };

})
 .controller('PlusCtrl', function($scope){



 })

  .controller('DetailCtrl', function($scope, $stateParams, PetService) {

  $scope.pet = PetService.get($stateParams.petsId);

});
