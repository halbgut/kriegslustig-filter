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
  TestCollection.insert({
    something: false
  })
  test.equal(kriegslustigFilterTestInstance._items[1].something, false, '_items didn\'nt reactively update')
});

Tinytest.add('Listen for changes in the collection', function (test) {
  var kriegslustigFilterTestInstance = Object.create(KriegslustigFilter)
  kriegslustigFilterTestInstance.collection = new Mongo.Collection()
  kriegslustigFilterTestInstance.init()
  kriegslustigFilterTestInstance.collection.insert({
    test: true
  })
  test.equal(kriegslustigFilterTestInstance._items[0].test, true, 'It should reactively update the _items array after the collection updates')
})