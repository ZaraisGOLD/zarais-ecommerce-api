const Product = require('./Product')
const Category = require('./Category')

//Product -> //categoryID
Product.belongsTo(Category)
Category.hasMany(Product)