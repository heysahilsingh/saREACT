const CONSTANTS = {
   IMG_CDN: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/",

   // APIs URL
   API_PAGE_HOME: {
      mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/homepage/getCards?", // location after "?" in "lat=2&lng=2"
      desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/homepage/getCards?" // location after "?" in "lat=2&lng=2"
   }, 
   API_PAGE_RESTAURANTS: {
      mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&", // location after "&" in "lat=2&lng=2"
      desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&" // location after "&" in "lat=2&lng=2"
   }, 

   API_RESTRO_NEAR: "https://corsproxy.io/?https://www.swiggy.com/api/seo/getListing?", // location after "?" in "lat=2&lng=2"

   API_LOCATION_SUGGESTION: {
      mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/misc/place-autocomplete?input=", // keyword after "?"
      desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/misc/place-autocomplete?input=" // keyword after "?"
   }, // Keyword after "="
   API_USER_LOCATION: {
      by_place_id: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/misc/address-recommend?place_id=", // place_id after "?"
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id=" // place_id after "?"
      },
      by_geo_id: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/misc/address-recommend?", // after ? "latlng=28.721152%2C77.0605056"
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?" // after ? "latlng=28.721152%2C77.0605056"
      }
   }, // place_id after "="
}

export default CONSTANTS


// https://www.swiggy.com/mapi/misc/address-recommend?latlng=28.721152%2C77.0605056