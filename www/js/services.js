angular.module('hn.services', ["firebase"])

// .factory('Chats', function($firebaseObject){
//   var ref = new Firebase("https://hacker-news.firebaseio.com/v0");
//   console.log($firebaseArray(ref));
// })


.factory('Chats', function($firebaseObject, $firebaseArray) {
  var APIUrl = "https://hacker-news.firebaseio.com/v0",
      topstoriesIndex,
      topStories = [],
      storyId = 10253963;

  var getRef = function(storyId) {
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
         var storyRef = getRef(storyID);
            storyRef.on('value', function(storyVal){
              topStories[index] = storyVal.val();
              console.log(topStories[index]);
              //console.log(storyVal.val());
            })
       })
    })

  }()
  console.log(topStories)



  var chats = topStories
  var oldchats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].$id === parseInt($id)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
