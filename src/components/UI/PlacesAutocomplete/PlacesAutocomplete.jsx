import { useJsApiLoader } from '@react-google-maps/api'
import { useState, useEffect, useRef } from 'react';

import cl from './PlacesAutocomplete.module.scss'

const PlacesAutocomplete = ({ onAddressChange }) => {
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // const defaultData = {
    //     "district": "Rod Elfarag",
    //     "city": "Cairo",
    //     "governorate": "Cairo",
    //     "country": "Egypt",
    // }

    const serviceRef = useRef(null)
    const detailsServiceRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    })

    useEffect(() => {
        if (isLoaded) {
            serviceRef.current = new window.google.maps.places.AutocompleteService();
            detailsServiceRef.current = new window.google.maps.places.PlacesService(
                document.createElement('div')
            );
        }
    }, [isLoaded])

    // Form fields state
    const [district, setDistrict] = useState('Markaz Elmahalla Elkobra');
    const [city, setCity] = useState('Gharbia');
    const [governorate, setGovernorate] = useState('Gharbia');
    const [country, setCountry] = useState('Egypt');
    const [addressArabic, setAddressArabic] = useState('');
    const [street, setStreet] = useState('');
    const [predictions, setPredictions] = useState([]);

    // Build full address and request predictions
    const updatePredictions = () => {
        const parts = [district, city, governorate, country, addressArabic]
            .filter(Boolean)
            .join(', ');
        if (serviceRef.current && parts) {
            serviceRef.current.getPlacePredictions(
                { input: parts },
                (preds, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        console.log('result', preds)
                        setPredictions(preds);
                    } else {
                        setPredictions([]);
                    }
                }
            );
        } else {
            setPredictions([]);
        }
    };

    return (
        <div className={cl["places-autocomplete-container"]}>
            <span className={cl["places-autocomplete-wrapper"]}>
                <label class={cl["places-autocomplete-label"]} for="district-input">District</label>
                <input
                    name="district-input"
                    className={cl["places-autocomplete"]}
                    type="text"
                    placeholder="District"
                    value={district}
                    onChange={(e) => { setDistrict(e.target.value); updatePredictions(); }}
                />
            </span>
            <span className={cl["places-autocomplete-wrapper"]}>
                <label class={cl["places-autocomplete-label"]} for="city-input">City</label>
                <input
                    name="city-input"
                    className={cl["places-autocomplete"]}
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => { setCity(e.target.value); updatePredictions(); }}
                />
            </span>
            <span className={cl["places-autocomplete-wrapper"]}>
                <label class={cl["places-autocomplete-label"]} for="district-input">Governorate</label>
                <input
                    name="governorate-input"
                    className={cl["places-autocomplete"]}
                    type="text"
                    placeholder="Governorate"
                    value={governorate}
                    onChange={(e) => { setGovernorate(e.target.value); updatePredictions(); }}
                />
            </span>
            <span className={cl["places-autocomplete-wrapper"]}>
                <label class={cl["places-autocomplete-label"]} for="country-input">Country</label>
                <input
                    name="country-input"
                    className={cl["places-autocomplete"]}
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => { setCountry(e.target.value); updatePredictions(); }}
                />
            </span>
            <span className={cl["places-autocomplete-wrapper"]}>
                <label class={cl["places-autocomplete-label"]} for="address-arabic-input">Address Arabic</label>
                <input
                    name="address-arabic-input"
                    className={cl["places-autocomplete"]}
                    type="text"
                    placeholder="Address Arabic"
                    value={addressArabic}
                    onChange={(e) => { setAddressArabic(e.target.value); updatePredictions(); }}
                />
            </span>
            <span className={cl["places-autocomplete-wrapper"]}>
                <label class={cl["places-autocomplete-label"]} for="street-input">Street (from google)</label>
                <input
                    name="streen-input"
                    className={cl["places-autocomplete"]}
                    type="text"
                    placeholder="Street"
                    value={street}
                    disabled
                />
            </span>
            {predictions.length > 0 && (
                <ul className={cl["autocomplete-suggestions"]}>
                    {predictions.map((p) => (
                        <li
                            key={p.place_id}
                            className={cl["autocomplete-suggestion"]}
                            onClick={() => {
                                if (detailsServiceRef.current) {
                                    detailsServiceRef.current.getDetails(
                                        { placeId: p.place_id, fields: ['name'] },
                                        (place, status) => {
                                            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                                onAddressChange(place.name);
                                                setStreet(place.name)
                                            }
                                        }
                                    );
                                }
                                setPredictions([]);
                            }}
                        >
                            {p.structured_formatting.main_text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PlacesAutocomplete
