hello.init({facebook:"618716354940237"},{scope:"friends,pictures"}),hello.on("auth.login",function(o){app.displayLoading(),app.auth=o,hello(o.network).api("/me").then(function(o){$(".js-loading").hide(),$(".js-logged-in").show(),$(".js-name").text(o.name),$(".js-personal-details").append("<img class='profile-pic' src='"+o.thumbnail+"'/>")}),hello(o.network).api("/me/albums").then(function(o){app.displayAlbums(o.data)},function(o){console.log("ERROR: "),console.log(o)})}),$(document).on("getAlbum",function(o,n){hello(app.auth.network).api("/me/album","get",{id:n}).then(function(o){app.hideAlbums(),app.displayPictures(o.data)},function(o){console.log("ERROR: "),console.log(o)})});