angular.module('bible.controllers')

.controller('LetterCtrl', function($scope, Bible) {
	$scope.busy = true;
	
	Bible.letters().then(function(data) {
		$scope.busy = false;	
		angular.extend($scope, data);	
	});
});