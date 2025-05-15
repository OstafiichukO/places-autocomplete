import AddressPrediction from './AddressPrediction'
import NameAutocomplete from './NameAutocompete'
import AddressAutocompete from './AddressAutocompete'
import Container from './UI/Container'

// import contacts from '../db/contacts.json';
// import bigContacts from '../db/big-base-contacts.json';


export const App = () => {

    // const arSet = new Set(
    //     bigContacts
    //         .map(e => {
    //             const first = (e['AR Name'] || '').trim();
    //             const last = (e['AR Last Name'] || '').trim();
    //             return (first + ' ' + last).trim();
    //         })
    //         .filter(full => full !== '')
    // );

    // const matchedCount = contacts.reduce(
    //     (count, e) =>
    //         arSet.has((e.arabicName || '').trim()) ? count + 1 : count,
    //     0
    // );
    // console.log(
    //     'Match percentage:',
    //     (matchedCount / bigContacts.length * 100).toFixed(2) + '%'
    // );
    // console.log(`Matched contacts: ${matchedCount}`);

    return (
        <>
            <Container>
                <h3 style={{ 'margin': '0 0 16px 10px', }}>Names autocomplete from DB + OpenAI transliterate if name not found in DB</h3>
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
