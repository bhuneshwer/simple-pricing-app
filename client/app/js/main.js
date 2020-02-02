(function() {

    let apiUrl = "http://localhost:5100/api";


    let filters = {
        "brandId": null,
        "categoryId": null,
        "websiteId": null,
        "filterBy": null
    }

    let columns = [
        "product_name",
        "product_url",
        "brand",
        "image_url",
        "product_price",
        "product_mrp",
        "packing_qty",
        "moq",
        "product_discount",
        "category_path",
    ]

    function _id(domId) {
        return document.getElementById(domId);
    }

    function init() {
        window.addEventListener('DOMContentLoaded', (event) => {
            addListeners();
        });
    }

    function addListeners() {

        loadWebsites();
        _id("websites_list").addEventListener("change", (event) => {
            filters.websiteId = event.target.value;
        })
        _id("type_list").addEventListener("change", (event) => {
            onTypeChange(event)

        })

        _id("brands_list").style.display = "none";
        _id("categories_list").style.display = "none";

        _id("brands_list").addEventListener("change", (event) => {
            onBrandChange(event)
        })

        _id("categories_list").addEventListener("change", (event) => {
            onCategoryChange(event)
        })
    }

    function renderList(domId, list, type) {
        if (domId && list && list.length) {
            let str = `<option value=''>Select ${type}</option>`

            for (var index in list) {
                let item = list[index];
                let option = `<option value="${item._id}">${item.name}</option>`
                str += option;
            }

            document.getElementById(domId).innerHTML = str;
        }
    }

    function renderDataTable(domId, list) {
        if (domId && list && list.length) {
            let str = ""

            for (var index in list) {
                let item = list[index];
                let row = ""
                for (var column in columns) {

                    let columStr = `<td>${item[columns[column]]}</td>`
                    row += columStr;
                }
                str += row;
            }
            document.getElementById(domId).innerHTML = str;
        }
    }

    function loadWebsites() {
        Requests.get(apiUrl + "/websites/list", {}, (response) => {
            if (response && response.data && response.data.websites) {
                renderList("websites_list", response.data.websites, "Website");
            }
        })
    }



    function loadBrands() {
        Requests.get(apiUrl + `/brands/list?website_id=${filters.websiteId}`, {},
            (response) => {
                if (response && response.data && response.data.brands) {
                    renderList("brands_list", response.data.brands, "Brand");
                }
            })
    }

    function loadCategories() {
        Requests.get(apiUrl + `/categories/list?website_id=${filters.websiteId}`, { "website_id": filters.websiteId },
            (response) => {
                if (response && response.data && response.data.categories) {
                    renderList("categories_list", response.data.categories, "Category");
                }
            })
    }

    function loadProducts() {


        let query_str = `website_id=${filters.websiteId}`


        if (filters.filterBy && filters.filterBy == "category") {
            query_str += `&category_id=${filters.categoryId}`
        } else {
            query_str += `&brand_id=${filters.brandId}`
        }


        Requests.get(apiUrl + "/products/list?" + query_str, {},
            (response) => {

                if (response && response.data && response.data.products) {
                    renderDataTable("productsListContainer", response.data.products);
                }

            })
    }


    function onTypeChange(event) {
        filters.filterBy = event.target.value;
        _id("brands_list").style.display = filters.filterBy == "category" ? "none" : "block";
        _id("categories_list").style.display = filters.filterBy == "brands" ? "none" : "block";;
        if (filters.filterBy == "category") {
            loadCategories();
        } else {
            loadBrands();
        }
    }

    function onBrandChange() {
        filters.brandId = event.target.value;
        loadProducts()
    }

    function onCategoryChange() {
        filters.categoryId = event.target.value;
        loadProducts()
    }

    init();

})()