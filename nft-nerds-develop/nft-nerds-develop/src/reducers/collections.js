const initialState = {
  searchResultData: [],
  searchDetailPageData: [],
};

export function contractFetchHasErrored(state = false, action) {
  switch (action.type) {
    case "CONTRACT_FETCH_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function contractFetchIsLoading(state = false, action) {
  switch (action.type) {
    case "CONTRACT_FETCH_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function contract(state = [], action) {
  switch (action.type) {
    case "CONTRACT_FETCH_SUCCESS":
      return action.contract;
    default:
      return state;
  }
}

export function collectionDetailFetchHasErrored(state = false, action) {
  switch (action.type) {
    case "COLLECTION_DETAIL_FETCH_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function collectionDetailFetchIsLoading(state = false, action) {
  switch (action.type) {
    case "COLLECTION_DETAIL_FETCH_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function collectionDetail(state = [], action) {
  switch (action.type) {
    case "COLLECTION_DETAIL_FETCH_SUCCESS":
      return action.collectionDetail;
    default:
      return state;
  }
}

//get collection Status by collection slug

export function collectionStatusFetchHasErrored(state = false, action) {
  switch (action.type) {
    case "COLLECTION_STATUS_DETAIL_FETCH_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function collectionStatusFetchIsLoading(state = false, action) {
  switch (action.type) {
    case "COLLECTION_STATUS_FETCH_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function collectionStatus(state = [], action) {
  switch (action.type) {
    case "COLLECTION_STATUS_FETCH_SUCCESS":
      return action.collectionStatus;
    default:
      return state;
  }
}

// get collection data from Mysql database

export function collectionBackendFetchHasErrored(state = false, action) {
  switch (action.type) {
    case "COLLECTION_BACKEND_FETCH_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function collectionBackendFetchIsLoading(state = false, action) {
  switch (action.type) {
    case "COLLECTION_BACKEND_FETCH_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function collectionBackend(state = [], action) {
  switch (action.type) {
    case "COLLECTION_BACKEND_FETCH_SUCCESS":
      return action.collectionBackend;
    default:
      return state;
  }
}

// get event data from opensea

export function collectionEventFetchHasErrored(state = false, action) {
  switch (action.type) {
    case "COLLECTION_EVENT_FETCH_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function collectionEventFetchIsLoading(state = false, action) {
  switch (action.type) {
    case "COLLECTION_EVENT_FETCH_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function collectionEvent(state = [], action) {
  switch (action.type) {
    case "COLLECTION_EVENT_FETCH_SUCCESS":
      return action.collectionEvent;
    default:
      return state;
  }
}

//get asset data from opensea

export function collectionAssetFetchHasErrored(state = false, action) {
  switch (action.type) {
    case "COLLECTION_ASSET_FETCH_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function collectionAssetFetchIsLoading(state = false, action) {
  switch (action.type) {
    case "COLLECTION_ASSET_FETCH_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function collectionAsset(state = [], action) {
  switch (action.type) {
    case "COLLECTION_ASSET_FETCH_SUCCESS":
      return action.collectionAsset;
    default:
      return state;
  }
}

//get trades from amazonaws

// export function collectionTradesFetchHasErrored(state = false, action) {
//   switch (action.type) {
//     case 'COLLECTION_TRADES_FETCH_HAS_ERRORED':
//       return action.hasErrored;
//     default:
//       return state;
//   }
// }

// export function collectionTradesFetchIsLoading(state = false, action) {
//   switch (action.type) {
//     case 'COLLECTION_TRADES_FETCH_IS_LOADING':
//       return action.isLoading;
//     default:
//       return state;
//   }
// }

// export function collectionTrades(state = [], action) {
//   switch (action.type) {
//     case 'COLLECTION_TRADES_FETCH_SUCCESS':
//       return action.collectionTrades;
//     default:
//       return state;
//   }
// }

// search collection

export function collectionSearchHasErrored(state = false, action) {
  switch (action.type) {
    case "COLLECTION_SEARCH_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function collectionSearchIsLoading(state = false, action) {
  switch (action.type) {
    case "COLLECTION_SEARCH_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function collectionSearch(state = initialState, action) {
  switch (action.type) {
    case "COLLECTION_SEARCH_SUCCESS":
      return {
        ...state,
        searchResultData: action.payload,
      };
    default:
      return state;
  }
}

// collection stats
export function collectionStatsFetchHasErrored(state = false, action) {
  switch (action.type) {
    case "COLLECTION_STATS_FETCH_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function collectionStatsFetchIsLoading(state = false, action) {
  switch (action.type) {
    case "COLLECTION_STATS_FETCH_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function collectionStats(state = [], action) {
  switch (action.type) {
    case "COLLECTION_STATS_FETCH_SUCCESS":
      return action.collectionStats;
    default:
      return state;
  }
}

// get orders
export function collectionOrderFetchHasErrored(state = false, action) {
  switch (action.type) {
    case "COLLECTION_ORDER_FETCH_HAS_ERRORED":
      return action.hasErrored;
    default:
      return state;
  }
}

export function collectionOrderFetchIsLoading(state = false, action) {
  switch (action.type) {
    case "COLLECTION_ORDER_FETCH_IS_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function collectionOrder(state = [], action) {
  switch (action.type) {
    case "COLLECTION_ORDER_FETCH_SUCCESS":
      return action.collectionOrder;
    default:
      return state;
  }
}
