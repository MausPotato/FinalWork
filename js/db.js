var db = {}

db.search = function(search_str) {
  function is_match(product, str) {
    if (!str) {
      return true;
    }
    return product.cname.toLowerCase().indexOf(str.toLowerCase()) != -1 || product.ename.toLowerCase().indexOf(str.toLowerCase()) != -1;
  }
  var ret = [];
  for (var c in product_category) {
    ret[c] = [];
  }
  for (var key in products) {
    if (is_match(products[key], search_str)) {
      products[key].category.forEach(function (c) {
        ret[c].push(products[key]);
      });
    }
  }
  return ret;
}

db.get_category_list = function () {
  return product_category;
}