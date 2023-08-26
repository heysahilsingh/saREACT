const CONSTANTS = {
   CLOUDINAY_IMG: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto",
   USER_LOCATION: "lat=28.649972&lng=77.143636",

   // APIs URL
   PAGE_HOME: "https://www.swiggy.com/mapi/homepage/getCards?", // location after "?"
   PAGE_RESTAURANTS: "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&", // location after "?"

   DELIVERY_LOCATION_SUGGESTION: "https://www.swiggy.com/mapi/misc/place-autocomplete?input=", // Keyword after "="
   DELIVERY_LOCATION: "https://www.swiggy.com/mapi/misc/address-recommend?place_id=", // place_id after "="
}

export default CONSTANTS