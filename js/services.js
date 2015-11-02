angular.module('bible.services', [])

.service('Bible', function($http, $q, Cache, Settings) {

  var Get = function() {
    var args = _.toArray(arguments).join('/');

    var cacheable = ['search', 'verses'].indexOf(arguments[0]) < 0;
    if(cacheable) {
      var response = Cache.get(args);
      if(response) { 
        return $q.when(response); 
      }
    }
    
    return $http.get(Settings.url + args).then(function(response) {
      
      if(cacheable) {
        Cache.add(args, response.data);
      }
      
      return response.data;
    });
  };

  return {
    
    versions: function() {
      return Get('versions');
    },

    books: function(version) {
      return Get('books', version);
    },

    chapters: function(version, book) {
      return Get('chapters', version, book);
    },

    verses: function(version, book, chapter) {
      return Get('verses', version, book, chapter);
    },

    letters: function() {
      return Get('letters');
    },

    words: function(letter, page) {
      return Get('words', letter, page);
    },

    info: function(version) {
      return Get('about', version);
    },

    search: function(version, query) {
      return Get('search', version, query);
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

.service('Cache', function($window) {

  var p = 'bible-';
  var localStorage = $window.localStorage;

  return {

    add: function(key, value) {
      localStorage.setItem(p + key, JSON.stringify(value));
    },

    get: function(key) {
      var value = localStorage.getItem(p + key);
      return value && JSON.parse(value);
    },

    remove: function(key) {
      localStorage.removeItem(p + key);
    },

    clear: function() {
      localStorage.clear();
    }

  };
})

;