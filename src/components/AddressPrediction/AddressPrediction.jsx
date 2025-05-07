import { useState } from "react"

import PlacesAutocomplete from "../UI/PlacesAutocomplete"
import List from "../UI/List"

const AddressPrediction = () => {
    const [addressList, setAddressList] = useState([])

    const onAddressChange = (address) => {
        setAddressList((prevState) => [...prevState, address])
    }
    
    return (
        <>
            <PlacesAutocomplete onAddressChange={onAddressChange} />
            <List addressList={addressList}/>
        </>
    )
}

export default AddressPrediction
