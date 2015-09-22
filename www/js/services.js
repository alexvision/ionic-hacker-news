angular.module('hn.services', ["firebase"])

// .factory('Stories', function($firebaseObject, $firebaseArray) {
//   var APIUrl = "https://hacker-news.firebaseio.com/v0",
//       topstoriesIndex,
//       topStories = []


//   var getItem = function(storyId) {
//       return new Firebase(APIUrl).child("item").child(storyId)
//       // var syncedItem = item.$asObject()
//       // syncedItem.$loaded()
//       //   .then(function(data){
//       //     return data;
//       //   })
//   };

//   var fetchTopList = function(){
//     var ref = new Firebase(APIUrl).child('topstories');
//     topstoriesIndex = $firebaseObject(ref)
//     console.log(topstoriesIndex)
//   };
//   //fetchTopList();
  

//   var fetchTopStories = function(callback){
//     //grab an updated list of stories
//     var topStories = [];
//     var ref = new Firebase(APIUrl).child('topstories');
//     ref.on('value', function(update){
//        for(var i = 0; i < 30; i++) {
//         var story = getItem(update.val()[i])
//         story.on('value', function(storyVal){
//           topStories[i] = storyVal.val();
//           console.log("Individual story print:", topStories[i]);
//         })
//        }
//        // update.val().forEach(function (storyId, index) {
//        //   var storyElement = getItem(storyId);
//        //      storyElement.on('value', function(storyVal){
//        //        topStories[index] = storyVal.val();
//        //        //console.log(storyVal.val());
//        //      })
//        // })
//     callback(topStories)
//     })
//   }
//   console.log(topStories)



//   return {
//     all: function() {
//       console.log("All called")
//       //return topStories;
//       fetchTopStories(function(stories){
//         console.log("Returning")
//         return stories;
//       })
//     },
//     redirect: function(storyId) {
//       topStories.splice(topStories.indexOf(story), 1);
//     },
//     get: function(storyId) {
//       for (var i = 0; i < topStories.length; i++) {
//         if (topStories[i].$id === parseInt($id)) {
//           return topStories[i];
//         }
//       }
//       return null;
//     },
//     // fetchTopStories: function(storyId){
//     // //grab an updated list of stories
//     //   var ref = new Firebase(APIUrl).child('topstories');
//     //   ref.$loaded()
//     //   .then(function(update){
//     //    for(var i = 0; i < 30; i++) {
//     //     var story = getItem(update.val()[i])
//     //     story.on('value', function(storyVal){
//     //       topStories[i] = storyVal.val();
//     //       console.log("Individual story print:", topStories[i]);
//     //     })
//     //    console.log('RETURNING!!!!!!')
//     //    }
//     //   })
//     //    return topStories;
//     // }
//   };
// })
.factory('Stories', function ($firebaseObject, $firebaseArray) {
  var APIUrl = "https://hacker-news.firebaseio.com/v0",
      topstoriesIndex,
      topStories = []


  var getItem = function(storyId) {
      return new Firebase(APIUrl).child("item").child(storyId);
  };
  

  var fetchTopStories = function(storyId){
    //grab an updated list of stories
    var ref = new Firebase(APIUrl).child('topstories');
    ref.on('value', function(update){
      update.val().forEach(function (storyId, index) {
        var storyElement = getItem(storyId);
        storyElement.on('value', function(storyVal){
          topStories[index] = storyVal.val();
          console.log("Individual Story", storyVal.val());
        })
      })
    })
  }
  fetchTopStories()
  


  return {
    all: function() {
      console.log('calling all')
      return topStories;
    },
    comments: function(storyId) {
      console.log("Implement Coments")
    }
  };
});
