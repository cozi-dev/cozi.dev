---
title: "MongoDB query get n records of each group (aggregation)"
date: 2022-07-04T16:16:38+07:00
tags: ["mongodb", "database", "nosql", "query"]
---

For example, you might want to get 5 members of each group in your application. But you don't want to query multiple times for each group because it is not good for your server. \
In MongoDB, we can do this way with only one query. Let's look at the data below:

```bash
db.groupMembers.insertMany([
    { "_id" : 1, "groupId" : "g1", "userId" : "u1", "status" : 1 },
    { "_id" : 2, "groupId" : "g2", "userId" : "u1", "status" : 0 },
    { "_id" : 3, "groupId" : "g1", "userId" : "u2", "status" : 1 },
    { "_id" : 4, "groupId" : "g1", "userId" : "u3", "status" : 2 },
    { "_id" : 5, "groupId" : "g1", "userId" : "u4", "status" : 1 },
    { "_id" : 6, "groupId" : "g1", "userId" : "u5", "status" : 1 },
    { "_id" : 7, "groupId" : "g2", "userId" : "u6", "status" : 1 },
    { "_id" : 8, "groupId" : "g3", "userId" : "u7", "status" : 1 },
    { "_id" : 9, "groupId" : "g1", "userId" : "u8", "status" : 1 },
    { "_id" : 10, "groupId" : "g1", "userId" : "u9", "status" : 1 },
    { "_id" : 11, "groupId" : "g1", "userId" : "u10", "status" : 1 },
    { "_id" : 12, "groupId" : "g1", "userId" : "u11", "status" : 1 },
])
```

The following aggregation operation will return 5 user ids for each group:

```bash
db.groupMembers.aggregate( [
  {
    $group: {
       _id: "$groupId",
       userIds: { $push: { "userId": "$userId" } } # if you want to get entire record then use { $push: "$$ROOT" }
    },
    $project: {
        _id: 1,
        userIds: { $slice: [ "$userIds", 5 ] }
    }
  }
] )
```

And the operation returns the following result:

```bash
{ "_id" : "g1", "userIds" : [ { "userId": "u1" }, { "userId": "u2" }, { "userId": "u3" }, { "userId": "u4" }, { "userId": "u5" } ] }
{ "_id" : "g2", "userIds" : [ { "userId": "u1" }, { "userId": "u6" } ] }
{ "_id" : "g3", "userIds" : [ { "userId": "u7" } ] }
```

## Conclusions

Above is a simple query to understand the concept, you might need to modify the query to fit for your purposes.