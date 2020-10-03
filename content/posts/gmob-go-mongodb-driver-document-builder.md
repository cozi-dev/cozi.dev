---
title: "Gmob - Go Mongodb Driver document builder"
date: 2020-10-03T08:48:07+07:00
tags: ["go", "mongodb", "driver"]
---

When I worked with <a href="https://github.com/mongodb/mongo-go-driver" target="_blank">Mongo Go Driver</a>, it was complicate to make a search, or update query document(s) with dynamic conditions.

For example, collection `cars` that contains the following documents:

```bash
{ _id: 1, name: "abc1", status: "A", qty: 50, category: "sport", createdAt: ISODate("2019-11-02T17:04:11.102Z") }
{ _id: 2, name: "xyz1", status: "A", qty: 100, category: "sedan", createdAt: ISODate("2019-10-01T17:04:11.102Z") }
{ _id: 3, name: "xyz2", status: "D", qty: 25, category: "sport", createdAt: ISODate("2018-10-12T17:04:11.102Z") }
```

Our model:

```go
...

type Car struct {
    ID int `bson:"_id"`
    Name string `bson:"name"`
    Status string `bson:"status"`
    Qty string `bson:"qty"`
    Category string `bson:"category"`
    CreatedAt time.Time `bson:"createdAt"`
}
```

Then what are you gonna do if you want to find all the cars with a name/status/category, or even all of them? It may look like this:

```go
...

func (cm *CarManager) FindCars(ctx context.Context, in Car) (cars []*Car, err error) {
    cars = []*Car{}
    filter := bson.M{}

    // filter by name
    if in.Name != "" {
        filter["name"] = in.Name
    }

    // filter by status
    if in.Status != "" {
        filter["status"] = in.Status
    }

    // filter by category
    if in.Categroy != "" {
        filter["category"] = in.Categroy
    }

    cur, err := cm.collection.Find(ctx, filter)
    if err != nil {
        return nil, err
    }

    // decode the result here
    ...

    return
}
```

It's boring, right? Then I wrote a simple util which called <a href="https://github.com/tungquach/gmob" target="_blank">Gmob</a> to resolve this. Let's take a look:


```go
...

import (
    ...
    github.com/tungquach/gmob
    ...
)

...

func (cm *CarManager) FindCars(ctx context.Context, in Car) (cars []*Car, err error) {
    cars = []*Car{}

    // Examples
    // in = Car{Name: "abc1"} => filter = bson.M{"name": "abc1"}
    // in = Car{Name: "acb1", Status: "A", Category: "sport"} => filter = bson.M{"name": "abc1", "status": "A", "category": "sport"}
    filter, _ := gmob.Build(in)

    cur, err := cm.collection.Find(ctx, filter)
    if err != nil {
        return nil, err
    }

    // decode the result here
    ...

    return
}
```

Now it looks more simple! And we can do the same for the update query:

```go
...

import (
    ...
    github.com/tungquach/gmob
    ...
)

...

func (cm *CarManager) UpdateCar(ctx context.Context, in Car) (err error) {
    // Examples
    // in = Car{ID: 1, Name: "abc1"} => filter = bson.M{"_id": 1, "name": "abc1"}
    // in = Car{ID: 1, Name: "acb1", Status: "A", Category: "sport"} => filter = bson.M{"_id": 1, "name": "abc1", "status": "A", "category": "sport"}
    setValues, _ := gmob.Build(in)
    _, err = cm.collection.UpdateOne(ctx, bson.M{"_id": in.ID}, bson.M{"$set": setValues})

    return
}
```

## Conclusions

I hope Gmob can help us stay away from boring code :) If you have any thoughts, please don't hesitate to give me feedback. Thank you so much!

## Repository

* [https://github.com/tungquach/gmob](https://github.com/tungquach/gmob)
