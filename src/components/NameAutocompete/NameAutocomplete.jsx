import { useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';

import contacts from '../../db/contacts.json';

import cl from './NameAutocomplete.module.scss'

const NameAutocomplete = () => {
    const arabicNameInput = useRef(null)
    const englishNameInput = useRef(null)

    const debouncedSearch = useMemo(() => debounce((arabicName) => {
        const result = contacts.find(c => c.arabicName === arabicName);
        if (englishNameInput.current) {
            englishNameInput.current.value = result ? result.englishName : '';
        }
    }, 500), []);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <div className={cl["name-inputs__wrapper"]}>
            <input
                className={cl["name-autocomplete"]}
                ref={arabicNameInput}
                type="text"
                placeholder="Enter Arabic name" 
                onChange={e => debouncedSearch(e.target.value)}
            />
            <input className={cl["name-autocomplete"]} ref={englishNameInput} type="text" placeholder="English name"/>
        </div>
    )
}

export default NameAutocomplete
