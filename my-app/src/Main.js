import React from 'react'
import './Main.css';
import './star.css';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import StarRatingComponent from 'react-star-rating-component';
import AsyncSelect from 'react-select/async';
import {
    Container, Col, Row
  } from 'reactstrap'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class Main extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        selectedOption: null,
      };
    handleChange = async (selectedOption) => {
        // let req = "http://localhost:3001/api/restaurnats?area=" 
        // console.log(req)
        // var result = await fetch(req, {
        //     method: 'GET',
        //     // mode:'no-cors',
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
        // if (!result.ok) {
        //     throw Error(result.statusText);
        // }
        // let jsonRes = await result.text();
        // let newRes = JSON.parse(jsonRes);
        // console.log(newRes, jsonRes);

        // this.setState({ selectedOption });
        // console.log(`Option selected:`, selectedOption);
    };
    getStorageOptions(searchTerm) {

        console.log(searchTerm)
        return options
      }

    onSelectChange = async (selected) => {
        console.log("heeereeee")
        console.log(selected.label)
    }
    render() {
        const { selectedOption } = this.state;
        return (    
            <Container className="main">
                
                <MyHeader />
                
                <Container className="search search-pic2">
                    <Row className="search-center row-shift">
                            <Col xs="2" sm="2" md="2" lg="3">
                            <input className="search-pic1" />
                            </Col>
                    </Row>
                    <Row className="search-center">
                            <Col xs="5" sm="5" md="5" lg="6" className="search-h" >
                            <h3 >سفارش آنلاین غذا از بهترین رستوران‌ها و فست‌فود‌ها</h3>
                            </Col>
                    </Row>
                    <Row className="search-center">
                            <Col xs="5" sm="5" md="5" lg="6"  className="search-h"> 
                            <h6>.برای دیدن لیست رستوران‌ها و فست‌فود‌هایی که به شما سرویس می‌دهند، منطقه خود را وارد کنید</h6>
                            </Col>
                    </Row>
                    <Row >            
                            <Col xs="5" sm="5" md="4" lg="4" className="hard-grid" >
                                <Row>
                                <input className="search-icon"/>
                                <AsyncSelect
                                    value={selectedOption}
                                    className="myinput"
                                    placeholder="مثلا نیاوران"
                                    // onChange={this.onSelectChange}
                                    onInputChange={this.handleChange}
                                    loadOptions={this.getStorageOptions.bind(this)}
                                />
                                  <select className="myselect" name="selColor">
                                <option value="r">تهران</option>
                                <option value="g">اصفهان</option>
                                <option value="b">کرج</option>
                                <option value="b">شیراز</option>
                                </select>
                           
                                </Row>
                               
                            </Col>
                    </Row>
                 

                </Container>  
                
                <Container className="grid-container">
                    <Row className="help">
                        <Col xs={{ size: 8, order: 3}} sm={{ size: 8, order: 3}} md={{ size: 8, order: 3}} lg={{ size: 4, order: 1}} >
                            <h6>غذایتان را نوش‌جان کنید</h6>
                            <Container className="help-box">
                                <Row>
                                        <Col xs="9" sm="9" md="9" lg="9">
                                            <p>درب منزل یا حضوری از خود رستوران سفارشتان را تحویل بگیرید.</p>
                                        </Col>
                                        <Col assetsxs="2" sm="2" md="2" lg="2">
                                            <input className="pic-help3"/>
                                        </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs= {{ size: 8, order: 2}} sm={{ size: 8, order: 2}} md={{ size: 8, order: 2}} lg={{ size: 4, order: 2}}>
                            <h6>غذای خود را انتخاب کنید</h6>
                            <Container className="help-box">
                                <Row>
                                        <Col xs="9" sm="9" md="9" lg="9">
                                            <p>غذایی که می‌خواهید را انتخاب کنید و بدون هزینه اضافی سفارش خود را ثبت کنید.</p>
                                        </Col>
                                        <Col xs="2" sm="2" md="2" lg="2">
                                            <input className="pic-help2"/>  
                                        </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs= {{ size: 8, order: 1}} sm={{ size: 8, order: 1}} md={{ size: 8, order: 1}} lg={{ size: 4, order: 3}}>
                            <h6>شهر و منطقه خود را وارد کنید</h6>
                            <Container className="help-box">
                                <Row>
                                        <Col xs="9" sm="9" md="9" lg="9">
                                            <p>منوی مورد علاقه خود را از بین بیش از 4000 رستوران خوب در تهران و شهرستان‌ها جستجو کنید.</p>
                                        </Col>
                                        <Col xs="2" sm="2" md="2" lg="2">
                                            <input className="pic-help1"/>
                                        </Col>
                                </Row>
                            </Container>
                        </Col>
                        
                    </Row>
                </Container>
                <Container> 
                    <Row className="row-center">
                        <Col xs="7" sm="7" md="7" lg="7" >
                            <h4>رستوران‌‌ها و فست فود‌های برتر ماه بر اساس امتیاز‌دهی کاربران</h4>
                        </Col>
                    </Row>
                    <Row className="row-space-around">
                        <Col className="restaurant" xs={{ size: 8, order: 3}} sm={{ size: 8, order: 3}} md={{ size: 6, order: 3}} lg={{ size: 3, order: 1}} >
                            <Container >  
                                <Row>
                                    <Col >
                                        <input id="restaurant-image-2" className="pic-rest"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <h4 id="restaurant-name-0">(باگت (اندرزگو</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="star-rate">
                                        <Container>
                                            <Row className="someone">
                                                <Col xs="3" sm="3" md="3" lg="3" >
                                                    <pre className="ls" >                            </pre>
                                                    <pre className="gss" id="restaurant-numOfRates-1">(54)</pre>
                                                </Col>
                                                <Col xs="6" sm="6" md="6" lg="6" className="star-rate">
                                                    <StarRatingComponent 
                                                        name="rate2" 
                                                        editing={false}
                                                        renderStarIcon={() => <span>★</span>}
                                                        starCount={5}
                                                        value={5}
                                                    />
                                                </Col>
                                                <Col xs="3" sm="3" md="3" lg="3" >
                                                    <pre className="gs" id="restaurant-rate-1">4.8</pre>
                                                    
                                                    <pre className="ls">                            </pre>
                                                </Col>

                                            </Row>

                                        </Container>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                    <h6 className="info" id="restaurant-foods-0" > فست فود . پیتزا . برگر . ساندویچ</h6>
                                    <h6 className="info2" id="restaurant-address-0" >بلوار اندرزگو، بین کاوه و قیطریه، نبش مهرمحمدی</h6>
                                    <a href="#" className="myButton">شروع سفارش</a>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col className="restaurant" xs= {{ size: 8, order: 2}} sm={{ size: 8, order: 2}} md={{ size: 6, order: 2}} lg={{ size: 3, order: 2}} >
                            <Container >  
                                <Row>
                                    <Col >
                                        <input id="restaurant-image-1" className="pic-rest"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <h4 id="restaurant-name-1">(شیلا (مطهری</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="star-rate">
                                        <Container>
                                            <Row className="someone">
                                                <Col xs="3" sm="3" md="3" lg="3" >
                                                    <pre className="ls" >                            </pre>
                                                    <pre className="gss" id="restaurant-numOfRates-1">(54)</pre>
                                                </Col>
                                                <Col xs="6" sm="6" md="6" lg="6" className="star-rate">
                                                    <StarRatingComponent 
                                                        name="rate2" 
                                                        editing={false}
                                                        renderStarIcon={() => <span>★</span>}
                                                        starCount={5}
                                                        value={4}
                                                    />
                                                </Col>
                                                <Col xs="3" sm="3" md="3" lg="3" >
                                                    <pre className="gs" id="restaurant-rate-1">3.8</pre>
                                                    
                                                    <pre className="ls">                            </pre>
                                                </Col>

                                            </Row>

                                        </Container>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                    <h6 className="info" id="restaurant-foods-1" >فست فود . هات داگ . پیتزا . برگر</h6>
                                    <h6 className="info2" id="restaurant-address-1" >ولیعصر، مطهری،فتحی شقاقی، زیر برج بلورین</h6>
                                    <a href="#" className="myButton">شروع سفارش</a>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col className="restaurant" xs= {{ size: 8, order: 1}} sm={{ size: 8, order: 1}} md={{ size: 6, order: 1}} lg={{ size: 3, order: 3}}>
                            <Container >  
                                <Row>
                                    <Col >
                                        <input id="restaurant-image-0" className="pic-rest"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <h4 id="restaurant-name-0">فست‌فود پیتزا هات</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="star-rate">
                                        <Container>
                                            <Row className="someone">
                                                <Col xs="3" sm="3" md="3" lg="3" >
                                                    <pre className="ls" >                            </pre>
                                                    <pre className="gss" id="restaurant-numOfRates-1">(54)</pre>
                                                </Col>
                                                <Col xs="6" sm="6" md="6" lg="6" className="star-rate">
                                                    <StarRatingComponent 
                                                        name="rate2" 
                                                        editing={false}
                                                        renderStarIcon={() => <span>★</span>}
                                                        starCount={5}
                                                        value={4}
                                                    />
                                                </Col>
                                                <Col xs="3" sm="3" md="3" lg="3" >
                                                    <pre className="gs" id="restaurant-rate-1">3.8</pre>
                                                    
                                                    <pre className="ls">                            </pre>
                                                </Col>

                                            </Row>

                                        </Container>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                    <h6 className="info" id="restaurant-foods-0" >پیتزا . فست فود . ساندویچ . برگر</h6>
                                    <h6 className="info2" id="restaurant-address-0" >سعادت آباد، پاساژ میلاد نور، طبقه همکف</h6>
                                    <a href="#" className="myButton">شروع سفارش</a>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container >

                <Container className="best-tehran-rest">
                    <h5> رستوران‌های خوب تهران در ریحون</h5>
                    <Row className="tehran-rest-row">
                        <Col  xs="5" sm="3" md="2" lg="1">
                        <input id="restaurant-image-6" className="pic-teh-rest" />
                        <h6 id="restaurant-name-6">آمولای</h6>  
                        </Col>
                        <Col  xs="5" sm="3" md="2" lg="1">
                           
                            <input id="restaurant-image-5" className="pic-teh-rest" />
                        <h6 id="restaurant-name-5">تهیه غذای راد</h6>         
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="1">
                        <input id="restaurant-image-4" className="pic-teh-rest" />
                            <h6 id="restaurant-name-4">شاندیز جردن</h6>  
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="1"> 
                        <input id="restaurant-image-3" className="pic-teh-rest" />
                            <h6 id="restaurant-name-3">ویترین</h6>         
                        </Col>
                    </Row>
                    <Row className="tehran-rest-row">
                        <Col xs="5" sm="3" md="2" lg="1">
                        <input id="restaurant-image-10" className="pic-teh-rest" />
                        <h6 id="restaurant-name-10">رستوران کوبابا</h6> 
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="1">
                        <input id="restaurant-image-9" className="pic-teh-rest" />
                        <h6 id="restaurant-name-9">جو گریل فود</h6>  
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="1">
                       
                        <input id="restaurant-image-8" className="pic-teh-rest" />
                        <h6 id="restaurant-name-8">لانجین</h6>          
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="1">
                        <input id="restaurant-image-7" className="pic-teh-rest" />
                        <h6 id="restaurant-name-7">جنارو</h6>        
                               
                        </Col>
                    </Row>
                    <Row className="tehran-rest-row"> 
                        <Col xs="5" sm="3" md="2" lg="1">
                        <input id="restaurant-image-14" className="pic-teh-rest" />
                        <h6 id="restaurant-name-14">شیرین پلو</h6>         
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="1">
                        <input id="restaurant-image-13" className="pic-teh-rest" />
                        <h6 id="restaurant-name-13">امیر شکلات</h6>  
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="1">
                        <input id="restaurant-image-12" className="pic-teh-rest" />
                        <h6 id="restaurant-name-12" class="oooh">ناریجه</h6>  
                                 
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="1">
                        <input id="restaurant-image-11" className="pic-teh-rest" />
                        <h6 id="restaurant-name-11"> تومو</h6>    
                        
                        </Col>
                    </Row>
                </Container>
                
                <Container className="food">
                    <h2>غذا چی میل دارید؟</h2>
                    <h4>صبحانه، ناهار، شام یا هر چیزی که میل دارید را انتخاب کنید</h4>
                    <Row className="food-row">
                        <Col xs="5" sm="3" md="2" lg="2" className="f4" id="food-image-3">
                            <Container className="ffff">
                            <h2 id="food-header-0" >کباب</h2>
                            <h5 id="food-text-0" >1836 رستوران فعال</h5> 
                            </Container> 
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="2" className="f3" id="food-image-2">
                        <Container className="ffff">
                            <h2 id="food-header-1" >پیتزا</h2>
                            <h5 id="food-text-1" >2408 رستوران فعال</h5>  
                            </Container>
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="2" className="f2" id="food-image-1">
                            <Container className="ffff">
                            <h2 id="food-header-2" >برگر</h2>
                            <h5 id="food-text-2" >2408 رستوران فعال</h5>  
                            </Container>       
                        </Col>
                        <Col xs="5" sm="3" md="2" lg="2" className="f1" id="food-image-0">
                            <Container className="ffff">
                            <h2 id="food-header-3">ساندویچ</h2>
                            <h5 id="food-text-3" >2746 رستوران فعال</h5> 
                            </Container>
                 
                        </Col>
                    </Row>
                    <h4 className="more" id="foood" >انتخاب غذا‌های بیشتر</h4>
                    <Row>
                        {/* <a href="#" class="myButton2">غذای پلویی</a> */}
                    </Row>
                    <Row className="emtiyazi"> 
                            <input alt="reyhoon" className="big-mobile-pic"/>    
                            <Col className="box-mobile" xs="5" sm="5" md="5" lg="4">
                                    <h2>ریحون روی موبایل</h2>
                                    <h5>.برای دریافت لینک دانلود اپلیکیشن ریحون، شماره موبایل خود را وارد کنید</h5>
                                    <Container className="form-grid">
                                        <Row className="mobile-row">
                                            <Col className="mobile-col1" xs="5" sm="5" md="5" lg="4">
                                            <button type="submit" className="SMS"> دریافت لینک از طریق SMS</button>
                                            </Col>
                                            <Col className="mobile-col2" xs="5" sm="5" md="5" lg="4">
                                            <input className="input-mobile" type="text" placeholder="مثلا **91220530"></input>
                                            </Col>
                                            
                                        </Row>
                                    </Container>
                                    <p>.در دسترس است Android و iOS اپلیکیشن ریحون برای</p>
                                    <Container className="app-grid">
                                            <Row>
                                                <Col>
                                                <input className="app-myButton1 app-hov" type="submit" value="" />
                                                </Col>
                                                <Col>
                                                <input className="app-myButton2 app-hov" type="submit" value="" />
                                                </Col>
                                                <Col>
                                                <input className="app-myButton3 app-hov" type="submit" value="" />                                                </Col>
                                                <Col>
                                                <input className="app-myButton4 app-hov" type="submit" value="" />
                                                </Col>
                                                <Col>
                                                <input className="app-myButton5 app-hov" type="submit" value="" />
                                                </Col>
                                            </Row>
                                    </Container>
                                    
                            </Col>
                    </Row>

                </Container>
                <MyFooter />

            </Container>                        
        )
    }

}

export default Main;