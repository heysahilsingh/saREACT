// import useDeviceDetect from "./hooks/useDeviceDetect"

// const device = useDeviceDetect();

const CONSTANTS = {
   CLOUDINAY_IMG: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto",

   // APIs URL
   API_PAGE_HOME: "https://www.swiggy.com/mapi/homepage/getCards?", // location after "?"
   API_PAGE_RESTAURANTS: "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&", // location after "?"

   // API_LOCATION_SUGGESTION: "https://www.swiggy.com/mapi/misc/place-autocomplete?input=", // Keyword after "="
   API_USER_LOCATION: "https://www.swiggy.com/mapi/misc/address-recommend?place_id=", // place_id after "="

   API_LOCATION_SUGGESTION: (() => {
      if(window.innerWidth > 1024){
         return "https://www.swiggy.com/dapi/misc/place-autocomplete?input="
      } else{
         return "https://www.swiggy.com/mapi/misc/place-autocomplete?input="
      }
   })()
}

export default CONSTANTS


// https://www.swiggy.com/dapi/misc/place-autocomplete?input=delhi&types=
// https://www.swiggy.com/mapi/misc/place-autocomplete?input=delhi&types=