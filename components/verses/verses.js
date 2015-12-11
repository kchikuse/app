angular.module('bible.controllers')

.controller('VersesCtrl', function($scope, $state, $stateParams, $ionicPopover, Player, Bible, Settings) {
	$scope.busy = true;
	$scope.load = false;
	var book = $stateParams.book;
	var chapter = $stateParams.chapter;
	var version = $stateParams.version;	
	$scope.isBible = version === 'kjv';

	var onended = function() {
		var nextBook = $scope.nextBook;
		var nextChapter = $scope.nextChapter;
		var autoNavigate = !!Settings.get('autoNavigate');
		var continuePlay = !!Settings.get('continuousPlay');

		if(autoNavigate) {
			$scope.next();
		}

		if(continuePlay) {
			$scope.play(nextBook, nextChapter);
		}
		else {
			$scope.stop();
			$scope.$apply();
		}
	};

	var navigate = function(book, chapter) {
		$state.go('app.verses', { 
			version: version, 
			book: book, 
			chapter: chapter 
		});
	};

	$scope.play = function(book, chapter) {
		$scope.load = true;
		Player.play(book, chapter, function() {
			$scope.load = false;
			$scope.$digest();
		}, onended);
	};

	$scope.stop = function() {
		Player.stop();
	};

	$scope.isPlay = function() {
		return Player.isPlay(); 
	};

	$scope.next = function() {
		navigate($scope.nextBook, $scope.nextChapter);
	};

	$scope.prev = function() {
		navigate($scope.prevBook, $scope.prevChapter);
	};

	Bible.verses(version, book, chapter).then(function(data) {
		$scope.busy = false;
		angular.extend($scope, data);		
		$scope.$apply();
	});

	Bible.books(version).then(function(data) {
		$scope.books = data.books;	
	});

	Bible.chapters(version, book).then(function(data) {
		$scope.chapters = _.range(1, data[0].chapters + 1);
	});

	$ionicPopover.fromTemplateUrl('book-popover.html', { scope: $scope })
	.then(function(popover) {
	    $scope.popover = popover;
	});	

	$ionicPopover.fromTemplateUrl('verse-popover.html', { scope: $scope })
	.then(function(popover) {
	    $scope.popoverVs = popover;
	});
});