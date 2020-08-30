---
title: "MongoDB filter by nested object field"
date: 2020-08-30T21:21:50+07:00
tags: ["mongo", "database"]
---

Consider our `logs` collection contains with each document has a set of `logItems`, each item store sold status and price:

```json
{ "_id" : 1, "name" : "ABC1",  "logItems": { "item1": { "sold": false, "price": 10 }, "item2": { "sold": true, "price": 5 } } }
{ "_id" : 2, "name" : "ABC2",  "logItems": { "item3": { "sold": true, "price": 2 }, "item4": { "sold": true, "price": 4 }, "item5": { "sold": true, "price": 6 } } }
{ "_id" : 3, "name" : "XYZ1",  "logItems": { "item6": { "sold": false, "price": 15 } } }
```

And we want to filter all documents which has at least one item hasn't been sold. The following aggregation pipeline use the <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/objectToArray/" target="_blank">$objectToArray</a> operater will do the job:

```
db.logs.aggregate(
   [
      {
         $addFields: {
            items: { $objectToArray: "$logItems" } // convert logItems to items array
         }
      },
      {
         $match: {
            "items.v.sold": false // check nested field
         }
      },
      {
         $project: {
            items: 0 // remove items field from return result
         }
      }
   ]
)
```

The operation above returns the following:

```json
{ "_id" : 1, "name" : "ABC1",  "logItems": { "item1": { "sold": false, "price": 10 }, "item2": { "sold": true, "price": 5 } } }
{ "_id" : 3, "name" : "XYZ1",  "logItems": { "item6": { "sold": false, "price": 15 } } }
```

## Reference

* https://docs.mongodb.com/manual/reference/operator/aggregation/objectToArray/
