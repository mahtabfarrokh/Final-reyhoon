import React from 'react'
import './MyHeader.css';

import {
    Container, Col, Row
  } from 'reactstrap'

class MyHeader extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (               
                <Container className="header">
                    <Row className="header-row">
                        <Col sm="1" lg="1">   
                            <input class="header-logo" type="submit" value="" />
                        </Col>
                        <Col xs="1" sm="5" md="7" lg="9" className="navigation">   
                            <ul>
                                    <li><a href="file:///home/mahtab/workspace/web/reyhoon-html/src/login.html">ورود</a></li>
                                    <li><a href="file:///home/mahtab/workspace/web/reyhoon-html/src/register.html">عضویت</a></li>
                            </ul>
                            <ul >
                                    <li><a href="#">راهنما</a></li>
                            </ul>
                        </Col>
                       
                    </Row>
                    <Row className="liny">
                       <pre> </pre>
                    </Row>
                </Container> 
                        
        )
    }

}

export default MyHeader;