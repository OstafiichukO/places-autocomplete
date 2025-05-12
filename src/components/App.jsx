import AddressPrediction from './AddressPrediction'
import NameAutocomplete from './NameAutocompete'
import AddressAutocompete from './AddressAutocompete'
import Container from './UI/Container'

export const App = () => {

    return (
        <>
            <Container>
                <h3 style={{ 'margin': '0 0 16px 10px', }}>Names autocomplete from DB</h3>
                <NameAutocomplete />
            </Container>
            <Container>
                <h3 style={{ 'margin': '0 0 16px 10px' }}>Address autocomplete from DB</h3>
                <AddressAutocompete />
            </Container>
            <Container>
                <h3 style={{ 'margin': '0 0 16px 10px' }}>Google maps address autocomplete</h3>
                <AddressPrediction />
            </Container>
        </>

    )
}

export default App
