const path = require('path')
require = require("esm")(module/*, options*/)



const file = `${process.argv[2]}\\index.js`
const filePath = path.join(process.cwd(), 'backend', file)
module.exports = require(filePath)