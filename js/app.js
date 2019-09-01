angular.module('templates', []); 

angular.module('bible', [
  'ionic',
  'templates',
  'bible.filters',
  'bible.services',
  'bible.controllers'  
])

.constant('Settings', {
  url: 'https://bible.chikuse.co.za/'
})

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {

  });

})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    controller: 'AppCtrl',
    templateUrl: 'partials/side-menu.html'
  })

  .state('app.intro', {
    url: '/intro',
    views: {
      'menuContent': {
        controller: 'AppCtrl',
        templateUrl: 'partials/intro.html'
      }
    }
  })

  .state('app.letters', {
    url: '/letters',
    views: {
      'menuContent': {
        controller: 'LetterCtrl',
        templateUrl: 'partials/letters.html'
      }
    }
  })

  .state('app.words', {
    url: '/words/:letter/:page',
    views: {
      'menuContent': {
        controller: 'WordsCtrl',
        templateUrl: 'partials/words.html'
      }
    }
  })

  .state('app.books', {
    url: '/books/:version',
    views: {
      'menuContent': {
        controller: 'BooksCtrl',
        templateUrl: 'partials/books.html'
      }
    }
  })

  .state('app.chapters', {
    url: '/chapters/:version/:book',
    views: {
      'menuContent': {
        controller: 'ChaptersCtrl',
        templateUrl: 'partials/chapters.html'
      }
    }
  })

  .state('app.verses', {
    url: '/verses/:version/:book/:chapter/:verse',
    views: {
      'menuContent': {
        controller: 'VersesCtrl',
        templateUrl: 'partials/verses.html'
      }
    }
  })

  .state('app.info', {
    url: '/info/:version',
    views: {
      'menuContent': {
        controller: 'InfoCtrl',
        templateUrl: 'partials/info.html'
      }
    }
  })

  .state('app.search', {
    url: '/search/:version/:query',
    views: {
      'menuContent': {
        controller: 'SearchCtrl',
        templateUrl: 'partials/search.html'
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'partials/about.html'
      }
    }
  });

  $urlRouterProvider.otherwise('app/intro');
  $ionicConfigProvider.backButton.previousTitleText(false).text('');

});