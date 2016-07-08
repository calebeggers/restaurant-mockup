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
//   })
// })
//
//  maps api key = AIzaSyAe2CZi1T36a6M2wX80RpcvkSo5qLX2E3g
// flickr api key = ac1d68d86f7ac6c91836942a7af814db
// flickr secret = 1e26f05f9ffc8458
// ////////////////////////////////////////////////////////////////////////////////////////////////

// create insert news html/template literal

function newsTmpl(obj){
  return `
  <div class="news-main">Latest News</div>
  <span class="news-title">${obj.title}</span>
  <span class="news-date">${obj.date_published}</span>
  <div class="news-post">${obj.post}</div>
  `
}

getNews().then(function(data){
  $('.news').append(newsTmpl(data));
})

// create and insert special template

function specialTmpl(obj){
  return `
  <div class="special-main">Today's Special</div>
  <img src="https://farm8.staticflickr.com/7477/15742927851_825073c2d6.jpg">
  <span class="special-title">${obj[0].item}</span>
  <span class="special-price">${obj[0].price}</span>
  <div class="special-post">${obj[0].description}</div>
  `
}

var special_id;
var special;
getSpecial().then(function(data){
  special_id = data.menu_item_id;
  getMenu().then(function(food){
    special = food.sides.filter(function(menuitem){
      return menuitem.id === special_id
    })
    $('.special').append(specialTmpl(special))
  })
})



// tabbed menu etc

$(document).ready(function(){

	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$( "#" + tab_id).addClass('current');
	})
})

// template for items

function allTmpl(obj){
  return `
  <div class="menu-item">
  <div class="food-info">
  <span class="food-name">${obj.item}</span>
  <span class="food-price">${obj.price}</span>
  </div>
  <span class="food-desc">${obj.description}</span>
  <div class="food-icons">
    <p class="test-p"><img src="./images/v.png"><span class="test-span">
      <span class="icon-title">Allergy info</span>
      <span class="icon-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
      </span>
    </p>
    <p class="test-p"><img src="./images/spice.png"><span class="test-span">
      <span class="icon-title">Allergy info</span>
      <span class="icon-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
    </span>
    </p>
    <p class="test-p"><img src="./images/favorite.png"><span class="test-span">
    <span class="icon-title">Allergy info</span>
      <span class="icon-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
    </span>
    </p>
    <p class="test-p"><img src="./images/exclaimation.png"><span class="test-span">
      <span class="icon-title">Allergy info</span>
      <span class="icon-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
    </span>
    </p>
  </div>
  </div>
  `
}

// insert breakfast
getMenu().then(function(data){
  console.log(data.breakfast)
  data.breakfast.forEach( function(obj){
    console.log(obj);
    $('.apps').append(allTmpl(obj))
  })
})

// insert sandies
getMenu().then(function(data){
  console.log(data.breakfast)
  data.sandwiches.forEach( function(obj){
    console.log(obj);
    $('.sandies').append(allTmpl(obj))
  })
})

// insert sides
getMenu().then(function(data){
  console.log(data.breakfast)
  data.sides.forEach( function(obj){
    console.log(obj);
    $('.sides').append(allTmpl(obj))
  })
})

// functions for submit message

function thanksTmpl(){
  return`
  <span class="Thanks">Thank you! Your reservation has been confirmed!</span>
`
}

function buttonClick(event) {
  event.preventDefault()
  $('.form').html(thanksTmpl);
}

$('#reserve-table').on('click', buttonClick);
