var data = [
  {
    'name': 'nimzo',
    'base': ['d2-d4', 'g8-f6', 'c2-c4', 'e7-e6', 'b1-c3', 'f8-b4'],
    'variations': [
      {
        'name':'classical',
        'line':['d1-c2'],
      },
      {
        'name':'rubinstein',
        'line':['e2-e3'],
      },
      {
        'name':'kasparov',
        'line':['g1-f3'],
      },
    ]
  },
  {
    'name': 'sicilian',
    'base': ['e2-e4', 'c7-c5', 'g1-f3','d7-d6', 'd2-d4', 'c5-d4','f3-d4', 'g8-f6', 'b1-c3'],
    'variations': [
      {
        'name':'classical',
        'line':['b8-c6'],
      },
      {
        'name':'najdorf',
        'line':['a7-a6'],
      },
      {
        'name':'dragon',
        'line':['g7-g6'],
      },
      {
        'name':'schevenigan',
        'line':['e7-e6'],
      },
      {
        'name':'krupelchik',
        'line':['c8-d7'],
      },
    ]
  },
  {
    'name': 'queens gambit',
    'base': ['d2-d4', 'd7-d5', 'c2-c4'],
    'variations': [
      {
        'name':'slav defense',
        'line':['c7-c6', 'g1-f3', 'g8-f6', 'e2-e3', 'c8-g4'],
      },
      {
        'name':'semi-Slav',
        'line':['c7-c6', 'g1-f3', 'g8-f6', 'e2-e3', 'e7-e6'],
      },
      {
        'name':'orthodox line',
        'line':['e7-e6','b1-c3', 'g8-f6', 'c1-g5', 'f8-e7', 'e2-e3','e8-g8','h8-f8' ],
        'notes':'Looking to bring dark square bishop to attack king and quick castle on the king side.'
      },
      {
        'name':'accepted',
        'line':['d5-c4', 'g1-f3','g8-f6', 'e2-e3', 'e7-e6','f1-c4', 'c7-c5', ],
      },
      {
        'name':'alvin counter gambit',
        'line':['e7-e5','d4-e5', 'd5-d4', 'g1-f3', 'b8-c6' ],
      },
      {
        'name':'chigoran',
        'line':['b8-c6'],
      },
      {
        'name':'baltic',
        'line':['c8-f5'],
      },
    ]
  },
  {
    'name': 'french',
    'base': ['e2-e4', 'e7-e6', 'd2-d4','d7-d5'],
    'variations': [
      {
        'name':'advance',
        'line':['e4-e5', 'c7-c5', 'c2-c3', 'b8-c6', 'g1-f3'],
      },
      {
        'name':'winnower',
        'line':['b1-c3', 'f8-b4', 'a2-a3', 'b4-c3', 'b2-c3'],
      },
      {
        'name':'classical',
        'line':['b1-c3', 'g8-f6', 'e4-e5', 'f6-d7'],
      },
      {
        'name':'tarrasch',
        'line':['b1-d2'],
      },
      {
        'name':'exchange',
        'line':['e4-d5', 'e6-d5'],
      },
    ]
  },  
]

var populateOpeningDropdown = function(){
  $('#openings').empty();
  for (const d of data) {
    $('#openings').append($(document.createElement('option')).prop({
      value: d['name'],
      text: d['name'].charAt(0).toUpperCase() + d['name'].slice(1)
    }))
  }
}

var populateVariationsDropdown = function() {
  $('#variations').empty();
  for (const d of data) {
    if (d['name'] == opening) {
      for (const v of d['variations']) {
        $('#variations').append($(document.createElement('option')).prop({
          value: v['name'],
          text: v['name'].charAt(0).toUpperCase() + v['name'].slice(1)
        }))
      }
    }
  }
}

var createSequenceOfMoves = function(opening, variation) {
  for (d in data) {
    if (opening == data[d]['name']) {
      sequence = data[d]['base'];
      for (v in data[d]['variations']) {
        if (variation == data[d]['variations'][v]['name']) {
          sequence = sequence.concat(data[d]['variations'][v]['line']);
        }
      }
    }
  }
  return sequence;
}
// This a built in chessboard.js function.
var board = Chessboard('myBoard', "start");

$(window).resize(board.resize)


var count = 0;
var sequence = [];
populateOpeningDropdown();
var opening = $('#openings').val();
populateVariationsDropdown()
var variation = $('#variations').val();
sequence = createSequenceOfMoves(opening, variation);

$('#moveBtn').on('click', function () {
  $('#message').text('');
  if (count+1>sequence.length) {
    $('#message').text("That is the end of the opening!");
  } else {
  board.move(sequence[count])
  count = count+1;
  }
})

$('#restartBtn').on('click', function () {
  $('#message').text('');
  sequence = createSequenceOfMoves(opening, variation);
  count = 0;
  board.start('true');
})

$('#openings').change(function(){
  opening = $('#openings').val();
  populateVariationsDropdown();
  variation = $('#variations').val();
  sequence = createSequenceOfMoves(opening, variation);
  count = 0;
  board.start('true');

});
$('#variations').change(function(){
  variation = $('#variations').val();
  sequence = createSequenceOfMoves(opening, variation);
  count = 0;
  board.start('true');
})
