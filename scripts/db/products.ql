db.products.update({_id:ObjectId("5e372289c3201ed2b54d7917")},{$set:{
    "product_name":"Honeywell Anti-Pollution Fa",
    "product_url":"https://www.industrybuying.com/dust-masks-honeywell-SAF.DIS.14812960/",
    "brand_id":ObjectId("5e3719ebc3201ed2b54d7911"),
    "image_url":"//static6.industrybuying.com/products/safety/respiratory-protection/disposable-respirator/SAF.DIS.14812960.jpeg",
    "product_price":"440",
    "product_mrp":"450",
    "packing_qty":"1",
    "moq":"1",
    "product_discount":"10%",
    "category_path":ObjectId("5e37228cc3201ed2b54d791b"),
    "created_date":new Date(),
    "category_id":ObjectId("5e37228cc3201ed2b54d791b"),
    "website_id":ObjectId("5e3718a6c3201ed2b54d7910")
}},{upsert:true})


db.products.update({_id:ObjectId("5e37228dc3201ed2b54d791c")},{$set:{
    "product_name":"Honeywell Anti-Pollution Fa",
    "product_url":"https://www.industrybuying.com/dust-masks-honeywell-SAF.DIS.14812960/",
    "brand_id":ObjectId("5e371a61c3201ed2b54d7912"),
    "image_url":"//static6.industrybuying.com/products/safety/respiratory-protection/disposable-respirator/SAF.DIS.14812960.jpeg",
    "product_price":"440",
    "product_mrp":"450",
    "packing_qty":"1",
    "moq":"1",
    "product_discount":"10%",
    "category_path":ObjectId("5e37228dc3201ed2b54d791c"),
    "created_date":new Date(),
    "category_id":ObjectId("5e37228dc3201ed2b54d791c"),
    "website_id":ObjectId("5e3718a6c3201ed2b54d7910")
}},{upsert:true})