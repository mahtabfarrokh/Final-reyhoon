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
    // new_category.save();
    // var new_food = new food.model({id:"1", name:"کباب", price: 100, description: "...", foodSet:"کباب"})
    // new_food.save();
    // var new_food2 = new food.model({id:"2", name:"قرمه سبزی", price: 110, description: "...", foodSet:"چلو خورشت"})
    // new_food.save();
    // var new_comment = new comment.model({id:"1", author:"Mahtab", quality: 5, packaging: 1, deliveryTime:30, text: "غذای خیلی خوبی بود :دی", created_at: "2019-2-8"})
    // new_comment.save(function (err, book) {
    //     if (err) return console.error(err);
    //     console.log(book.name + " saved to bookstore collection.");
    //   });
    // var new_address = new address.model({id:"1", city:"تهران", area: "کشاورز", addressLine: "ولیعصر - .."})
    // new_address.save();
    // var new_restaurant = new restaurant.model({id:"1", name:"شاندیز جردن", logo: "shandiz.jpg", openingTime: 12, closingTime: 22,
    // averageRate:4, address: new_address, categories: [new_category], foods:[new_food, new_food2], comments:[new_comment]})
    // new_restaurant.save(function (err, book) {
    //         if (err) return console.error(err);
    //         console.log(book.name + " saved to bookstore collection.");
    //       });
          
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

    return "DONE :)"
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
    let i, c = 0;
    for(i in last_comm){
        comments.push(last_comm[i][0])
        c += last_comm[i][0]["quality"]
    }
    comments.push(new_comment)
    let name_fa = await dictionary.model.find({'en':name_rest}).exec()
    name = name_fa[0]['fa']
    c += new_comment["quality"]
    let final_rate= c/(last_comm.length+1)
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