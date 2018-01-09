const express = require('express')
const router = express.Router()
const request = require('request-promise');
const config = require("../config/app-config");

function challengeInput() {
  const queryOptions = {
    uri: `${config.base_url}${config.apis.input}`,
    headers: {
      'UserID': config.auth.user_id
    },
    json: true
  };
  return request(queryOptions);
}

function challengeOutput(output) {
  
  const queryOptions = {
    method: 'POST',
    uri: `${config.base_url}${config.apis.output}`,
    headers: {
      'UserID': config.auth.user_id,
      'content-type': 'application/json'
    },
    body: output,
    json: true
  };
  return request(queryOptions);
}

function filterProducts(products) {
  return products.filter(product => {
    //comapare only date, dont include time
    const start = new Date((new Date(product.startDate)).toDateString());
    const current = new Date((new Date()).toDateString());
    return product.endDate ? 
      start <= current && current <= new Date((new Date(product.endDate)).toDateString()) :
      start <= current;
  })
}

function groupProductCount(activeProducts) {
  return activeProducts.reduce((acc, product) => {
    acc[product.category] = acc[product.category] ? acc[product.category] + 1 : 1;
    return acc;
  }, {})
}

function getTotalValue(activeProducts) {
  const totalValue = activeProducts.reduce((total, product) => {
    return total + product.price
  }, 0);

  return {
    totalValue
  }
}
router.get('/', function(req, res, next) {
  const queryOptions = {
    uri: `${config.base_url}${config.apis.challenge}`,
    headers: {
      'UserID': config.auth.user_id
    },
    json: true
  };
  request(queryOptions)
    .then((response) => {
      res.send(JSON.stringify(response));
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send({ error: err });
    });
})

router.get('/first', function(req, res, next) {
  challengeInput()
    .then(filterProducts)
    .then(getTotalValue)
    .then(challengeOutput)
    .then((response) => {
      res.send(JSON.stringify(response));
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send({ error: err });
    });
})


module.exports = router
