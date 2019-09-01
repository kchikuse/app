angular.module('templates', []); 
angular.module('bible.controllers', []);

angular.module('bible', [
  'ionic',
  'templates',
  'bible.filters',
  'bible.services',
  'bible.controllers'  
])

.constant('Const', {
  api: 'https://bible.chikuse.co.za/',
  audio: 'http://localhost:8080'
})

.run(function( $ionicPlatform, $ionicConfig, Const, Cache ) {

  $ionicPlatform.ready(function() {  
    $ionicConfig.views.transition( 'android' );
    $ionicConfig.views.swipeBackEnabled( false );
  });

})


.config(function( $stateProvider, $urlRouterProvider, $ionicConfigProvider ) {
  
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    controller: 'SharedCtrl',
    templateUrl: 'components/shared/side-menu.html'
  })

  .state('app.intro', {
    url: '/intro',
    views: {
      'menuContent': {
        controller: 'SharedCtrl',
        templateUrl: 'components/shared/intro.html'
      }
    }
  })

  .state('app.letters', {
    url: '/letters',
    views: {
      'menuContent': {
        controller: 'LetterCtrl',
        templateUrl: 'components/letters/letters.html'
      }
    }
  })

  .state('app.words', {
    url: '/words/:letter/:page',
    views: {
      'menuContent': {
        controller: 'WordsCtrl',
        templateUrl: 'components/words/words.html'
      }
    }
  })

  .state('app.books', {
    url: '/books/:version',
    views: {
      'menuContent': {
        controller: 'BooksCtrl',
        templateUrl: 'components/books/books.html'
      }
    }
  })

  .state('app.chapters', {
    url: '/chapters/:version/:book',
    views: {
      'menuContent': {
        controller: 'ChaptersCtrl',
        templateUrl: 'components/chapters/chapters.html'
      }
    }
  })

  .state('app.verses', {
    url: '/verses/:version/:book/:chapter',
    views: {
      'menuContent': {
        controller: 'VersesCtrl',
        templateUrl: 'components/verses/verses.html'
      }
    }
  })

  .state('app.info', {
    url: '/info/:version',
    views: {
      'menuContent': {
        controller: 'InfoCtrl',
        templateUrl: 'components/info/info.html'
      }
    }
  })

  .state('app.search', {
    url: '/search/:version',
    views: {
      'menuContent': {
        controller: 'SearchCtrl',
        templateUrl: 'components/search/search.html'
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'components/shared/about.html'
      }
    }
  });

  $urlRouterProvider.otherwise( 'app/intro' );
  $ionicConfigProvider.scrolling.jsScrolling( true );
  $ionicConfigProvider.backButton.previousTitleText( false ).text('');

});
