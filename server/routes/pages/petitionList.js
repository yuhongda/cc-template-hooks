'use strict';

const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { resultData } = require('../../common/utils');

router.get('/getPetitionList',function(req,res){
  res.type('json');
  let ret = {};
  Object.assign(ret,resultData,{
    data: [
      {
        propertyId: 1,
        propertyName: `净含量`,
        list: [
          {
            subPropertyId: 1,
            subPropertyName: `1000ml以上`
          },
          {
            subPropertyId: 2,
            subPropertyName: `300ml-500ml`
          },
          {
            subPropertyId: 3,
            subPropertyName: `350ml`
          }
        ]
      },
      {
        propertyId: 2,
        propertyName: `国产/进口`,
        list: [
          {
            subPropertyId: 1,
            subPropertyName: `国产`
          },
          {
            subPropertyId: 2,
            subPropertyName: `进口`
          }
        ]
      },
      {
        propertyId: 3,
        propertyName: `功效`,
        list: [
          {
            subPropertyId: 1,
            subPropertyName: `去屑`
          },
          {
            subPropertyId: 2,
            subPropertyName: `止痒`
          },
          {
            subPropertyId: 3,
            subPropertyName: `控油`
          }
        ]
      }
    ]
  });
  res.send(ret);
});


module.exports = router;