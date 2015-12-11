angular.module('bible.controllers')

.controller('SearchCtrl', function($scope, $state, $stateParams, Bible) {
	$scope.search = {};
	$scope.results = []; 	
	var version = $stateParams.version;
	$scope.version = version;
	$scope.search.version = version;

	Bible.versions().then(function(data) {
		$scope.versions = data;
		$scope.name = _.findWhere(data, { slug: version }).name;
	});

	$scope.doSearch = function() {
		$scope.busy = true;
		var ver = $scope.search.version;
		Bible.search(ver, $scope.search.query).then(function(results) {
			$scope.busy = false;
			$scope.results = results;
			$scope.isDict = ver === 'ebd';
			$scope.query = $scope.search.query;	
			$scope.$apply();			
		});
	};
});