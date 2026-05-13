const initialState = {
    releases: [],
    loading: false,
    error: null,
};

const viewReleaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_RELEASES_SUCCESS':
            return { ...state, releases: action.payload, loading: false };
        case 'FETCH_RELEASES_FAILURE':
            return { ...state, error: action.error, loading: false };
        case 'UPDATE_RELEASE_SUCCESS':
            return {
                ...state,
                releases: state.releases.map((release) =>
                    release.transactionId === action.payload.transactionId
                        ? { ...release, ...action.payload }
                        : release
                ),
            };
        case 'DELETE_RELEASE_SUCCESS':
            return {
                ...state,
                releases: state.releases.filter(
                    (release) => release.transactionId !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default viewReleaseReducer.reducer;
