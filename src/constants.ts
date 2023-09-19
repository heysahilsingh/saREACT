const CONSTANTS = {
   IMG_CDN: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/",

   // APIs URL
   API_PAGE_HOME: {
      url: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/homepage/getCards?",
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/homepage/getCards?",
      },
      getUrl: function (userLat: number, userLng: number, device: "desk" | "mob") {
         return `https://corsproxy.io/?https://www.swiggy.com/${device === "desk" ? "d" : "m"}api/homepage/getCards?lat=${userLat}&lng=${userLng}`;
      },
   },

   API_PAGE_RESTAURANTS: {
      url: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&",
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&"
      },
      getUrl: function (userLat: number, userLng: number, device: "desk" | "mob") {
         return `https://corsproxy.io/?https://www.swiggy.com/${device === "desk" ? "d" : "m"}api/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${userLat}&lng=${userLng}`;
      },
   },

   API_PAGE_RESTAURANT: {
      url: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&",
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&"
      },
      getUrl: function (userLat: number, userLng: number, restaurantId: string, device: "desk" | "mob") {
         return `https://corsproxy.io/?https://www.swiggy.com/${device === "desk" ? "d" : "m"}api/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${userLat}&lng=${userLng}&restaurantId=${restaurantId}`;
      },
   },

   API_PAGE_COLLECTIONS: {
      mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/restaurants/list/v5?lat=28.6497478&lng=77.137371&collection=54802&type=rcv2",
      desk: "https://corsproxy.io/?https://www.swiggy.com/mapi/restaurants/list/v5?lat=28.6497478&lng=77.137371&collection=54802&type=rcv2",
      getURL: (lat: number, lng: number, collectionId: string, device: "desk" | "mob") => {
         return (
            `https://corsproxy.io/?https://www.swiggy.com/${device === "desk" ? "dapi" : "mapi"}/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collectionId}&type=rcv2`
         )
      }
   },

   API_GET_RESTROS: {
      url: "https://corsproxy.io/?https://www.swiggy.com/api/seo/getListing?",
      getUrl: function (userLat: number, userLng: number) {
         return `${this.url}lat=${userLat}&lng=${userLng}`;
      },
   },

   API_PAGE_RESTRO_NEAR: {
      url: "https://corsproxy.io/?https://www.swiggy.com/api/seo/getListing?",
      getUrl: function (userLat: number, userLng: number) {
         return `${this.url}lat=${userLat}&lng=${userLng}`;
      },
   },

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
   aggregatedDiscountInfoV2: {
      header: string,
      descriptionList: { discountType: string, meta: string, operationType: string }[],
      shortDescriptionList: { discountType: string, meta: string, operationType: string }[],
   },
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
      fees: { name: string, fee: number }[],
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

export type TypeRestroFilterAPIBody = {
   filters: {
      isFiltered: true,
      facets: {
         deliveryTime: { value: string }[] | [],
         isVeg: { value: string }[] | [],
         restaurantOfferMultiTd: { value: string }[] | [],
         explore: { value: string }[] | [],
         costForTwo: { value: string }[] | [],
         rating: { value: string }[] | [],
         catalog_cuisines: { value: string }[] | []
      },
      sortAttribute: string
   },
   lat: number | null,
   lng: number | null,
   widgetOffset: { collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: string },
}

export default CONSTANTS