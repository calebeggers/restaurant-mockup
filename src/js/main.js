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

getMenu().then(function (data){
  console.log(data)
})

// get days special from API
function getSpecial (){
  return $.ajax({
    url: "https://json-data.herokuapp.com/restaurant/special/1"
  })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// get images from flickr API
// var baseYURL = `https://api.flickr.com/services/`
// function getFlickr(){
//   return $.ajax({
//     url:`${baseYURL}rest/?method=flickr.photos.search&api_key=ac1d68d86f7ac6c91836942a7af814db&format=json&nojsoncallback=1&tags=biscuit+gravy&page=1`
//   })
// }
//
// function imageTmpl(obj){
//   return`
//   <img src="https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}.jpg">
//   `
// }
//
// getFlickr().then(function (data){
//   console.log("flickr data", data);
//   data.photos.photo.forEach(function(obj){
//     $(".newsbox").append(imageTmpl(obj));
//
//   })
// })
//  maps api key = AIzaSyAe2CZi1T36a6M2wX80RpcvkSo5qLX2E3g
// flickr api key = ac1d68d86f7ac6c91836942a7af814db
// flickr secret = 1e26f05f9ffc8458
//////////////////////////////////////////////////////////////////////////////////////////////////

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
  <class="special-name">${obj[0].item}${obj[0].price}</span>
  <img src="https://farm8.staticflickr.com/7477/15742927851_825073c2d6.jpg">
  <span class="special-post">${obj[0].description}</span>
  `
}
var special_id;
var special;
getSpecial().then(function(data){
  console.log(data);
  special_id = data.menu_item_id;
  getMenu().then(function(food){
    console.log(food)
     special = food.sides.filter(function(menuitem){
       console.log(menuitem.id)
      return menuitem.id === special_id
    })
    $('.newsbox').append(specialTmpl(special))
  })
})
