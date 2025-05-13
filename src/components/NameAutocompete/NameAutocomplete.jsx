import { useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import contacts from '../../db/contacts.json';
import {transliterate_ar_to_en} from '../../services/openai.js'

import cl from './NameAutocomplete.module.scss'

const NameAutocomplete = () => {
    const [namesList, setNamesList] = useState([])
    const [indicator, setIndicator] = useState('neutral')
    const arabicNameInput = useRef(null)
    const englishNameInput = useRef(null)

    const transliterate = async (arabicName) => {
        const result = await transliterate_ar_to_en(arabicName)
        return result
    }
    const debouncedSearch = useMemo(() => debounce(async (arabicName) => {
        if (!arabicName) setIndicator('neutral')
        let result = contacts.find(c => c.arabicName === arabicName);
        if (result) setIndicator('success')
        
        if (!result && arabicName) {
            const transliterated = await transliterate(arabicName);
            result = { arabicName, englishName: transliterated };
            setIndicator('warning')
        }

        const resultsList = contacts.filter(c => c.arabicName.includes(arabicName))
        
        if (englishNameInput.current) {
            englishNameInput.current.value = result ? result.englishName : '';
        }

        // result ? setNamesList([]) : setNamesList(resultsList)
        setNamesList(resultsList)
    }, 500), []);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <div className={cl["name-inputs__wrapper"]}>
            <span className={cl["name-autocomplete-wrapper"]}>
                <input
                    className={cl["name-autocomplete"]}
                    list="name"
                    ref={arabicNameInput}
                    type="text"
                    placeholder="Enter Arabic name" 
                    onChange={e => debouncedSearch(e.target.value)}
                />
                <datalist id="name">
                    {namesList.map(n => (
                        <option value={n.arabicName} key={n.arabicName}>
                            {n.arabicName}
                        </option>
                    ))}
                </datalist>
            </span>
            <span className={cl["name-autocomplete-wrapper"]}>
                <input
                    className={`${cl["name-autocomplete"]} ${cl[`search-result-${indicator}`]}`}
                    ref={englishNameInput}
                    type="text"
                    placeholder="English name"
                    disabled
                />
            </span>
        </div>
    )
}

export default NameAutocomplete
