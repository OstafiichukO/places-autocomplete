import { useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import addresses from '../../db/addresses.json';

import cl from './AddressAutocompete.module.scss'

const AddressAutocompete = () => {
    const [addressesList, setAddressesList] = useState([])
    const [indicator, setIndicator] = useState('neutral')
    const arabicAddressInput = useRef(null)
    const englishAddressInput = useRef(null)

    const debouncedSearch = useMemo(() => debounce((address_arabic) => {
        const result = addresses.find(c => c.address_arabic === address_arabic);
        const resultsList = addresses.filter(c => c.address_arabic.includes(address_arabic))

        if (englishAddressInput.current) {
            englishAddressInput.current.value = result
                ? result.street
                : '';
        }

        setIndicator(result ? 'success' : 'neutral')
        // result ? setAddressesList([]) : setAddressesList(resultsList)
        setAddressesList(resultsList)
    }, 500), []);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <div className={cl["address-inputs__wrapper"]}>
            <span className={cl["address-autocomplete-wrapper"]}>
                <input
                    className={cl["address-autocomplete"]}
                    list="address"
                    ref={arabicAddressInput}
                    type="text"
                    placeholder="Enter Arabic address" 
                    onChange={e => debouncedSearch(e.target.value)}
                />
                <datalist id="address">
                    {addressesList.map(add => (
                        <option value={add.address_arabic} key={add.address_arabic}>
                            {add.address_arabic}
                        </option>
                    ))}
                </datalist>
            </span>
            <span className={cl["address-autocomplete-wrapper"]}>
                <input
                    className={`${cl["address-autocomplete"]} ${cl[`search-result-${indicator}`]}`}
                    ref={englishAddressInput} 
                    type="text"
                    placeholder="English address (street only)" 
                    disabled
                />
            </span>
        </div>
    )
}

export default AddressAutocompete
