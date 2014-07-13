function my_max(array) {
  var max_num = array[0];
  for( var i = 0; i < array.length; i++ ) {
    if(array[i] > max_num) {
      max_num = array[i];
    }
  }
  return max_num;
}

function vowel_count(string) {
  var vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  var count = 0;
  string = string.toLowerCase();
  for( var i = 0; i < string.length; i++ ) {
    if(vowels.indexOf(string[i]) > 0) {
      count++;
    }
  };
  return count;
}

function reverse(string) {
  return string.split('').reverse().join('');
}