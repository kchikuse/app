angular.module('bible.controllers', [])

.controller('AppCtrl', function($scope, $state, Bible) {
	$scope.busy = true;		
	
	Bible.versions().then(function(versions) {
		$scope.busy = false;
		$scope.versions = versions;
	});

	$scope.open = function(version) {
		$state.go(version === 'ebd' ? 'app.letters' : 'app.books', { 'version': version });
	};
})

.controller('LetterCtrl', function($scope, Bible) {
	$scope.busy = true;
	
	Bible.letters().then(function(data) {
		$scope.busy = false;	
		angular.extend($scope, data);	
	});
})

.controller('WordsCtrl', function($scope, $stateParams, $ionicPopover, Bible) {
	$scope.busy = true;
	$scope.alphabet = Bible.alphabet();

	Bible.words($stateParams.letter, $stateParams.page).then(function(data) {
		$scope.busy = false;
		$scope.version = 'ebd';
		angular.extend($scope, data);			
	});

	$ionicPopover.fromTemplateUrl('word-popover.html', {
    	scope: $scope
	})
	.then(function(popover) {
	    $scope.popover = popover;
	});
})

.controller('InfoCtrl', function($scope, $stateParams, Bible) {
	$scope.busy = true;
	var version = $stateParams.version;

	Bible.info(version).then(function(data) {
		$scope.busy = false;
		$scope.is_ebd = version === 'ebd';
		angular.extend($scope, data);
	});
})

.controller('BooksCtrl', function($scope, $stateParams, Bible) {	
	$scope.busy = true;	
	var version = $stateParams.version;
	Bible.books(version).then(function(data) {
		$scope.busy = false;	
		angular.extend($scope, data);	
	});
})

.controller('ChaptersCtrl', function($scope, $stateParams, $ionicPopover, Bible) {
	$scope.busy = true;
	var book = $stateParams.book;
	var version = $stateParams.version;
	$scope.version = version;

	Bible.chapters(version, book).then(function(data) {
		$scope.busy = false;
		angular.extend($scope, data[0]);	
		$scope.chapters = _.range(1, data[0].chapters + 1);			
	});

	Bible.books(version).then(function(data) {
		$scope.books = data.books;
		$ionicPopover.fromTemplateUrl('book-popover.html', { scope: $scope })
		.then(function(popover) { 
		    $scope.popover = popover;
		});
	});
})

.controller('VersesCtrl', function($scope, $stateParams, $timeout, $ionicPopover, Bible) {
	$scope.busy = true;
	var book = $stateParams.book;
	var verse = $stateParams.verse;
	var chapter = $stateParams.chapter;
	var version = $stateParams.version;
	$scope.version = version;

	Bible.verses(version, book, chapter).then(function(data) {
		$scope.busy = false;
		angular.extend($scope, data);
		$scope.anchorVerse = verse;
		$scope.isBible = version === 'kjv';
		$scope.chapters = _.range(1, data.totalChapters + 1);

		if(verse) {
			$timeout(function() {
				document.getElementById(verse).scrollIntoView();
			});
		}
	});

	$ionicPopover.fromTemplateUrl('verse-popover.html', {
    	scope: $scope
	})
	.then(function(popover) {
	    $scope.popover = popover;
	});
})

.controller('SearchCtrl', function($scope, $stateParams, $ionicPopover, Bible) {
	$scope.search = {};
	$scope.results = []; 
	var version = $scope.version = $stateParams.version;

	Bible.versions().then(function(data) {
		$scope.versions = data;
		$scope.name = _.findWhere(data, { slug: version }).name;

		$ionicPopover.fromTemplateUrl('search-popover.html', {
	    	scope: $scope
		})
		.then(function(popover) {
		    $scope.popover = popover;
		});
	});

	$scope.doSearch = function() {
		$scope.busy = true;

		var query = $scope.search.query.split(' ').join(',');

		Bible.search(version, query).then(function(results) {
			$scope.busy = false;
			$scope.results = results;
			$scope.isDict = version === 'ebd';
			$scope.query = $scope.search.query;				
		});
	};

	if($stateParams.query) {
		$scope.search.query = $stateParams.query;
		$scope.doSearch();
	}
})

;