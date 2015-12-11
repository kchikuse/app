angular.module('bible.controllers')

.controller('BooksCtrl', function($scope, $stateParams, Bible) {	
	$scope.busy = true;	
	var version = $stateParams.version;
	Bible.books(version).then(function(data) {
		$scope.busy = false;	
		angular.extend($scope, data);	
		if(!$scope.$$phase) { $scope.$apply(); }
	});
});