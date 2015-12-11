angular.module('bible.controllers')

.controller('WordsCtrl', function($scope, $stateParams, $ionicPopover, Bible) {
	$scope.busy = true;
	$scope.alphabet = Bible.alphabet();

	Bible.words($stateParams.letter, $stateParams.page).then(function(data) {
		$scope.busy = false;
		$scope.version = 'ebd';
		angular.extend($scope, data);
		$scope.$apply();			
	});

	$ionicPopover.fromTemplateUrl('word-popover.html', {
    	scope: $scope
	})
	.then(function(popover) {
	    $scope.popover = popover;
	});
});