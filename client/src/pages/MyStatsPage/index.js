import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';
import monkey from '../../images/monkey.png';


function MyStatsPage() {
<></>

// ------------ HANDLE BUTTON REQUEST ------------//
    // function simulateNetworkRequest() {
    //     return new Promise((resolve) => setTimeout(resolve, 2000));
    //   }
      
    //   function LoadingButton() {
    //     const [isLoading, setLoading] = useState(false);
      
    //     useEffect(() => {
    //       if (isLoading) {
    //         simulateNetworkRequest().then(() => {
    //           setLoading(false);
    //         });
    //       }
    //     }, [isLoading]);
      
    //     const handleClick = () => setLoading(true);
      
    //     return (
    //       <Button
    //         variant="primary"
    //         disabled={isLoading}
    //         onClick={!isLoading ? handleClick : null}
    //       >
    //         {isLoading ? 'Loading…' : 'Click to load'}
    //       </Button>
    //     );
    //   }
      
    //   render(<LoadingButton />);

    // --------- RADIO BUTTON -----//
   


    return (
        <div fluid={true} className="main-container" >
    

            {/* ----- ONLINE USER COLUMN ----- */}
             <div className="left-container" >
             <Row xs={3} md={3} className="g-1" size="3-g">
  {Array.from({ length: 6 }).map((_, idx) => (
    <Col >
      <Card >
        <Card.Img  src={monkey} width="150" height="100" alt="Logo"  />
      </Card>
      <h3 >User</h3> 
    </Col>

  ))}
  <h3 font-color="white">Currently Online</h3> 
</Row>

   </div>
   
 
            <div className='right-container'>
            
                
                {/* ----- SELECT CATEGORY ----- */}
                <div className="category-row row"> 
                <Row xs={3} md={1} className="g-1" size="5-g">
                <h3 font-color="black" >Top Students</h3>  
  {Array.from({ length: 3}).map((_, idx) => (
    <Col >
      <Card >
        <Card.Header> Hi </Card.Header>
      </Card>
      <h3 >User</h3> 
    </Col>
  ))}
</Row>
  
{/*                 
<Card style={{ maxWidth: '540px' }}>
      <Row className='g-0'>
        <Col md='4'>
          <Card.Img src='https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp' alt='...' fluid />
        </Col>
        <Col md='8'>
          <CardBody>
            <Card.Header>Card title</Card.Header>
            <CardText>
              This is a wider card with supporting text below as a natural lead-in to additional content. This
              content is a little bit longer.
            </CardText>
            <CardText>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </CardText>
          </CardBody>
        </Col>
      </Row>
    </Card>       */}


 
{/* 

         <div className="left-container" >
             <Row className="g-0" >
             <Col md='4' >  
             <Card.Img  src={monkey} width="150" height="100" alt="Logo"  />
             </Col>
             <Col md='8'>
          <Card.Body>
            <Card.Header>Card title</Card.Header>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to additional content. This
              content is a little bit longer.
            </Card.Text>
          </Card.Body>
        </Col>
      </Row> 
      
 
  </div>  */}


                <div className="start-row row">
                        <Button className='start-button' size="lg"> START THE CHALLENGE</Button>
                  
                        </div>       
                </div>
            
            </div>
                
        </div>
    )


}




export default MyStatsPage;