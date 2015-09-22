angular.module('hn.controllers', [])

.controller('StoryCtrl', function ($scope, Stories) {
  // $scope.stories = Stories.fetchTopStories();
  $scope.stories = Stories.all();
  $scope.comments = function(story) {
    Stories.comments(story);
  };
})

.controller('CommentsCtrl', ["$scope", "$firebaseObject",
  function ($scope, $firebaseObject) {
    var ref = $firebaseObject('https://hacker-news.firebaseio.com/v0');
    var obj = $firebaseObject(ref);

    obj.$loaded().then(function() {
        console.log("loaded record:", obj.$id, obj.someOtherKeyInData);
      })

}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});
