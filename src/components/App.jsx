import AddressPrediction from './AddressPrediction'
import NameAutocomplete from './NameAutocompete'
import Container from './UI/Container'

export const App = () => {

  return (
      <>
        <Container>
            <NameAutocomplete />
        </Container>
        <Container>
            <AddressPrediction />
        </Container>
    </>
    
  )
}

export default App
