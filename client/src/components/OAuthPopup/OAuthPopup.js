import { useEffect } from "react";
import { OAUTH_STATE_KEY } from "./constants"
import { queryToObject } from "./tools";

const checkState = (receivedState) => {
    const state = sessionStorage.getItem(OAUTH_STATE_KEY);
    return state === receivedState;
};

const OAuthPopup = () => {

    // On mount
    useEffect(() => {
        
        const payload = {
            ...queryToObject(window.location.search.split('?')[1]), // видимо берем данные из строки??
            ...queryToObject(window.location.hash.split('#')[1]),
        };

        
        const state = payload?.state;
        const error = payload?.error;
        /*
        if (!window.opener) {
			throw new Error('No window opener');
		}

		if (error) {
			window.opener.postMessage({
				type: OAUTH_RESPONSE,
				error: decodeURI(error) || 'OAuth error: An error has occured.',
			});
		} else if (state && checkState(state)) {
			window.opener.postMessage({
				type: OAUTH_RESPONSE,
				payload,
			});
		} else {
			window.opener.postMessage({
				type: OAUTH_RESPONSE,
				error: 'OAuth error: State mismatch.',
			});
		}
        */
       console.log('useEffect');
       console.log('payload.state= ', payload.state);
       console.log('payload.error= ', payload.error);
        
    }, [])
    

    return (
        <div style={{ margin: '12px' }} data-testid="popup-loading">
				Loading...
	    </div>
    )
}

export default OAuthPopup;
