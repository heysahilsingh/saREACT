const CONSTANTS = {
   IMG_CDN: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/",

   // APIs URL
   API_PAGE_HOME: "https://www.swiggy.com/dapi/homepage/getCards?", // location after "?" in "lat=2&lng=2"
   API_PAGE_RESTAURANTS: "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&", // location after "&" in "lat=2&lng=2"

   API_RESTRO_NEAR: "https://www.swiggy.com/api/seo/getListing?", // location after "?" in "lat=2&lng=2"

   API_LOCATION_SUGGESTION: "https://www.swiggy.com/dapi/misc/place-autocomplete?input=", // Keyword after "="
   API_USER_LOCATION: "https://www.swiggy.com/dapi/misc/address-recommend?place_id=", // place_id after "="
}

export default CONSTANTS


// https://www.swiggy.com/dapi/misc/place-autocomplete?input=delhi&types=
// https://www.swiggy.com/mapi/misc/place-autocomplete?input=delhi&types=