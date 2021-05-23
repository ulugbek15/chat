const { fetchOne } = require('./pg')

;(async () => {
    console.log( await fetchOne('select 1'))
})()