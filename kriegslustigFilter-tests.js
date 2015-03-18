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

Tinytest.addAsync('_itemsDep.depend()', function (test, onComplete) {
  var kriegslustigFilterTestInstance = Object.create(KriegslustigFilter)
, returnedItemValue = false
  kriegslustigFilterTestInstance.collection = new Mongo.Collection()
  kriegslustigFilterTestInstance.init()
  Tracker.autorun(function (comp) {
    var returnedItems = kriegslustigFilterTestInstance.getItems()
    returnedItemValue = returnedItems[0] ? returnedItems[0].test : false
  })
  kriegslustigFilterTestInstance.collection.insert({
    test: true
  })
  setTimeout(function () {
    test.equal(returnedItemValue, true, 'Comps which use getItems should rerun when _items changes')
    onComplete()
  }, 1)
})

Tinytest.addAsync('newSubFilter', function (test, onComplete) {
  var kriegslustigFilterTestInstance = Object.create(KriegslustigFilter)
  kriegslustigFilterTestInstance.collection = new Mongo.Collection()
  kriegslustigFilterTestInstance.init()
  kriegslustigFilterTestInstance.collection.insert({
    someInt: 2
  })
  kriegslustigFilterTestInstance.collection.insert({
    someInt: 4
  })
  kriegslustigFilterTestInstance.newSubFilter('biggerThen', {
    active: false
  , attributes: {
      biggerThen: {
        dataType: 'number'
      , value: 2
      }
    }
  , generateSubFilter: function () {
      var self = this
      return {
        someInt: {
          $gt: self.getAttribute('biggerThen')
        }
      }
    }
  })
  test.equal(kriegslustigFilterTestInstance.getItems().length, 2, 'If the active attribute is set to false the subfilter should be ignored')
  kriegslustigFilterTestInstance.subFilters.biggerThen.activate()
  test.equal(kriegslustigFilterTestInstance.getItems().length, 1, 'If the active attribute is set to true the shubfilter should be used')
  kriegslustigFilterTestInstance.newSubFilter('lowerThen', {
    active: true
  , attributes: {
      lowerThen: {
        dataType: 'number'
      , value: 100
      }
    }
  , generateSubFilter: function () {
      var self = this
      return {
        someInt: {
          $lt: self.getAttribute('lowerThen')
        }
      }
    }
  })
  kriegslustigFilterTestInstance.collection.insert({
    someInt: 101
  })
  kriegslustigFilterTestInstance.collection.insert({
    someInt: 99
  })
  test.equal(kriegslustigFilterTestInstance.getItems().length, 2, 'You should be able to combine multiple filters')
  onComplete()
})
