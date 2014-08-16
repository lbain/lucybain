var Carousel = function() {
  var self = this;

  var totalImages;
  var activeImage;

  self.init = function() {
    totalImages = 4;
    activeImage = 0;
    $('.arrow').on('click', function(e){
      var direction = $(this).attr('direction');
      if(direction === 'right') {
        self.next();
      } else if(direction === 'left') {
        self.previous();
      }
    });
    return self;
  };

  self.next = function() {
    $('.active').removeClass('active');
    activeImage = (activeImage + 1) % totalImages;
    $('.slide[index=' + activeImage + ']').addClass('active')
  };

  return self.init();
}

$(function() {
  carousel = new Carousel();
});