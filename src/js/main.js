import $ from 'jquery'


// Get news from API
function getNews () {
  return $.ajax({
    url: "https://json-data.herokuapp.com/restaurant/news/1"
  })
}

getNews().then(function (response) {
  console.log(response);
})

// Get menu API
function getMenu() {
return $.ajax({
  url: "https://json-data.herokuapp.com/restaurant/menu/2"
})
}

getMenu().then(function (response){
  console.log(response)
})


// get images from flickr API



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
