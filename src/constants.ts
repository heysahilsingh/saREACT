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

   API_GET_RESTRO_OUTLET: {
      url: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/menu/api/v1/json/layout-section/MENU_MULTI_OUTLET",
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/api/v1/json/layout-section/MENU_MULTI_OUTLET"
      },
      getUrl: function (device: "desk" | "mob") {
         return device === "desk" ? this.url.desk : this.url.mob
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

   API_RESTRO_UPDATE: {
      url: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/restaurants/list/update",
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update"
      }
   },

   API_LOCATION_SUGGESTION: {
      url: {
         mob: "https://corsproxy.io/?https://www.swiggy.com/mapi/misc/place-autocomplete?input=",
         desk: "https://corsproxy.io/?https://www.swiggy.com/dapi/misc/place-autocomplete?input="
      }
   },

   API_USER_LOCATION: {
      url: {
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
      }
   },
}

export type TypeRestaurantInformation = {
   type: string,
   name: string,
   id: string,
   uniqueId: string,
   parentId: string,
   logo: string,
   cloudinaryImageId: string,
   isOpen: boolean,
   latLong: string
   areaName: string,
   locality: string,
   city: string,
   totalRatings: number,
   totalRatingsString: string,
   avgRating: number,
   avgRatingString: string,
   ratingSlab: string,
   hasBestsellerItems: boolean,
   costForTwo: string,
   costForTwoMessage: string,
   veg: boolean,
   cuisines: string[],

   displayType: string,
   differentiatedUi: {
      displayType: string,
      differentiatedUiMediaDetails: {
         mediaType: string,
      }
   },
   badges: object,
   badgesV2: {
      cloudinaryImageId: string,
      costForTwo: string,
   },

   slugs: {
      restaurant: string,
      city: string
   },
   slugString: string,
   feeDetails: {
      restaurantId: string,
      fees: { name: string, fee: number }[],
      totalFee: number,
      icon: string,
      message: string
   },
   sla: {
      restaurantId: string,
      deliveryTime: number,
      minDeliveryTime: number,
      maxDeliveryTime: number,
      lastMileTravel: number,
      serviceability: string,
      stressFactor: number,
      rainMode: string,
      longDistance: "LONG_DISTANCE_NOT_LONG_DISTANCE" | "LONG_DISTANCE_IT_IS_LONG_DISTANCE",
      zoneId: number,
      slaString: string,
      lastMileTravelString: string,
      iconType: string
   },
   availability: {
      nextCloseTime: string,
      visibility: boolean,
      opened: boolean,
      restaurantClosedMeta: object
   },
   multiOutlet: boolean,
   labels: {
      title: string,
      message: string
   }[],
   nudgeBanners: [
      {
         minValue: number,
         maxValue: number,
         priority: number,
         couponCode: string,
         discountInfo: {
            discountType: string,
            value: number
         },
         lockedMessage: string,
         unlockedMessage: string,
         logoCtx: object
      }
   ],
   headerBanner: {
      url: string
   },
   aggregatedDiscountInfo: {
      header: string,
      shortDescriptionList: {
         meta: string,
         discountType: string,
         operationType: string
      }[],
      descriptionList: {
         meta: string,
         discountType: string,
         operationType: string
      }[],
      visible: boolean
   },
   aggregatedDiscountInfoV2: {
      header: string,
      shortDescriptionList: {
         meta: string,
         discountType: string,
         operationType: string
      }[],
      descriptionList: {
         meta: string,
         discountType: string,
         operationType: string
      }[],
      couponDetailsCta: string
   },
   aggregatedDiscountInfoV3: {
      header: string,
      subHeader: string
   }
   expectationNotifiers: [
      {
         text: string,
         icon: {
            imageId: string
         },
         popup: {
            cta: object
         },
         type: string,
         enrichedText: string,
         halfCardPopup: {
            halfCardPopupHeader: object
         }
      }
   ],
   orderabilityCommunication: {
      title: object,
      subTitle: object,
      message: object,
      customIcon: object
   },
   cartOrderabilityNudgeBanner: {
      parameters: object,
      presentation: object
   },
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

export type TypeMenuItem = {
   id: string,
   name: string,
   category: string,
   description: string,
   imageId: string,
   inStock: number,
   isBestseller: number,
   price: number,
   defaultPrice: number,
   addons: {
      groupId: string,
      groupName: string,
      choices: {
         id: string,
         name: string,
         price: number,
         inStock: number,
         isVeg: number,
         isEnabled: number
      }[],
      maxAddons: number,
      maxFreeAddons: number,
      minAddons: number
   }[],
   itemAttribute: {
      vegClassifier: "VEG" | "NONVEG",
      portionSize: string
   },
   ratings: {
      aggregatedRating: {
         rating: string,
         ratingCount: string,
         ratingCountV2: string
      }
   },
   offerTags: {
      title: string,
      subTitle: string
   }[],
   ribbon: {
      text: string,

   },
   showImage: boolean
}

export default CONSTANTS