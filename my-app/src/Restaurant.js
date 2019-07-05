import React from 'react'
import './Restaurant.css';
import './star.css';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import StarRatingComponent from 'react-star-rating-component';
import myimg from './img/banner-restaurant.jpeg'
import { ScrollIntoView } from 'rrc'

import {
    Container, Col, Row, Input, Label, Button
  } from 'reactstrap';

const list_menu = ['صبحانه',
                    'پیتزا',
                    'برگر',
                    'استیک'
                ]
const food = [{
                'header': 'صبحانه', 
              'items': ['پن کیک', 'املت']
            }]
class Restaurant extends React.Component {
    constructor(props) {
        super(props);

        // this.restName = localStorage.getItem("rest_name");
        this.areaName = "keshavarz"
        this.lt = "<"
        this.restName= "shandiz-jordan"
        this.state = {
            restaurant: {},
            tab1: false,
            tab2: false,
            tab3: true,
            list_menu: [],
            searchbar: false,
            menu: [],
            comments: [],
            right_menu_line: 0,
          };
        this.changetab1 = this.changetab1.bind(this);
        this.changetab2 = this.changetab2.bind(this);
        this.changetab3 = this.changetab3.bind(this);
        this.changemenufood = this.changemenufood.bind(this);
        this.handleSearchbar = this.handleSearchbar.bind(this);
    }
    async componentDidMount(){
        await this.getRestaurantInfo()
    }
    async getRestaurantInfo(){
        var hours = new Date().getHours();
        var result = await fetch("http://localhost:3001/api/restaurants/"+this.restName, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!result.ok) {
            throw Error(result.statusText);
        }
        let close = false;
        let jsonRes = await result.text();
        let newRes = JSON.parse(jsonRes);
        let dic = {}
        let list_food = []
        let menu_cat = []
        let comments = []
        for(let i in newRes){         
            dic["name"] = newRes[i].name
            dic["logo"] = newRes[i].logo
            dic["addressLine"] = newRes[i].address.addressLine
            dic["openingTime"] = newRes[i].openingTime
            dic["closingTime"] = newRes[i].closingTime
            let cat = " "
            for(let j in newRes[i].categories){
                if(j!=0){
                    cat += " . "
                }
                cat += newRes[i].categories[j].name
            }
            dic["category"] = cat
            let myavg = 0.0; 
            for(let j in newRes[i].comments){
                let item = {}
                item["author"]=newRes[i].comments[j].author
                item["quality"]=newRes[i].comments[j].quality
                myavg += item["quality"]
                item["text"]=newRes[i].comments[j].text
                item["date"]=newRes[i].comments[j].created_at 
                comments.push(item)
            }
            myavg = myavg/newRes[i].comments.length
            // dic["averageRate"] = newRes[i].averageRate
            dic["averageRate"] = myavg
            for(let j in newRes[i].foods){
                let flag = true;
                for(let k in list_food){
                    if(list_food[k]["header"]==newRes[i].foods[j].foodSet){
                        flag = false;
                        list_food[k]["items"].push([newRes[i].foods[j].name, newRes[i].foods[j].price])
                        break
                    }
                }
                if(flag){
                    let d = {};
                    d["header"] = newRes[i].foods[j].foodSet
                    d["items"] = []
                    d["items"].push([newRes[i].foods[j].name, newRes[i].foods[j].price])
                    list_food.push(d)
                    menu_cat.push(newRes[i].foods[j].foodSet)
                }
                
            }
        } 

        console.log(dic)
        this.setState({
            restaurant : dic,
            menu: list_food,
            list_menu: menu_cat,
            comments:comments
        })
    }
    changetab1(){
        this.refs.com.scrollIntoView({block: 'start', behavior: 'smooth'})
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
        })
    }
    changetab2(){
        this.refs.wtf.scrollIntoView({block: 'start', behavior: 'smooth'})
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
        })
    }
    changetab3(){
        this.refs.men.scrollIntoView({block: 'start', behavior: 'smooth'})
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
        })
    }
    handleSearchbar(){     
        this.setState({
            searchbar: true
        })
    }
    changemenufood(event){
        let target = event.target;
        let value = target.value;
        this.refs["item"+value.toString()].scrollIntoView({block: 'start', behavior: 'smooth'})
        this.setState({
            right_menu_line: value
        })
    }
    render() {
        return (    
            <Container className="search">
            
                <MyHeader />
                <Container className="restaurant-detail">
                    <Row className="row-rest-center">
                        <Col xs="2" sm="2" md="2" lg="2">
                            <Label className="gigili gi0"> {this.lt} رستوران ها</Label>
                        </Col>
                        <Col xs="4" sm="4" md="4" lg="4" >
                            <a className="gigili gi1">{this.state.restaurant["name"]}</a>
                            <a className="gigili gi2">{this.lt}</a>
                            <a className="gigili gi3" href="/search"> {this.areaName}</a>
                            <a className="gigili gi2">{this.lt}</a>
                            <a className="gigili gi4" href="/">ریحون</a>
                        </Col>   
                    </Row>
                    <Row className="row-detail-center">
                        <Col xs="10" sm="10" md="10" lg="10">
                                <Container>
                                    <Row className="row-center">
                                        <Col xs="4" sm="4" md="4" lg="4">
                                        <img src={"/"+this.state.restaurant["logo"]} className="pic-detail" />
                                        </Col>
                                    
                                    </Row>
                                    <Row className="row-center">
                                        <Col xs="4" sm="4" md="4" lg="4">
                                        <h2 className="title-detail">{this.state.restaurant.name}</h2>
                                        </Col>
                                    
                                    </Row>
                                    <Row className="staar-detail row-center ">
                                        
                                        <Col xs="5" sm="4" md="4" lg="4" className="gstar3">
                                            <pre className="gstar2">{this.state.restaurant["averageRate"]}</pre>
                                            <StarRatingComponent 
                                                name="rate3" 
                                                editing={false}
                                                renderStarIcon={() => <span> <i className="mystar fa fa-star "></i></span>}
                                                starCount={5}
                                                className="stars-detail"
                                                value={this.state.restaurant["averageRate"]}
                                            />
                                            <pre className="gstar1">({this.state.comments.length})</pre>
                                           
                                        </Col>
                                    </Row>
                                    <Row className="row-center">
                                        <Col xs="4" sm="4" md="4" lg="3">
                                            <h6 className="title-detail2" >{this.state.restaurant["category"]}</h6>
                                        </Col>
                                    </Row>
                                </Container>
                              
                        </Col>
                    </Row>
                </Container>
                <Container className="restaurant-detail2">
                    <Row className="row-detail-center2">
                        <Col  xs="10" sm="10" md="10" lg="10">
                        <Container>
                                
                                    <Row className="row-center">
                                        <Col xs="4" sm="4" md="4" lg="3">
                                            <h6 className="title-detail3" >{this.state.restaurant["addressLine"]}</h6>
                                        </Col>
                                    </Row>
                                  
                                    <Row className="line line-detail2">
                                        <pre> </pre>
                                    </Row>      
                                 
                                    <Row className="row-center">
                                        <Col xs="4" sm="4" md="4" lg="4">
                                            <Button onClick={this.changetab1} className="butt">نظرات کاربران</Button>
                                        </Col>
                                        <Col xs="4" sm="4" md="4" lg="4">
                                            <Button onClick={this.changetab2} className="butt" >اطلاعات رستوران</Button>
                                        </Col>
                                        <Col xs="4" sm="4" md="4" lg="4">
                                            <Button onClick={this.changetab3} className="butt">منوی رستوران</Button>
                                        </Col>
                                    </Row>
                                    <Row className="row-space">
                                        {
                                            this.state.tab1 ? <Col xs="1" sm="1" md="1" lg="1" className="line-detail">
                                                                    <pre> </pre>
                                                                </Col>
                                                                : <Col xs="1" sm="1" md="1" lg="1" className="line-detail0">
                                                                <pre> </pre>
                                                              </Col>
                                        }
                                        {
                                            this.state.tab2 ? <Col xs="1" sm="1" md="1" lg="1" className="line-detail">
                                                                    <pre> </pre>
                                                                </Col>
                                                                : <Col xs="1" sm="1" md="1" lg="1" className="line-detail0">
                                                                    <pre> </pre>
                                                                  </Col>
                                        }
                                        {
                                            this.state.tab3 ? <Col xs="1" sm="1" md="1" lg="1" className="line-detail">
                                                                    <pre> </pre>
                                                                </Col>
                                                                : <Col xs="1" sm="1" md="1" lg="1" className="line-detail0">
                                                                <pre> </pre>
                                                              </Col>
                                        }                                     
                                    </Row>
                                </Container>
                        </Col>
                    </Row>
                </Container>
                <Container className="restaurant-detail-part2">
                    <Row>
                        <Col xs="8" sm="8" md="8" lg="10">
                            <Container className="menu-detail" >
                                    <h1 ref="men" > </h1>
                                   <Row>
                                       {
                                           this.state.searchbar? < Input className="searchbar2" placeholder="مثلا برگر"></Input>
                                                                :<Row className="dontwannasaybadwords">
                                                                    {/* <i class="fas fa-search"></i> */}
                                                                    <Input onClick={this.handleSearchbar} className="searchbar" placeholder="جست و جو در منوی رستوران"></Input>
                                                                </Row>
                                       }
                                   </Row>
                                   {
                                       this.state.menu.map(function(item, i){
                                            var food = item['items'].map(function (element, j) {
                                                return <Col xs="8" sm="8" md="8" lg="5" className="food-item-tof">
                                                    <Container className="food-item"> 
                                                        <Row className="row-inside-food inside-koofti">
                                                            <Col xs="4" sm="4" md="4" lg="4" className="inside-koofti">
                                                                <Row className="inside-koofti">
                                                                <Col xs="1" sm="1" md="1" lg="1" >
                                                                <p className="food-inside-text2 inside-koofti"> تومان</p>
                                                                </Col>
                                                                <Col xs="2" sm="2" md="2" lg="2" >
                                                                <p className="food-inside-text inside-koofti">{element[1]}</p>
                                                                </Col>
                                                                
                                                                
                                                                </Row>
                                                            </Col>
                                                            <Col xs="4" sm="4" md="4" lg="4" className="inside-koofti">
                                                                <p className="food-inside-text inside-koofti">{element[0]}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="row-inside-food inside-koofti">
                                                            <Col xs="2" sm="2" md="2" lg="2" className="inside-koofti">
                                                            <img src='/op8.jpeg' className="pic-detail-food inside-koofti" />
                                                            </Col>
                                                            <Col xs="5" sm="5" md="5" lg="5" className="inside-koofti">
                                                            <a  className="myButtonn-food inside-koofti">افزودن به سبد خرید +</a>
                                                            </Col>
                                                        </Row>

                                                        </Container>
                                                        </Col>
                                            });
                                           return [<Row>
                                                    <Col>
                                                    <h5 ref={"item"+i.toString()} className="header-food">{item['header']}</h5>
                                                    </Col>
                                                  </Row>, 
                                                  <Row className="row-foods">
                                                    {food}
                                                  </Row>]

                                        }, this)
                                   }
                                   <Row className="rest-info-detail" >
                                                <h1 ref="wtf"> </h1>
                                                <h5 >اطلاعات رستوران</h5>
                                    </Row>
                                   <Row>
                                      <Col>
                                            <img src='/map.jpg' className="map-pic" />
                                       </Col>
                                       <Col>
                                            <Row className="inner-detail-name">
                                                <h6>{this.state.restaurant.name}</h6>
                                            </Row>
                                            <Row className="inner-detail-name">
                                            <i class="fas fa-map-marker-alt"></i>
                                                <p>{this.state.restaurant.addressLine}</p>
                                            </Row>
                                            <Row className="inner-detail-name">
                                                    <i class="fas fa-clock"></i>
                                                <p>ساعت سفارش گیری</p>
                                            </Row>
                                            <Row className="inner-detail-name">
                                                <Col xs="1" sm="1" md="1" lg="3">
                                                <p>همه روزه</p>
                                                </Col>
                                                <Col xs="4" sm="4" md="4" lg="3">
                                                <p> از {this.state.restaurant.openingTime} تا {this.state.restaurant.closingTime}</p>
                                                </Col>
                                                
                                            </Row>
                                       </Col>
                                       
                                   </Row>
                                 
                                   <Row className="rest-info-detail">
                                        <h1 ref="com"> </h1>
                                       <h5> نظرات کاربران در مورد {this.state.restaurant.name}</h5>
                                   </Row>
                                   <Row className="atFuckingMorning">
                                       <p>شما هم می‌توانید بعد از سفارش از این رستوران، نظر خود را درباره‌ی این رستوران ثبت کنید.   </p>
                                   </Row>
                                   <Row className="atFuckingMorning4">
                                       <Row className="atFuckingMorning2">
                                        <StarRatingComponent 
                                            name="rate3" 
                                            editing={false}
                                            renderStarIcon={() => <span> <i className="mystar fa fa-star "></i></span>}
                                            starCount={5}
                                            className="stars-detail"
                                            value={this.state.restaurant["averageRate"]}
                                        />
                                        <p className="gstar1-last">({this.state.comments.length})</p>
                                        </Row>
                                       
                                   </Row>
                                   <Row className="atFuckingMorning3">
                                        <p className="gstar1" >{this.state.restaurant["averageRate"]}</p>
                                    </Row>
                                  {
                                      this.state.comments.map(function(item, i){
                                          return [
                                            <Row className="author-comment">
                                            <Col xs="2" sm="2" md="2" lg="2">
                                            <h6>{item["author"]}</h6>
                                            </Col>
                                            <Col xs="4" sm="4" md="4" lg="4">
                                            <Row>
                                            <p className="gstarF">{item["quality"]}</p>
                                            <StarRatingComponent 
                                                name="rate3" 
                                                editing={false}
                                                renderStarIcon={() => <span> <i className="mystar fa fa-star "></i></span>}
                                                starCount={5}
                                                className="stars-detail"
                                                value={item["quality"]}
                                            />
                                            </Row>
                                            </Col>
                                            
                                            </Row>, 
                                            <Row className="text-comment"><p>{item["text"]}</p></Row>,
                                            <Row className="endofcomment">
                                                <Col xs="1" sm="1" md="1" lg="1">
                                                    <p  >گزارش</p>
                                                </Col>
                                                <Col xs="3" sm="3" md="3" lg="3">
                                                    <p >{item["date"]}</p>
                                                </Col>
                                            </Row>
                                        ]
                                      },this)
                                  }
                            </Container>
                        </Col>
                        <Col xs="4" sm="4" md="4" lg="2">
                            <Container className="list-menu">
                            {
                            this.state.list_menu.map(function(item, i){
                                if (this.state.right_menu_line == i){
                                    return <Row>
                                    <Col>
                                        <Button onClick={this.changemenufood} value={i} className="butt-menu butt-menu-coler1" >{item}</Button>
                                        <p className="line-menu"> </p>
                                    </Col>
                                    </Row>
                                }
                                else{
                                    return <Row>
                                        <Col>
                                            <Button onClick={this.changemenufood} value={i} className="butt-menu butt-menu-coler2" >{item}</Button>
                                            <p className="line-menu-none"> </p>
                                        </Col>
                                        </Row>
                                }
                                
                            }, this)
                            }                   
                            </Container>
                        </Col>
                    </Row>
                </Container>
             
                
                <MyFooter />
            </Container>                        
        )
    }
}
export default Restaurant;