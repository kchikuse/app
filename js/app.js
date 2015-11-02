angular.module('templates', []); 

angular.module('bible', [
  'ionic',
  'templates',
  'bible.filters',
  'bible.services',
  'bible.directives',
  'bible.controllers'  
])

.constant('Settings', {
  url: 'http://localhost/bible/'
})

.run(function($ionicPlatform, $ionicConfig) {

  $ionicPlatform.ready(function() {
    
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if(window.cordova) {
      window.open = window.cordova.InAppBrowser.open;
    }

    $ionicConfig.views.transition('android');
    $ionicConfig.views.swipeBackEnabled(false);
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
    url: '/verses/:version/:book/:chapter',
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
    url: '/search/:version',
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
  $ionicConfigProvider.scrolling.jsScrolling( !ionic.Platform.isAndroid() );

});