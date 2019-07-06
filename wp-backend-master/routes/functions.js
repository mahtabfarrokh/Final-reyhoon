const restaurant = require("../models/restaurant.js");
const category = require("../models/category.js");
const food = require("../models/food.js");
const address = require("../models/address.js");
const comment = require("../models/comment.js");
const dictionary = require("../models/dictionary.js");

async function get_restaurants(area, categoryList) {
    categoryShemaList = []
    let area_fa = await dictionary.model.find({'en':area}).exec()
    area = area_fa[0]['fa']
    for(i in categoryList){
        let cat_fa = await dictionary.model.find({'en': categoryList[i]}).exec()
    }
    let result = await restaurant.model.find({'address.area':area}).exec()
    let final_result = []
    if (categoryList.length>0){
        for(i in result){
            let temp = result[i]["categories"]
            let t, cat  = []
            for(t=0; t<temp.length; t++){
                cat.push(temp[t]["name"])
            }
            let flag= 0;
            for(c in categoryList){
                let a= cat.find(async function(element) {
                    let cat_fa = await dictionary.model.find({'en': categoryList[c]}).exec() 
                    return element == cat_fa[0]['fa'];
                })
                if(!a){
                    flag = 1;
                    break
                }
            }
            if(flag == 0){
                final_result.push(result[i])
            }
        }
       return final_result
    }
    return result

    // var new_category = new category.model({id:"1", name:"غذای ایرانی"})
    // var new_category1 = new category.model({id:"2", name:"صبحانه"})
    // var new_category2 = new category.model({id:"3", name:"خوراک"})
    // var new_category3 = new category.model({id:"4", name:"پلویی"})
    // var new_category4 = new category.model({id:"5", name:"پیش غذا"})
    // var new_category5 = new category.model({id:"6", name:"نوشیدنی"})
    // var new_category6 = new category.model({id:"7", name:"غذای اصلی"})
    // var new_category7 = new category.model({id:"8", name:"سالاد"})
    // var new_category8 = new category.model({id:"9", name:"دیزی"})
    // var new_category9 = new category.model({id:"10", name:"ساندویچ"})

    // var new_food = new food.model({id:"1", name:"دیزی مخصوص", price: 500, description: "گوشت گردن گوسفندی", foodSet:"دیزی"})
    // var new_food1 = new food.model({id:"2", name:"دیزی کلاسیک", price: 400, description: "گوشت گردن گوسفندی", foodSet:"دیزی"})
    // var new_food2 = new food.model({id:"3", name:"کوفته تبریزی", price: 300, description: "۲ عدد کوفته", foodSet:"غذای ایرانی"})
    // var new_food3 = new food.model({id:"4", name:"کشک بادمجان", price:300 , description: "400گرم", foodSet:"غذای ایرانی"})
    // var new_food4 = new food.model({id:"5", name:"ترشی", price:20 , description: "", foodSet:"پیش غذا"})
    // var new_food5 = new food.model({id:"6", name:"نوشابه قوطی", price: 10 , description: "", foodSet:"نوشیدنی"})

    // var new_food6 = new food.model({id:"7", name:"کباب کوبیده", price: 400, description: "", foodSet:"خوراک"})
    // var new_food7 = new food.model({id:"8", name:"جوجه کباب", price: 500, description: "ران مرغ بی استخوان", foodSet:"خوراک"})
    // var new_food8 = new food.model({id:"9", name:"کباب برگ", price: 600, description: "گوشت راسته گوسفندی", foodSet:"پلویی"})
    // var new_food9 = new food.model({id:"10", name:"دان تان برگر", price: 700, description: "گوشت راسته گوسفندی", foodSet:"ساندویچ"})
    // var new_food10 = new food.model({id:"12", name:"آپ تان برگر", price: 700, description: "گوشت راسته گوسفندی", foodSet:"ساندویچ"})
    // var new_food11 = new food.model({id:"12", name:"مید تان برگر", price: 700, description: "گوشت راسته گوسفندی", foodSet:"ساندویچ"})
  
    // new_food.save();
    // var new_comment = new comment.model({id:"1", author:"Mahtab", quality: 5, packaging: 4, deliveryTime:3, text: "غذای خیلی خوبی بود :دی", created_at: "2019-2-8"})
    // var new_comment1 = new comment.model({id:"2", author:"Monireh", quality: 5, packaging: 4, deliveryTime:3, text: "چه دیزی خوشمزه ای بود :دی", created_at: "2019-2-9"})
    // var new_comment2 = new comment.model({id:"3", author:"Aisan", quality: 3, packaging: 4, deliveryTime:4, text: "حجم غذا زیاد بود =))", created_at: "2019-2-10"})
    // var new_comment3 = new comment.model({id:"3", author:"Melika", quality: 5, packaging: 5, deliveryTime: 5, text: "شاید که من نظر ندم بهتره :دی", created_at: "2019-2-11"})

    // var new_address = new address.model({id:"1", city:"تهران", area: "جردن", addressLine: "تهران، جردن، نبش خیابان ایرج، پلاک ۱۱۷"})
    // var new_address1 = new address.model({id:"2", city:"تهران", area: "جردن", addressLine: "تهران، جردن، بلوار صبا، پلاک ۲۴"})
    // var new_address2 = new address.model({id:"3", city:"تهران", area: "جردن", addressLine: "تهران، ولیعصر، بلوار میرداماد، نرسیده به چهارراه جردن"})
    // var new_address3 = new address.model({id:"4", city:"تهران", area: "جردن", addressLine: "تهران، شریعتی، روبروی خیابان کلاهدوز"})
    // var new_address4 = new address.model({id:"4", city:"تهران", area: "جلفا", addressLine: "تهران - جلفا .. "})


    // var new_restaurant = new restaurant.model({id:"1", name:"شاندیز جردن", logo: "shandiz.jpg", openingTime: 10, closingTime: 22,
    // averageRate:4.2, address: new_address1, categories: [new_category2,new_category3, new_category4, new_category5],
    //  foods:[new_food6, new_food7, new_food8], comments:[new_comment, new_comment2, new_comment3]})

    // var new_restaurant1 = new restaurant.model({id:"2", name:"دیزی باشی", logo: "dizi.jpeg", openingTime: 10, closingTime: 22,
    // averageRate:4.1, address: new_address3, categories: [new_category,new_category8, new_category4, new_category5],
    //  foods:[new_food, new_food1, new_food2, new_food3, new_food4, new_food5],
    //   comments:[new_comment, new_comment1, new_comment2, new_comment3]})

    // var new_restaurant2 = new restaurant.model({id:"3", name:"کافه مود", logo: "mood.jpeg", openingTime: 18, closingTime: 22,
    // averageRate:4.5, address: new_address2, categories: [new_category1,new_category6, new_category7, new_category9],
    //  foods:[new_food, new_food1, new_food2, new_food3, new_food4, new_food5],
    //   comments:[new_comment, new_comment3]})

    
    // var new_restaurant3 = new restaurant.model({id:"4", name:"دان تان", logo: "mood.jpeg", openingTime: 18, closingTime: 22,
    // averageRate:4, address: new_address, categories: [new_category5,new_category6, new_category9],
    // foods:[new_food9, new_food10, new_food11],
    // comments:[new_comment, new_comment3]})

    // var new_restaurant4 = new restaurant.model({id:"5", name:"کباب گلستان", logo: "mood.jpeg", openingTime: 10, closingTime: 22,
    // averageRate:4.5, address: new_address4, categories: [new_category2,new_category3, new_category4, new_category5],
    // foods:[new_food6, new_food7, new_food8],
    // comments:[new_comment, new_comment3]})

    // new_restaurant.save(function (err, book) {
    //         if (err) return console.error(err);
    //         console.log(book.name + " saved to bookstore collection.");
    //       });
        
    // new_restaurant1.save(function (err, book) {
    // if (err) return console.error(err);
    // console.log(book.name + " saved to bookstore collection.");
    // });
    // new_restaurant2.save(function (err, book) {
    // if (err) return console.error(err);
    // console.log(book.name + " saved to bookstore collection.");
    // });
    // new_restaurant3.save(function (err, book) {
    // if (err) return console.error(err);
    // console.log(book.name + " saved to bookstore collection.");
    // });
    // new_restaurant4.save(function (err, book) {
    //     if (err) return console.error(err);
    //     console.log(book.name + " saved to bookstore collection.");
    //     });   
    // var new_dictionary = new dictionary.model({fa: "غذای ایرانی", en: "iranian food"})
    // new_dictionary.save();
    // var new_dictionary = new dictionary.model({fa: "سالاد", en: "salad"})
    // new_dictionary.save();
    // var new_dictionary = new dictionary.model({fa: "کباب", en: "kebab"})
    // new_dictionary.save();
    // var new_dictionary = new dictionary.model({fa: "شاندیز جردن", en: "shandiz-jordan"})
    // new_dictionary.save();
    // var new_dictionary = new dictionary.model({fa: "قرمه سبزی", en: "ghorme sabzi"})
    // new_dictionary.save();
    // var new_dictionary = new dictionary.model({fa: "میرداماد", en: "mirdamad"})
    // new_dictionary.save();
    // var new_dictionary = new dictionary.model({fa: "کشاورز", en: "keshavarz"})
    // new_dictionary.save();
    // var new_dictionary = new dictionary.model({fa: "جردن", en: "jordan"})
    // new_dictionary.save();
    // var new_dictionary = new dictionary.model({fa: "جلفا", en: "jolfa"})
    // new_dictionary.save();
    // var new_dictionary = new dictionary.model({fa: "دیزی باشی", en: "dizi-bashi"})
    // new_dictionary.save(); 
    // var new_dictionary = new dictionary.model({fa: "دان تان", en: "down-town"})
    // new_dictionary.save(); 
    // var new_dictionary = new dictionary.model({fa: "کافه مود", en: "cafe-mood"})
    // new_dictionary.save(); 

    // return "DONE :)"
}
async function restaurants_info(name){
    let name_fa = await dictionary.model.find({'en':name}).exec()
    name = name_fa[0]['fa']
    return restaurant.model.find({'name':name}).exec()
}
async function restaurants_comments(name){
    let name_fa = await dictionary.model.find({'en':name}).exec()
    name = name_fa[0]['fa']
    let res = await restaurant.model.find({'name':name}).exec()
    final_result = []
    for(i in res){
        final_result.push(res[i]["comments"])
    }
    console.log(final_result)
    return final_result.sort({ field: 'id'})
}
async function save_comment(name_rest, n_author, n_quality, n_text){ 
    var new_comment = new comment.model({id:"2", author:n_author, quality: n_quality, text: n_text, created_at: Date.now()})
    let last_comm = await restaurants_comments(name_rest)
    let comments = []
    let i, c = 0.0, c1 = 0.0, c2 = 0.0;
    for(i in last_comm){
        comments.push(last_comm[i][0])
        c += last_comm[i][0]["quality"]
        c1 += last_comm[i][0]["packaging"]
        c2 += last_comm[i][0]["deliveryTime"]
    }
    comments.push(new_comment)
    let name_fa = await dictionary.model.find({'en':name_rest}).exec()
    name = name_fa[0]['fa']
    c += new_comment["quality"]
    c1 += new_comment["packaging"]
    c2 += new_comment["deliveryTime"]
    let final_rate= c/(last_comm.length+1) + c1/(last_comm.length+1) + c2/(last_comm.length+1)
    try{
        let res = await restaurant.model.updateOne({'name':name}, {'comments': comments, 'averageRate': final_rate})
    }
    catch(e){
        console.log("eeeeeerrrrrrrrrrrrrrr")
        console.log()
    }
    return "Done"
}
async function save_restaurant(name, farsi, logo, openingTime, closingTime, in_address, in_categories, in_foods, in_comments){
    var new_dictionary = new dictionary.model({fa: farsi, en: name })
    new_dictionary.save();
    let rate = 0 
    let new_address = {}
    let new_category = []
    let new_comment = []
    let new_food = []
    if(in_comments != undefined){
        let c = 0
        for (i in in_comments){
            c += in_comments[i]["quality"]
            let temp = new comment.model(in_comments[i])
            // temp.save()
            new_comment.push(temp)
        }
        rate = c / in_comments.length
    }
    if (in_address != undefined){
        new_address = new address.model(in_address)
        // new_address.save();
    }
    if (in_foods != undefined){
        for (i in in_foods){
            let temp = new food.model(in_foods[i])
            // temp.save()
            new_food.push(temp)
        }
    }
    if (in_categories != undefined){
        for (i in in_categories){
            let temp = new category.model(in_categories[i])
            // temp.save()
            new_category.push(temp)
        }
    }
    var new_restaurant = new restaurant.model({id:"2", name:farsi, logo: logo, openingTime: openingTime, closingTime: closingTime,
    averageRate:rate, address: new_address, categories: new_category, foods:new_food, comments:new_comment})
    // restaurant.model.find({"name": "khatoon"}).remove()
    new_restaurant.save()
    return "OK!"
}
async function find_area(area){
    let a = "/" + area + "/";
    let c = await restaurant.model.find({'address.area': { "$regex": area, "$options": "i" }})
    console.log(c)
    return c 
}
async function find_en(name){
    let name_en = await dictionary.model.find({'fa':name}).exec()
    name_res  = name_en[0]['en']
    console.log(name_res)
    return name_res
}
module.exports = {
    get_restaurants: get_restaurants,
    restaurants_info: restaurants_info,
    restaurants_comments: restaurants_comments,
    save_comment: save_comment, 
    save_restaurant: save_restaurant,
    find_area: find_area,
    find_en: find_en
}