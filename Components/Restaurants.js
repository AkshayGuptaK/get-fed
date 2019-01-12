import Link from 'next/link'
import {
  // Button,
  Card,
  CardBody,
  // CardColumns,
  CardImg,
  // CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Row
} from 'reactstrap'

const Restaurants = (props) => {
  const RestaurantList = props.restaurants
  if (!RestaurantList) return <h1>Loading</h1>

  if (RestaurantList && RestaurantList.length) {
    return (
      <div>
        <div className='h-100'>
          <Container fluid>
            {RestaurantList.map(res => (
              <Card
                style={{ width: '30%', margin: '0 10px 10px 10px' }}
                className='h-100'
                key={res._id}
              >
                <CardImg
                  top
                  style={{ height: 250, maxHeight: 250 }}
                  src={`${res.thumb}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <Row>
                    <Col>
                      <CardText>{'₹' + res.cost}</CardText>
                    </Col>
                    <Col>
                      <CardText>{'Rating : ' + Math.ceil(res.rating)}</CardText>
                    </Col>
                  </Row>
                </CardBody>
                <div className='card-footer'>
                  {/* <Link
                    as={`/restaurants/${res._id}`}
                    href={`/restaurants?id=${res._id}`}
                  > */}
                  <Link as={`/items`} href={`/items`}>
                    <a className='btn btn-primary'>View</a>
                  </Link>
                  {/* </Link> */}
                </div>
              </Card>
            ))}
          </Container>
        </div>

        <style jsx global>
          {`
            a {
              color: white;
            }
            a:link {
              text-decoration: none;
              color: white;
            }
            a:hover {
              color: white;
            }
            .card-columns {
              column-count: 3;
            }
            .card {
              display: inline-block !important;
            }
          `}
        </style>
      </div>
    )
  } else {
    return <h1>No Restaurants Found</h1>
  }
}

export default Restaurants
