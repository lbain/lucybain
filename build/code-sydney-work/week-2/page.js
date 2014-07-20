function makeHomeTab(){
  $('#tab-content')
    .append('<h1> Welcome to Pho Shizzle! </h1>')
    .append('<img src="pho.jpg" />')
    .append("<p> Our pho soups are fo' real, and we're sure you'll dig 'em. " +
      "We've got a wide selection of soups and there's nothing fake about them." +
      "So come on by and try them out! </p>")
}

function makeContactTab(){
  $('#tab-content')
    .append('<h1> Holla Back! </h1>')
    .append("<p> Our phone number is (555)123-4567 </p>");
}

function makeMenuTab(){
  $('#tab-content')
    .append("<h1> Fo' Reals Phos </h1>")
    .append("<div class='menu'></div>");
  $('.menu')
    .append("<h3> Pho-ney </h3> <p> Our house specialty </p>")
    .append("<h3> Hydro-pho </h3> <p> More soup than traditional pho, a low calorie way to fill up </p>")
    .append("<h3> Pho To </h3> <p> You'll want to update your Instagram feed for this one </p>")
    .append("<h3> Pho-rensic Analysis </h3> <p> Comes with raw meat that cooks in the soup </p>")
    .append("<h3> 4 Meat Pho </h3> <p> Includes four types of seafood </p>")
}

$('.tabs li').click(function(){
  var tabName = $(this).text().trim();
  $('.active').removeClass('active');
  $(this).addClass('active');
  var methodName = 'make' + tabName + 'Tab';
  $('#tab-content').empty();
  window[methodName]();
});

makeHomeTab();