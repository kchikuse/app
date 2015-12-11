angular.module('bible.services', [])

.service('Bible', function(http) {
  return {
    
    versions: function() {
      return http.Get('versions');
    },

    books: function( version ) {
      return http.Get('books', version);
    },

    chapters: function( version, book ) {
      return http.Get('chapters', version, book);
    },

    verses: function( version, book, chapter ) {
      return http.Get('verses', version, book, chapter);
    },

    letters: function() {
      return http.Get('letters');
    },

    words: function( letter, page ) {
      return http.Get('words', letter, page);
    },

    info: function( version ) {
      return http.Get('about', version);
    },

    search: function( version, query ) {
      return http.Get('search', version, query);
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

.service('Player', function(Bible, Const) {
  
  var isPlaying = false;
  var audio = new Audio();

  return {
    play: function(book, chapter, oncanplay, onended) {
      isPlaying = true;
      audio.src = this.createFileName(book, chapter);
      audio.oncanplay = oncanplay;
      audio.onended  = onended;
      audio.play();      
    },

    stop: function() {
      audio.pause();
      isPlaying = false;
    },

    isPlay: function() {
      return isPlaying;
    },

    createFileName: function(book, chapter) {
      var name = Bible.bookList()[ book - 1 ];
      var pbook = book < 10 ? '0' + book : book;
      var tail = name + '%20' + chapter + '.mp3';
      return [ Const.audio, pbook + '%20-%20' + name, tail ].join('/');
    }    
  };
})

.service('Settings', function() {
  var key = 'bible.settings';

  var defaults = {
    chapterNumbers: true,
    enableCaching: true,
    continuousPlay: true,
    contrastMode: false
  };

  return {
    get: function(item) {
      return this.load()[ item ];
    },
    load: function() {
      return JSON.parse( localStorage.getItem(key) ) || defaults;
    },
    save: function(settings) {
      localStorage.setItem(key, JSON.stringify(settings));
    }
  };
})

.service('Cache', function() {  
  var db = new PouchDB('bible', { adapter: 'websql' });

  if (!db.adapter) { 
    db = new PouchDB('bible');
  }

  return {
    add: function(key, value) {
      return db.put({ '_id': key, 'data': value });
    },

    update: function(key, value) {
      var add = this.add;
      return db.get(key).then(function (doc) {
        doc.data = value;
        return db.put(doc);
      })
      .catch(function (err) {
        return add(key, value);
      });
    },

    get: function(key) {
      return db.get(key, function(err, response) {
        return err ? err : response.data;
      })
      .catch(function (err) {
        return err;
      });
    },

    remove: function(key) {
      db.get(key).then(function (doc) {
        return db.remove(doc);
      });
    }
  };
})

.service('http', function($http, Cache, Const, Settings) {
  
  var fetch = function(uri, cacheable) {
    return $http.get(Const.api + uri).then(function(response) {
        if(cacheable) { Cache.add(uri, response.data); }
        return response.data;
    });
  };

  return {
    Get: function() {
      var key = _.toArray(arguments).join('/');
      var cacheEnabled = !!Settings.get('enableCaching');
      var cacheable = ['search', 'verses'].indexOf(arguments[0]) < 0;

      if(!cacheEnabled) { return fetch(key, false); }
      
      return Cache.get(key).then(function(c) {
        return c.data || fetch(key, cacheable);
      });
    }
  };
});