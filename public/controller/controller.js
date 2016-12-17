var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	console.log("Hello World from controller.");

	$scope.nameValidation = /[A-Z][A-Za-z0-9]*/;
	$scope.emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	$scope.numberValidation = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
	
	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			console.log("I got the data I requested.");
			$scope.contactlist = response;
			$scope.contact = "";
		});
	}
	
	refresh();
	
	$scope.addContact = function(isValid){
		if(!isValid)
		{
			alert("Please input data correctly.");
			return;
		}
		
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};
	
	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		});
	};
	
	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		});
	};
	
	$scope.update = function() {
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};
	
	$scope.clear = function(){
		$scope.contact = "";
	};
	
}]);