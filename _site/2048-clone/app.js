function Game() {
  this.board = [
                ['.', '.', '.', '.'],
                ['.', '.', '.', '.'],
                ['.', '.', '.', '.'],
                ['.', '.', '.', '.']
               ]
}

Game.prototype.getRandCell = function() {
  randomRowIndex = Math.floor( Math.random() * this.board.length )
  randomCellIndex = Math.floor( Math.random() * this.board[ 0 ].length )
  while ( this.isCellAvailable( [ randomRowIndex, randomCellIndex ] ) !== true ) {
    this.getRandCell();
  }
  return [ randomRowIndex, randomCellIndex ]
}

Game.prototype.getNewNum = function() {
  possibilities = [ 2,2,2,2,2,2,2,4,4,4,4 ]
  return possibilities[ Math.floor( Math.random() * possibilities.length ) ]
}

Game.prototype.populateCell = function(position, number) {
  this.board[ position[ 0 ] ][ position[ 1 ] ] = number
  this.placeNums()
}

Game.prototype.populateBoard = function() {
  idx = 0
  while ( idx != 2 ) {
    this.populateCell( this.getRandCell(), this.getNewNum() );
    idx ++
  };
};

Game.prototype.isCellAvailable = function( cell ) {
  return this.board[ cell[ 0 ] ][ cell[ 1 ] ] === '.'
}

Game.prototype.checkEachRow = function( keyCode ) {
  this.board.forEach( function( row ) {
    switch( keyCode ) {
      case 37:
        this.game.checkRowLeft( row );
        break;
      case 39:
        this.game.checkRowRight( row );
        break;
    };
  });
};

Game.prototype.checkEachColumn = function( keyCode ) {
  transposedBoard = this.transpose( this.board )
  transposedBoard.forEach( function( row ) {
    switch( keyCode ) {
      case 38:
        this.game.checkRowLeft( row );
        break;
      case 40:
        this.game.checkRowRight( row );
        break;
    };
  });
  this.board = this.transpose( transposedBoard )
};

Game.prototype.checkRowLeft = function( row ) {
  row.reverse().forEach(function( num, idx, currentRow ) {
    if ( num !== '.') {
      if (currentRow[ idx + 1 ] === num ) {
        currentRow[ idx + 1 ] = num * 2
        currentRow[ idx ] = '.'
      } else if ( currentRow[ idx + 1 ] === '.') {
        currentRow[ idx + 1 ] = num
        currentRow[ idx ] = '.'
      };
    };
  });
  return row.reverse()
}

Game.prototype.checkRowRight = function( row ) {
  row.forEach(function( num, idx, currentRow ) {
    if ( num !== '.') {
      if (currentRow[ idx + 1 ] === num ) {
        currentRow[ idx + 1 ] = num * 2
        currentRow[ idx ] = '.'
      } else if ( currentRow[ idx + 1 ] === '.') {
        currentRow[ idx + 1 ] = num
        currentRow[ idx ] = '.'
      };
    };
  });
  return row
}

Game.prototype.transpose = function( arr ) {
  return arr[0].map(function (_, c) { return arr.map(function (r) { return r[c]; }); });
};

Game.prototype.placeNums = function() {
  $( 'table.game-container tr td' ).empty();
  this.board.forEach( function( row, idx ) {
    row.forEach( function( num, idx2 ) {
      if ( num !== '.' ) {
        var rowToPlace = $('.row' + idx );
        var boxToPlace = rowToPlace.find( '.col' + idx2 );
        $( boxToPlace ).append( num )
      };
    });
  });
};

$( document ).ready( function() {
  game = new Game()
  game.populateBoard();
  $( 'body' ).bind( 'keyup', function( e ) {
    var values = [37,38,39,40]
    if ( values.indexOf( e.keyCode ) > -1 ) {
      if ( e.keyCode === 40 || e.keyCode === 38 ) {
        game.checkEachColumn( e.keyCode );
      } else if ( e.keyCode === 37 || e.keyCode === 39 ) {
        game.checkEachRow( e.keyCode )
      }
      game.populateCell( game.getRandCell(), game.getNewNum() );
    };
  });
});
