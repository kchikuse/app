angular.module('bible.controllers')

.controller('IntroCtrl', function($scope, $state, $ionicModal, $rootScope, Settings, Bible) {
	
	$scope.busy = true;	
	$scope.settings = Settings.load(); 

	$ionicModal.fromTemplateUrl('settings.html', {
    	scope: $scope,
    	animation: 'no-animation'
  	}).then(function(modal) {
    	$scope.modal = modal;
  	});	
	
	Bible.versions().then(function(versions) {
		$scope.busy = false;
		$scope.versions = versions;
	});

	$scope.open = function(version) {
		$state.go(version === 'ebd' ? 'app.letters' : 'app.books', { 'version': version });
	};

	$scope.save = function() {
		Settings.save($scope.settings);
		$rootScope.$emit('settings-change');
		$scope.modal.hide();
	};

	$scope.show = function() {
		$scope.modal.show();
	};
});