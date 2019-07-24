var myApp = angular.module('myApp');

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('BooksController loaded...');

	$scope.getBooks = function(){
		$http.get('/bookstore/api/books').then(function(response){
			$scope.books = response.data;			
		});
	}

	$scope.getBook = function(){
		var id = $routeParams.id;
		$http.get('/bookstore/api/books/'+id).then(function(response){
			$scope.book = response.data;
		});
	}


	$scope.addBook = function(){
		console.log($scope.book);
		$http.post('/bookstore/api/books/', $scope.book).then(function(response){
			window.location.href='#/books';
		});
	}

	$scope.updateBook = function(){
		var id = $routeParams.id;
		$http.put('/bookstore/api/books/'+id, $scope.book).then(function(response){
			window.location.href='#/books';
		});
	}

	$scope.removeBook = function(id){
		$http.delete('/bookstore/api/books/'+id).then(function(response){
			window.location.href='#/books';
		});
	}
}]);