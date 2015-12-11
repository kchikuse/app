angular.module('bible.controllers')

.controller('VersesCtrl', function($scope, $stateParams, $ionicPopover, $rootScope, Player, Bible, Settings) {
	$scope.busy = true;
	$scope.load = false;
	var book = $stateParams.book;
	var chapter = $stateParams.chapter;
	var version = $stateParams.version;	

	var onended = function() {
		if(!!Settings.get('continuousPlay')) {
			$scope.play($scope.nextBook, $scope.nextChapter);
		}
		else {
			$scope.stop();
			$scope.$apply();
		}
	};

	var oncontrast = function() {
		$scope.contrast = !!Settings.get('contrastMode') ? 'contrast-on' : '';
	};

	$scope.play = function(pbook, pchapter) {
		$scope.load = true;
		Player.play(pbook, pchapter, function() {
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

	$scope.showChapters = function() {
		return Settings.get('chapterNumbers'); 
	};	

	oncontrast();

	$rootScope.$on('settings-change', oncontrast);

	Bible.verses(version, book, chapter).then(function(data) {
		$scope.busy = false;
		angular.extend($scope, data);
		$scope.isBible = version === 'kjv';
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