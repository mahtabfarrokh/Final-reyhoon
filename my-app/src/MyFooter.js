import React, {Component} from 'react'
import './MyFooter.css';


import {
    Container, Col, Form, Row,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap'

class MyFooter extends React.Component {
    // constructor(props) {
    //     super(props);        
    // }
    render() {
        return (
            <Container className="footer">
                <Row className="footer1">          
                    <Col  xs={{ size: 12, order: 5}} sm={{ size: 12, order: 5}} md={{ size: 2, order: 1}} lg={{ size: 2, order: 1}} className="footer-column">
                        <div class="footer-line4">
                            <pre>          </pre>
                        </div>
                        <div class="footer-column-header">
                                <a href="#">اپلیکیشن‌های موبایل</a> 
                        </div>
                        <div>
                                        <input class="footer-myButton1" type="submit" value="" />
                        </div>
                        <div>
                                        <input class="footer-myButton2" type="submit" value="" />
                        </div>
                        <div>
                                        <input class="footer-myButton3" type="submit" value="" />
                        </div>
                    </Col>
                    <Col xs= {{ size: 12, order: 4}} sm={{ size: 12, order: 4}} md={{ size: 2, order: 2}} lg={{ size: 2, order: 2}} className="footer-column">
                        <div class="footer-line3">
                            <pre>          </pre>
                        </div>
                        <div class="footer-column-header">
                                <a href="#">پشتیبانی ریحون</a>
                        </div>
                        
                        <a href="#">سوالات متداول</a>
                        <br />
                        <a href="#">تماس با پشتیبانی</a>
                        <br />
                        <a href="#">قوانین و مقررات</a>
                    </Col>

                    <Col xs= {{ size: 12, order: 3}} sm={{ size: 12, order: 3}} md={{ size: 2, order: 3}} lg={{ size: 2, order: 3}} className="footer-column">
                        <div class="footer-line2">
                            <pre>          </pre>
                        </div>
                        <div class="footer-column-header">
                                <a href="#">رستوران‌ها</a>
                        </div>
                        
                        <a href="#">ثبت رستوران</a>
                    </Col>
                    <Col xs= {{ size: 12, order: 2}} sm={{ size: 12, order: 2}} md={{ size: 2, order: 4}} lg={{ size: 2, order: 4}} className="footer-column">
                        <div class="footer-line1">
                            <pre>          </pre>
                        </div>
                        <div class="footer-column-header">
                            <a href="#">تماس با ریحون</a>
                        </div>
                        <a href="#">درباره ریحون</a>
                        <br />
                        <a href="#">تماس با ما</a>
                        <br />
                        <a href="#">وبلاگ ریحون</a>
                    </Col >
                    <Col xs= {{ size: 12, order: 1}} sm={{ size: 12, order: 1}} md={{ size: 2, order: 5}} lg={{ size: 2, order: 5}} className="footer-column1">
                        <p>مراقبت و محافظت از حساب کاربری و رمزعبور هر کاربر بر عهده کاربر است. ریحون سریعترین راه سفارش آنلاین غذا است. منوی عکس‌دار رستوران‌های اطرافتان را بر اساس مکان خود به راحتی مشاهده کنید و سفارش دهید.</p>
                        <a href="#">لیست رستوران‌ها</a>
                    </Col>
                </Row>
                <Row  className="footer2">
                    <input class="footer-logo1" type="submit" value="" />
                    <input class="footer-logo2" type="submit" value="" />
                </Row>
                <Row className="footer3">
                    <pre dir="ltr">© 2017, Reyhoon, All Rights Reserved.</pre>
                    <span class="my-icon">
                            <i class="fab fa-telegram-plane fa-2x micon"></i>
                            <i class="fab fa-facebook-f fa-2x micon"></i>
                            <i class="fab fa-twitter fa-2x micon"></i>
                            <i class="fab fa-instagram fa-2x micon"></i>
                            <i class="fab fa-google-plus-g fa-2x micon"></i>      
                    </span>
                </Row>
            </Container>
        )
    }

}

export default MyFooter;