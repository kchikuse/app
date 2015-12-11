angular.module('bible.controllers')

.controller('SharedCtrl', function($scope, $state, $ionicModal, $ionicPopup, Cache, Settings, Bible) {
	
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

		$scope.showChapters = !!Settings.get('chapterNumbers');
		$scope.contrast = !!Settings.get('contrastMode') ? 'contrast-on' : '';	
		
		$scope.modal.hide();
	};

	$scope.clear = function() {
		Cache.clear().then(function() {
			$ionicPopup.alert({
		     title: 'Success',
		     template: 'The cache has been deleted'
		   }).then(function(res) {
		     $scope.modal.hide();
		   });
		});
	};

	$scope.show = function() {
		$scope.modal.show();
	};
});