angular.module('bible.filters', [])

.filter('name', function( Bible ) {
  return function( book ) {
    return Bible.bookList()[ book - 1 ];
  };
})

.filter('summarize', function() {
  return function( input ) {
    return String(input.slice(0, 410)).replace(/<[^>]+>/gm, '');
  };
});