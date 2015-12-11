angular.module('bible.controllers')

.controller('InfoCtrl', function($scope, $stateParams, $ionicPopover, Bible) {
	$scope.busy = true;
	$scope.version = $stateParams.version;

	Bible.info($scope.version).then(function(data) {
		$scope.busy = false;
		angular.extend($scope, data);
		if(!$scope.$$phase) { $scope.$apply(); }
	});

	Bible.books($scope.version).then(function(data) {
		$scope.books = data.books;	
	});

	$ionicPopover.fromTemplateUrl('popover.html', { scope: $scope })
	.then(function(popover) {
	    $scope.popover = popover;
	});	
});