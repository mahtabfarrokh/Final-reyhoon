import React from 'react'
import './Search.css';
import './star.css';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import StarRatingComponent from 'react-star-rating-component';
import img2 from './img/search.jpg'

import {
    Container, Col, Row, Input, Label, Button
  } from 'reactstrap';

const filter = [
    'ساندویچ', 'پیتزا', 'برگر', 'غذای ایرانی'
]
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.areaName = localStorage.getItem("area_name");
        // this.areaName = "keshavarz"
        this.search = ""
        this.state = {
            selectedOption: null,
            showLine: false,
            filterName1: [],
            filterName2: filter, 
            restaurants: [],
            restaurantsClosed: [],
            restaurants1: [],
            restaurants2: [],
            closed: true,
            numRestaurant: 0
          };
          this.handleInputChange1 = this.handleInputChange1.bind(this);
          this.handleInputChange2 = this.handleInputChange2.bind(this);
          this.saveInfo = this.saveInfo.bind(this)
    }
    async componentDidMount(){
        await this.getRealName()
        await this.getRestaurants()
    }
    async getRealName(){
        this.c= localStorage.getItem("area_name");
        var result = await fetch("http://localhost:3001/api/restaurants/en/"+this.c, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!result.ok) {
            throw Error(result.statusText);
        }
        let jsonRes = await result.text();
        this.areaName = jsonRes

    }
    async getRestaurants(){
        var hours = new Date().getHours();
        var result = await fetch("http://localhost:3001/api/restaurants?area="+this.areaName, {
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
        let res = [];
        let res2 = [];
        
        for(let i in newRes){
            let dic = []
            dic.push(newRes[i].name)
            dic.push(newRes[i].logo)
            dic.push(newRes[i].address.addressLine)
            let cat = " "

            for(let j in newRes[i].categories){
                if(j!=0){
                    cat += " . "
                }
                cat += newRes[i].categories[j].name
            }
            dic.push(cat)
            dic.push(newRes[i].averageRate)
            if (newRes[i].openingTime <= 10 && newRes[i].closingTime >= hours){
                res.push(dic)
            }
            else{
                close = true
                res2.push(dic)
            }
            
        } 
        this.setState({
            restaurants: res,
            restaurants1: res,
            restaurants2: res,
            restaurantsClosed: res2,
            closed: close,
            numRestaurant:newRes.length - res2.length
        })
    }
    handleInputChange1(event) { 
        let target = event.target;
        let value = target.value;
        let i = parseInt(value, 10) ;
        let name = this.state.filterName2[i]
        let r = true;
        let temp1 = this.state.filterName1;
        let temp2 = this.state.filterName2;
        let temp3 = [];
        let temp4 = [];
        temp2.splice(i, 1);
        temp1.push(name)
        if(temp2.length==0){
            r= false;
        }
        for(let i in this.state.restaurants2){
            let flag = true; 
            for(let k in temp1){
                if(this.state.restaurants2[i][3].includes(temp1[k])){
                    flag = false
                }
            }
            if(flag && temp1.length!=0){
                console.log("hehe")
            }else{
                temp3.push(this.state.restaurants2[i])
                if(this.state.restaurants2[i][0].includes(this.search)){
                    temp4.push(this.state.restaurants2[i])
                }
            }
        }
        this.setState({
            showLine: r,
            filterName1: temp1,
            filterName2:temp2,
            restaurants1: temp3,
            restaurants: temp4

        });
      }
    handleInputChange2(event) { 
        let target = event.target;
        let value = target.value;
        let i = parseInt(value, 10);
        let name = this.state.filterName1[i];
        let r = true;
        let temp1 = this.state.filterName1;
        let temp2 = this.state.filterName2;
        let temp3 = [];
        let temp4 = [];
        temp1.splice(i, 1);
        temp2.push(name)
        if(temp1.length==0){
            r= false;
        }
        for(let i in this.state.restaurants2){
            let flag = true; 
            for(let k in temp1){
                if(this.state.restaurants2[i][3].includes(temp1[k])){
                    flag = false
                }
            }
            if(flag && temp1.length!=0){
                console.log("hehe")
            }else{
                temp3.push(this.state.restaurants2[i])
                if(this.state.restaurants2[i][0].includes(this.search)){
                    temp4.push(this.state.restaurants2[i])
                }
            }
        }
        this.setState({
            showLine: r,
            filterName1: temp1,
            filterName2:temp2,
            restaurants1: temp3,
            restaurants: temp4
        });
    }
    handleChange(input_filter){
        let f = input_filter.target.value;
        let res = [];
        for (let i=0; i<filter.length; i++){
            if(filter[i].includes(f)){
                res.push(filter[i])
            }
        }
        this.setState({
            filterName2:res
        });

    }
    handleSearch(input_search){
        let f = input_search.target.value;
        this.search = f
        let temp3 = [];
        for(let i in this.state.restaurants1){
            if(this.state.restaurants1[i][0].includes(f)){
                temp3.push(this.state.restaurants1[i])
                
            }
        }
        this.setState({
            restaurants: temp3
        });

    }
    async saveInfo(event){
        console.log("Done :D")
        for(let i in event.target){
            try{
                if(event.target[i].value != undefined){
                    let fa_name = event.target[i].value
                    var result = await fetch("http://localhost:3001/api/restaurants/en/"+fa_name, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!result.ok) {
                        throw Error(result.statusText);
                    }
                    let jsonRes = await result.text();
                    let en_rest = jsonRes
                    this.restName = localStorage.setItem("rest_name", en_rest);
                    break
                }
            }catch{
                continue
            }
            
        }
        // this.restName = localStorage.setItem("rest_name", this.state.);
    }
    render() {
        var koko = ""
        return (    
            <Container className="search">
                <MyHeader />
                <Container className="banner-search">
                </Container>
                <Container className="search-info">
                    <Row className="infoo">
                        <h5><b>{this.state.numRestaurant.toString()}</b> رستوران امکان سرویس دهی به <b>{localStorage.getItem("area_name")}</b> را دارند</h5>
                    </Row>
                    <Row className="line">
                        <pre> </pre>
                    </Row>
                    <Row className="select-search">
                        <Col xs="10" sm="10" md="10" lg="10" >
                        <Input
                            className="myinput"
                            placeholder="جست و جوی رستوران در این محدوده"
                            onChange={this.handleSearch.bind(this)}
                        />
                        </Col>
                        <Col xs="2" sm="2" md="2" lg="2">
                        <i class="fas fa-search icon-search-search"></i>
                        </Col>
                        
                       
                    </Row>
                    <Row className="search-result"> 
                        <Col xs="8" sm="8" md="8" lg="9" >
                            <Container >
                                <Row className="row-space-aroundd">
                                
                                        {     
                                            this.state.restaurants.map(function(item, i){
                                                return <Col className="restaurantt" xs="3" sm="3" md="3" lg="3" >
                                                <Container >  
                                                    <Row>
                                                        <Col xs="8" sm="8" md="8" lg="8" >
                                                            <Row className="rightside">
                                                                <h4 className="boldit">{item[0]}</h4>
                                                            </Row>
                                                            <Row className="rightside">
                                                                <Col className="star-rate">
                                                                <Container>
                                                                    <Row className="someone">
                                                                        <Col xs="2" sm="2" md="2" lg="2" >
                                                                            <pre className="gs2">{item[4]}</pre>
                                                                        </Col>
                                                                        <Col xs="9" sm="9" md="9" lg="9" className="star-rate2">
                                                                            <StarRatingComponent 
                                                                                name="rate2" 
                                                                                editing={false}
                                                                                renderStarIcon={() => <span>★</span>}
                                                                                starCount={5}
                                                                                value={item[4]}
                                                                            />
                                                                        </Col>             
                                                                    </Row>
                                                                </Container>
                                                            </Col>
                                                            </Row>
                                                            <Row className="rightside">
                                                                <Col xs="12" sm="12" md="12" lg="12" >
                                                                <h6 className="info3" >{item[3]}</h6>
                                                                <h6 className="info4">{item[2]}</h6>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs="3" sm="3" md="3" lg="3">
                                                            <img alt="logo" src={process.env.PUBLIC_URL + item[1]} className="pic-rest2 rest-image" />
                                                        </Col>
                                                    </Row>
                                                    <Row className="start-request"> 
                                                        <Col xs="10" sm="10" md="10" lg="10" >
                                                        <a  href={"restaurant/"+item[0]} onClick={this.saveInfo} value={item[0]} className="myButtonn">شروع سفارش</a>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Col>
                                            }, this )
                                        }

                                </Row>
                                <Row className="row-space-aroundd-title" >
                                    {
                                        this.state.closed ? <h4 className="boldittt" >رستوران های بسته </h4> : null
                                    }
                                </Row>
                                <Row className="row-space-aroundd-title" >
                                    {        
                                        this.state.restaurantsClosed.map(function(item, i){
                                            return <Col className="restaurantt closed" xs="3" sm="3" md="3" lg="3" >
                                            <Container >  
                                                <Row>
                                                    <Col xs="8" sm="8" md="8" lg="8" >
                                                        <Row className="rightside">
                                                            <h4 className="boldit">{item[0]}</h4>
                                                        </Row>
                                                        <Row className="rightside">
                                                            <Col className="star-rate">
                                                            <Container>
                                                                <Row className="someone">
                                                                    <Col xs="2" sm="2" md="2" lg="2" >
                                                                        <pre className="gs2">{item[4]}</pre>
                                                                    </Col>
                                                                    <Col xs="9" sm="9" md="9" lg="9" className="star-rate2">
                                                                        <StarRatingComponent 
                                                                            name="rate2" 
                                                                            editing={false}
                                                                            renderStarIcon={() => <span>★</span>}
                                                                            starCount={5}
                                                                            value={item[4]}
                                                                        />
                                                                    </Col>             
                                                                </Row>
                                                            </Container>
                                                        </Col>
                                                        </Row>
                                                        <Row className="rightside">
                                                            <Col xs="12" sm="12" md="12" lg="12" >
                                                            <h6 className="info3" >{item[3]}</h6>
                                                            <h6 className="info4">{item[2]}</h6>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs="3" sm="3" md="3" lg="3">
                                                        <img src={item[1]} className="pic-rest2 rest-image" />
                                                        {/* <input style={styles} className="pic-rest2 rest-image"/> */}
                                                    </Col>
                                                </Row>
                                            
                                            </Container>
                                        </Col>
                                        }, this )
                                    }

                                </Row>
                            </Container>
                        </Col>
                        <Col xs="4" sm="4" md="4" lg="3" className="filter">

                            <Container className="fix-filter" >
                                <Row className="position">
                                    <p className="sizep">فیلتر بر اساس انواع غذا</p>
                                </Row>
                                <Row className="line">
                                    <pre> </pre>
                                </Row>
                                <Row className="position">
                                    <Input
                                        // value={selectedOption}
                                        className="myinput2"
                                        placeholder="جست و جوی دسته بندی غذاها"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </Row> 
                                
                                {     
                                    this.state.filterName1.map(function(item, i){
                                        let c = i.toString()
                                        if (i!=0){
                                            return [<Row className="line">
                                                        <pre> </pre>
                                                    </Row>,
                                                    <Row className="position">
                                                        <Col xs="6" sm="6" md="7" lg="10">
                                                            <p className="filter-name">{item}</p>
                                                        </Col>
                                                        <Col xs="1" sm="1" md="1" lg="1">
                                                            {/* <Input type="checkbox" id="checkbox1" className="filter-checkbox" 
                                                            onChange={this.handleInputChange2} checked="checked" value={c} /> */}
                                                            <Button onClick={this.handleInputChange2} value={c} className="filter-label2"></Button>
                                                        </Col>    
                                                    </Row>]
                                        }
                                        else{
                                            return <Row className="position">
                                                        <Col xs="6" sm="6" md="7" lg="10">
                                                            <p className="filter-name">{item}</p>
                                                        </Col>
                                                        <Col xs="1" sm="1" md="1" lg="1">
                                                            {/* <Input type="checkbox" id="checkbox1" className="filter-checkbox" 
                                                            onChange={this.handleInputChange2} checked="checked" value={c} /> */}
                                                            <Button onClick={this.handleInputChange2} value={c} className="filter-label2"></Button>
                                                        </Col>    
                                                    </Row>
                                        }
                                      }, this )
                                }

                                { this.state.showLine ? <Row className="line2" ref={this.line} >
                                    <pre> </pre>
                                </Row> : null }

                                {     
                                    this.state.filterName2.map(function(item, i){
                                        let c = (i ).toString()
                                        if (i!=0){
                                            return [<Row className="line">
                                                        <pre> </pre>
                                                    </Row>,
                                                    <Row className="position">
                                                        <Col xs="6" sm="6" md="7" lg="10">
                                                            <p className="filter-name">{item}</p>
                                                        </Col>
                                                        <Col xs="1" sm="1" md="1" lg="1">
                                                            {/* <Input type="checkbox" className="filter-checkbox" 
                                                            onChange={this.handleInputChange1}  checked="" value={c} /> */}
                                                            <Button onClick={this.handleInputChange1} value={c} className="filter-label"></Button>
                                                        </Col>    
                                                    </Row>]
                                        }
                                        else{
                                            return <Row className="position">
                                                        <Col xs="6" sm="6" md="7" lg="10">
                                                            <p className="filter-name">{item}</p>
                                                        </Col>
                                                        <Col xs="1" sm="1" md="1" lg="1">
                                                            {/* <Input type="checkbox" id="checkbox1" className="filter-checkbox" 
                                                            onChange={this.handleInputChange1}  checked="" value={c} /> */}
                                                            <Button onClick={this.handleInputChange1} value={c} className="filter-label"></Button>
                                                        </Col>    
                                                    </Row>
                                        }
                                      }, this )
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

export default Search;


