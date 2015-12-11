angular.module('bible.filters', [])

.filter('name', function( Bible ) {
  return function( book ) {
    return Bible.bookList()[ book - 1 ];
  };
});