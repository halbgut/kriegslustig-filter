Tinytest.add('init', function (test) {
  var TestCollection = new Mongo.Collection()
, kriegslustigFilterTestInstance = Object.create(KriegslustigFilter)
  kriegslustigFilterTestInstance.collection = TestCollection
  kriegslustigFilterTestInstance.init()
  TestCollection.insert({
    something: true
  })
  test.equal(kriegslustigFilterTestInstance._items[0].something, true, 'Initiation failed');
});

Tinytest.add('getItems', function (test) {
  var TestCollection = new Mongo.Collection()
, kriegslustigFilterTestInstance = Object.create(KriegslustigFilter)
  kriegslustigFilterTestInstance.collection = TestCollection
  kriegslustigFilterTestInstance.init()
  TestCollection.insert({
    something: true
  })
  test.equal(kriegslustigFilterTestInstance.getItems()[0].something, true, 'Initiation failed');
});
