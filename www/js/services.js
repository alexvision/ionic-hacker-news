angular.module('hn.services', ["firebase"])

// .factory('Chats', function($firebaseObject){
//   var ref = new Firebase("https://hacker-news.firebaseio.com/v0");
//   console.log($firebaseArray(ref));
// })


.factory('Chats', function($firebaseObject, $firebaseArray) {
  var APIUrl = "https://hacker-news.firebaseio.com/v0",
      topstoriesIndex,
      topStories = []


  var getItem = function(storyId) {
      return new Firebase(APIUrl).child("item").child(storyId);
  };

  var fetchTopList = function(){
    var ref = new Firebase(APIUrl).child('topstories');
    topstoriesIndex = $firebaseObject(ref)
    console.log(topstoriesIndex)
  };
  fetchTopList();
  

  var fetchTopStories = function(storyId){
    //grab an updated list of stories
    var ref = new Firebase(APIUrl).child('topstories');
    ref.on('value', function(update){
       update.val().forEach(function (storyID, index) {
         var storyElement = getItem(storyID);
            storyElement.on('value', function(storyVal){
              topStories[index] = storyVal.val();
              console.log(topStories[index]);
              //console.log(storyVal.val());
            })
       })
    })

  }()
  console.log(topStories)

  return {
    all: function() {
      return topStories;
    },
    remove: function(topStory) {
      topStories.splice(topStories.indexOf(topStory), 1);
    },
    get: function(storyId) {
      for (var i = 0; i < topStories.length; i++) {
        if (topStories[i].$id === parseInt($id)) {
          return topStories[i];
        }
      }
      return null;
    }
  };
});
