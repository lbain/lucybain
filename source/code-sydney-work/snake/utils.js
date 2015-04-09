var Utils = {
  arraysEqual: function(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  },

  randomNumber: function(lessThan){
    return Math.floor(Math.random()*lessThan)
  },

  cell: function(positionArray){
    return $('#' + positionArray[0] + '-' + positionArray[1])
  }
}