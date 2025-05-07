import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import { useRef } from 'react';

import cl from './PlacesAutocomplete.module.scss'

const PlacesAutocomplete = ({ onAddressChange }) => {
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const inputRef = useRef(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    })

    const handleOnPlacesChanged = () => {
        let address = inputRef.current.getPlaces()
        onAddressChange(address[0].formatted_address)
    }

    return (
        <>
            {isLoaded && 
                <StandaloneSearchBox
                    onLoad={(ref) => inputRef.current = ref}
                    onPlacesChanged={handleOnPlacesChanged}
                >
                    <input className={cl["places-autocomplete"]} type="text" placeholder="Enter address..." />
                </StandaloneSearchBox>
            }
        </>
    )
}

export default PlacesAutocomplete
