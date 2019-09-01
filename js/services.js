angular.module('bible.services', [])

.service('Bible', function(api) {
  return {
    
    versions: function() {
      return api.Get('versions');
    },

    books: function(version) {
      return api.Get('books', version);
    },

    chapters: function(version, book) {
      return api.Get('chapters', version, book);
    },

    verses: function(version, book, chapter) {
      return api.Get('verses', version, book, chapter);
    },

    letters: function() {
      return api.Get('words');
    },

    words: function(letter, page) {
      return api.Get('words', letter, page);
    },

    info: function(version) {
      return api.Get('about', version);
    },

    search: function(version, query) {
      return api.Get('search', version, query);
    },

    alphabet: function() {
      return 'ABCDEFGHIJKLMNOPQRSTUVWYZ'.split('');
    },

    bookList: function() {
      return [
      'Genesis',
      'Exodus',
      'Leviticus',
      'Numbers',
      'Deuteronomy',
      'Joshua',
      'Judges',
      'Ruth',
      '1 Samuel',
      '2 Samuel',
      '1 Kings',
      '2 Kings',
      '1 Chronicles',
      '2 Chronicles',
      'Ezra',
      'Nehemiah',
      'Esther',
      'Job',
      'Psalms',
      'Proverbs',
      'Ecclesiastes',
      'Song of songs',
      'Isaiah',
      'Jeremiah',
      'Lamentations',
      'Ezekiel',
      'Daniel',
      'Hosea',
      'Joel',
      'Amos',
      'Obadiah',
      'Jonah',
      'Micah',
      'Nahum',
      'Habakkuk',
      'Zephaniah',
      'Haggai',
      'Zechariah',
      'Malachi',
      'Matthew',
      'Mark',
      'Luke',
      'John',
      'Acts',
      'Romans',
      '1 Corinthians',
      '2 Corinthians',
      'Galatians',
      'Ephesians',
      'Philippians',
      'Colossians',
      '1 Thessalonians',
      '2 Thessalonians',
      '1 Timothy',
      '2 Timothy',
      'Titus',
      'Philemon',
      'Hebrews',
      'James',
      '1 Peter',
      '2 Peter',
      '1 John',
      '2 John',
      '3 John',
      'Jude',
      'Revelation'];
    }
    
  };
})

.service('api', function($http, Settings) {
  return {
    Get: function() {
      var key = _.toArray(arguments).join('/');

      return $http.get(Settings.url + key).then(function(response) {
        return response.data;
      });
    },   
  };
})


;