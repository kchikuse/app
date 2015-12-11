angular.module('bible.controllers')

.controller('ChaptersCtrl', function($scope, $stateParams, $ionicPopover, Bible) {
	$scope.busy = true;
	var book = $stateParams.book;
	var version = $stateParams.version;
	$scope.isBible = version === 'kjv';

	Bible.chapters(version, book).then(function(data) {
		$scope.busy = false;
		angular.extend($scope, data[0]);	
		$scope.chapters = _.range(1, data[0].chapters + 1);			
	});

	Bible.books(version).then(function(data) {
		$scope.books = data.books;
		$ionicPopover.fromTemplateUrl('popover.html', { scope: $scope })
		.then(function(popover) { 
		    $scope.popover = popover;
		});
	});
});