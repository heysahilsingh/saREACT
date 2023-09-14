const CONSTANTS = {
   IMG_CDN: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/",

   // APIs URL
   API_PAGE_HOME: {
      mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/homepage/getCards?",
      desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/homepage/getCards?"
      // location after "?" in "lat=2&lng=2"
   },
   API_PAGE_RESTAURANTS: {
      mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&",
      desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&"
      // location after "&" in "lat=2&lng=2"
   },

   API_PAGE_RESTAURANT: {
      mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&",
      desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&"
      // location after "&" in "lat=2&lng=2" then "&restaurantId=" add restaurant Id after "="
   },

   API_RESTRO_NEAR: "https://corsproxy.io/?https://www.swiggy.com/api/seo/getListing?", // location after "?" in "lat=2&lng=2"

   API_RESTRO_FILTERED: "https://corsproxy.io/?https://www.swiggy.com/api/seo/getListing?", // location after "?" in "lat=2&lng=2"

   API_RESTRO_UPDATE: {
      mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/restaurants/list/update",
      desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update"
   },

   API_LOCATION_SUGGESTION: {
      mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/misc/place-autocomplete?input=",
      desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/misc/place-autocomplete?input="
      // keyword after "="
   },
   API_USER_LOCATION: {
      by_place_id: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/misc/address-recommend?place_id=",
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id="
         // place_id after "?"
      },
      by_geo_id: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/misc/address-recommend?",
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?"
         // after ? "latlng=28.721152%2C77.0605056"
      }
   },
}

export type TypeRestroCard = {
   aggregatedDiscountInfoV2: object,
   aggregatedDiscountInfoV3: {
      header: string,
      subHeader: string
  }
   areaName: string,
   availability: {
      nextCloseTime: string,
      opened: boolean
   },
   avgRating: number,
   avgRatingString: string,
   badges: object,
   badgesV2: {
      cloudinaryImageId: string,
      costForTwo: string,
      entityBadges: {
         imageBased: object,
         textBased: object,
         textExtendedBadges: object
      }
   },
   cloudinaryImageId: string,
   costForTwo: string,
   cuisines: string[],
   differentiatedUi: {
      displayType: string,
      differentiatedUiMediaDetails: {
         lottie: object,
         mediaType: string,
         video: object
      }
   },
   displayType: string,
   feeDetails: {
      fees: {name: string, fee: number}[],
      restaurantId: string,
      totalFee: number
   },
   id: string,
   isOpen: boolean,
   locality: string,
   name: string,
   parentId: string,
   restaurantOfferPresentationInfo: object,
   reviewsSummary: object,
   sla: {
      deliveryTime: number,
      iconType: string,
      lastMileTravel: number,
      lastMileTravelString: string,
      serviceability: string,
      slaString: string
   },
   totalRatingsString: string,
   type: string,
   veg: boolean
}

export default CONSTANTS