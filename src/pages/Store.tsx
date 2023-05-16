import storeItens from '../data/itens.json';
import {Col, Row} from 'react-bootstrap';
import StoreItem from '../components/StoreItem';

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      {/* MD MEDIUM, XS XSMALL, LG LARGE */}
      <Row md={2} xs={1} lg={3} className='g-3'>
        {storeItens.map((item)=>(
          <Col key={item.id}>
            <StoreItem {...item}/>
          </Col>
        ))}
        
      </Row>
    </>
  )
}

export default Store
