import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, DropdownButton, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import './style.css';


function ChallengePage() {
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
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
  
    const radios = [
      { name: 'EASY', value: '1', className:"easy-button"},
      { name: 'MEDIUM', value: '2', className:"medium-button"},
      { name: 'HARD', value: '3', className:"hard-button" },
    ];



    return (
        <Container fluid={true} className="container">
            <Row>

    
                {/* ----- ONLINE USER COLUMN ----- */}
                <Col lg={6}>
                    <Container className='left-column'>

                    <h1>Currently Online</h1>
                    </Container>
                </Col>

                {/* ----- SELECT CATEGORY & LEVEL ----- */}
                <Col lg={6}>
                    <div className='right-column'>
                        <div className="row">
                            
                                <DropdownButton id="category-button" title="CATEGORY">

                                
                                    <Dropdown.Item as="button">Science: Computer</Dropdown.Item>
                                    <Dropdown.Item as="button">Science: Mathematics</Dropdown.Item>
                                    <Dropdown.Item as="button">Science & Nature</Dropdown.Item>
                                    <Dropdown.Item as="button">History</Dropdown.Item>
                                    <Dropdown.Item as="button">Geography</Dropdown.Item>
                                
                                </DropdownButton>
                        
                        </div>
                
                        <div className="row">
                        
                                <ToggleButtonGroup name="toggle">
                                    {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        className={radio.className}
                                        type="radio"
                                        name="radio"
                                        value={radio.value}
                                        checked={radioValue === radio.value}
                                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                    ))}
            

                                </ToggleButtonGroup>
                            
                        </div>

                        <div className="row">
                            
                                <div className='d-grid gap-2'>
                                    <Button className='start-button' size="lg"> START THE CHALLENGE</Button>
                                </div>
                            
                        </div>
                        

                    </div>
                </Col>
            </Row>





        </Container>
    )


}




export default ChallengePage;