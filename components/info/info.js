angular.module('bible.controllers')

.controller('InfoCtrl', function($scope, $stateParams, Bible) {
	$scope.busy = true;
	Bible.info($stateParams.version).then(function(data) {
		$scope.busy = false;
		angular.extend($scope, data);
	});
});