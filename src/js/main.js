import $ from 'jquery'

// CALLS FOR AJAX

// Get news from API
function getNews () {
  return $.ajax({
    url: "https://json-data.herokuapp.com/restaurant/news/1"
  })
}

// Get menu API
function getMenu() {
  return $.ajax({
    url: "https://json-data.herokuapp.com/restaurant/menu/2"
  })
}

// get days special from API
function getSpecial (){
  return $.ajax({
    url: "https://json-data.herokuapp.com/restaurant/special/1"
  })
}
// get images from flickr API

var baseYURL = `https://api.flickr.com/services/`
function getFlickr(){
  return $.ajax({
    url:`
    ${baseYURL}rest/?method=flickr.photos.search&api_key=ac1d68d86f7ac6c91836942a7af814db&format=json&nojsoncallback=1&tags=food&page=1`,
  })
}

function imageTmpl(obj){
  return`
  <img src="https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}.jpg">
  `
}

getFlickr().then(function (data){
  console.log(data);
  data.photos.photo.forEach(function(obj){
    $(".newsbox").append(imageTmpl(obj));

  })
})
//  maps api key = AIzaSyAe2CZi1T36a6M2wX80RpcvkSo5qLX2E3g
// flickr api key = ac1d68d86f7ac6c91836942a7af814db
// flickr secret = 1e26f05f9ffc8458

//insert news html/template literal

function newsTmpl(obj){
  return `
  <span>Latest News</span>
  <span class="newsTitle">${obj.title}</span>
  <span class="newsDate">${obj.date_published}</span>
  <span class="newsPost">${obj.post}</span>
  `
}

getNews().then(function(data){
  console.log(data)
  $('.newsbox').append(newsTmpl(data));
})

// insert special template

function specialTmpl(obj){
  return `
  <span class="special-name">${obj.menu_item_id.price}</span>
  `
}

getSpecial().then(function(data){
  console.log(data);

})
