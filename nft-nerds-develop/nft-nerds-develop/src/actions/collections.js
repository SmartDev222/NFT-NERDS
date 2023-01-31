import axios from "axios";

// get asset_contract by contract address
export function contractFetchIsLoading(bool) {
  return {
    type: "CONTRACT_FETCH_IS_LOADING",
    isLoading: bool,
  };
}

export function contractFetchHasErrored(bool) {
  return {
    type: "CONTRACT_FETCH_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function contractFetchSuccess(contract) {
  return {
    type: "CONTRACT_FETCH_SUCCESS",
    contract,
  };
}

export function ContractFetchData(contractAddress) {
  return async (dispatch) => {
    dispatch(contractFetchIsLoading(true));
    axios
      .get(`https://api.opensea.io/api/v1/asset_contract/${contractAddress}`, {
        headers: {
          Accept: "application/json",
          "X-API-KEY": process.env.REACT_APP_OPENSEA_API_KEY,
        },
      })
      .then((res) => {
        dispatch(contractFetchIsLoading(false));

        if (res.status !== 200) {
          dispatch(contractFetchHasErrored(true));
          return;
        }
        dispatch(contractFetchSuccess(res.data));
      })
      .catch(() => {
        dispatch(contractFetchHasErrored(true));
      });
  };
}

// get collection
export function collectionDetailFetchIsLoading(bool) {
  return {
    type: "COLLECTION_DETAIL_FETCH_IS_LOADING",
    isLoading: bool,
  };
}

export function collectionDetailFetchHasErrored(bool) {
  return {
    type: "COLLECTION_DETAIL_FETCH_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function collectionDetailFetchSuccess(collectionDetail) {
  return {
    type: "COLLECTION_DETAIL_FETCH_SUCCESS",
    collectionDetail,
  };
}

export function CollectionDetailFetchData(slug) {
  return async (dispatch) => {
    dispatch(collectionDetailFetchIsLoading(true));
    axios
      .get(`https://api.opensea.io/api/v1/collection/${slug}`, {
        headers: {
          Accept: "application/json",
          "X-API-KEY": process.env.REACT_APP_OPENSEA_API_KEY,
        },
      })
      .then((res) => {
        dispatch(collectionDetailFetchIsLoading(false));
        if (res.status !== 200) {
          dispatch(collectionDetailFetchHasErrored(true));
          return;
        }
        dispatch(collectionDetailFetchSuccess(res.data));
      })
      .catch(() => {
        dispatch(collectionDetailFetchHasErrored(true));
      });
  };
}

// get collection status by collection slug
export function collectionStatsFetchIsLoading(bool) {
  return {
    type: "COLLECTION_STATS_FETCH_IS_LOADING",
    isLoading: bool,
  };
}

export function collectionStatsFetchHasErrored(bool) {
  return {
    type: "COLLECTION_STATS_FETCH_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function collectionStatsFetchSuccess(collectionStats) {
  return {
    type: "COLLECTION_STATS_FETCH_SUCCESS",
    collectionStats,
  };
}

export function CollectionStatsFetchData(slug) {
  return async (dispatch) => {
    dispatch(collectionStatsFetchIsLoading(true));
    axios
      .get(`https://api.opensea.io/api/v1/collection/${slug}/stats`, {
        headers: {
          Accept: "application/json",
          "X-API-KEY": process.env.REACT_APP_OPENSEA_API_KEY,
        },
      })
      .then((res) => {
        dispatch(collectionStatsFetchIsLoading(false));
        if (res.status !== 200) {
          dispatch(collectionStatsFetchHasErrored(true));
          return;
        }
        dispatch(collectionStatsFetchSuccess(res.data));
      })
      .catch(() => {
        dispatch(collectionStatsFetchHasErrored(true));
      });
  };
}

// get collection data from Mysql database

export function collectionBackendFetchIsLoading(bool) {
  return {
    type: "COLLECTION_BACKEND_FETCH_IS_LOADING",
    isLoading: bool,
  };
}

export function collectionBackendFetchHasErrored(bool) {
  return {
    type: "COLLECTION_BACKEND_FETCH_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function collectionBackendFetchSuccess(collectionBackend) {
  return {
    type: "COLLECTION_BACKEND_FETCH_SUCCESS",
    collectionBackend,
  };
}

export function CollectionFetchBackendData(time) {
  return async (dispatch) => {
    dispatch(collectionBackendFetchIsLoading(true));
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}contract/list-per-page?duration=${time}`
      )
      .then((res) => {
        dispatch(collectionBackendFetchIsLoading(false));
        if (res.status !== 200) {
          dispatch(collectionBackendFetchHasErrored(true));
          return;
        }
        dispatch(collectionBackendFetchSuccess(res.data));
      })
      .catch(() => {
        dispatch(collectionBackendFetchHasErrored(true));
      });
  };
}

// get listing data from opensea

export function collectionEventFetchIsLoading(bool) {
  return {
    type: "COLLECTION_EVENT_FETCH_IS_LOADING",
    isLoading: bool,
  };
}

export function collectionEventFetchHasErrored(bool) {
  return {
    type: "COLLECTION_EVENT_FETCH_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function collectionEventFetchSuccess(collectionEvent) {
  return {
    type: "COLLECTION_EVENT_FETCH_SUCCESS",
    collectionEvent,
  };
}

export function CollectionEventFetchData(address, event_type, next_page) {
  let cursor = "";
  if (next_page != undefined || next_page != null) {
    cursor = "&cursor=" + next_page;
  }

  return async (dispatch) => {
    dispatch(collectionEventFetchIsLoading(true));
    axios
      .get(
        `https://api.opensea.io/api/v1/events?only_opensea=true&asset_contract_address=${address}&event_type=${event_type}${cursor}&limit=300`,
        {
          headers: {
            Accept: "application/json",
            "X-API-KEY": process.env.REACT_APP_OPENSEA_API_KEY,
          },
        }
      )
      .then((res) => {
        dispatch(collectionEventFetchIsLoading(false));
        if (res.status !== 200) {
          dispatch(collectionEventFetchHasErrored(true));

          return;
        }

        dispatch(collectionEventFetchSuccess(res.data));
      })
      .catch(() => {
        dispatch(collectionEventFetchHasErrored(true));
      });
  };
}

// get asset detail from opensea

export function collectionAssetFetchIsLoading(bool) {
  return {
    type: "COLLECTION_ASSET_FETCH_IS_LOADING",
    isLoading: bool,
  };
}

export function collectionAssetFetchHasErrored(bool) {
  return {
    type: "COLLECTION_ASSET_FETCH_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function collectionAssetFetchSuccess(collectionAsset) {
  return {
    type: "COLLECTION_ASSET_FETCH_SUCCESS",
    collectionAsset,
  };
}

//https://api.opensea.io/api/v1/asset/0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e/5834/?include_orders=true'
export function CollectionAssetFetchData(addr, id) {
  return async (dispatch) => {
    dispatch(collectionAssetFetchIsLoading(true));
    axios
      .get(
        `https://api.opensea.io/api/v1/asset/${addr}/${id}/?include_orders=true`,
        {
          headers: {
            Accept: "application/json",
            "X-API-KEY": process.env.REACT_APP_OPENSEA_API_KEY,
          },
        }
      )
      .then((res) => {
        dispatch(collectionAssetFetchIsLoading(false));
        if (res.status !== 200) {
          dispatch(collectionAssetFetchHasErrored(true));
          return;
        }
        dispatch(collectionAssetFetchSuccess(res.data));
      })
      .catch(() => {
        dispatch(collectionAssetFetchHasErrored(true));
      });
  };
}

// search collection

export function collectionSearchIsLoading(bool) {
  return {
    type: "COLLECTION_SEARCH_IS_LOADING",
    isLoading: bool,
  };
}

export function collectionSearchHasErrored(bool) {
  return {
    type: "COLLECTION_SEARCH_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function collectionSearchSuccess(collectionSearch) {
  return {
    type: "COLLECTION_SEARCH_SUCCESS",
    payload: collectionSearch,
  };
}

export function CollectionSearchData(key) {
  return async (dispatch) => {
    dispatch(collectionSearchIsLoading(true));
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}contract/search?search_key=${key}`
      )
      .then((res) => {
        dispatch(collectionSearchIsLoading(false));
        if (res.status !== 200) {
          dispatch(collectionSearchHasErrored(true));
          return;
        }
        dispatch(collectionSearchSuccess(res.data));
      })
      .catch(() => {
        dispatch(collectionSearchHasErrored(true));
      });
  };
}

// get collection orders
// https://api.opensea.io/wyvern/v1/orders?asset_contract_address=0x48a0501d67eb0dcccc725e33fa43e08de045816f&is_english=false&bundled=false&include_bundled=false&token_ids=4759&side=1&limit=50&offset=0&order_by=created_date&order_direction=desc

export function collectionOrderFetchIsLoading(bool) {
  return {
    type: "COLLECTION_ORDER_FETCH_IS_LOADING",
    isLoading: bool,
  };
}

export function collectionOrderFetchHasErrored(bool) {
  return {
    type: "COLLECTION_ORDER_FETCH_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function collectionOrderFetchSuccess(collectionOrder) {
  return {
    type: "COLLECTION_ORDER_FETCH_SUCCESS",
    collectionOrder,
  };
}

export function CollectionOrderFetchData(addr, token_ids) {
  return async (dispatch) => {
    dispatch(collectionOrderFetchIsLoading(true));
    axios
      .get(
        `https://api.opensea.io/wyvern/v1/orders?asset_contract_address=${addr}&is_english=false&bundled=false&include_bundled=false${token_ids}&side=1&limit=50&offset=0&order_by=created_date&order_direction=desc`,
        {
          headers: {
            Accept: "application/json",
            "X-API-KEY": process.env.REACT_APP_OPENSEA_API_KEY,
          },
        }
      )
      .then((res) => {
        dispatch(collectionOrderFetchIsLoading(false));
        if (res.status !== 200) {
          dispatch(collectionOrderFetchHasErrored(true));
          return;
        }
        dispatch(collectionOrderFetchSuccess(res.data));
      })
      .catch(() => {
        dispatch(collectionOrderFetchHasErrored(true));
      });
  };
}
