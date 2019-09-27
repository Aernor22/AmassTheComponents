var Datastore = require('react-native-local-mongodb');
var db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

    export async function addCard (cardInfo){
       console.log("Trying to store "+ cardInfo.name);
       return await db.findOne({name : cardInfo.name}, function(err,doc){
           var returned = false;
            if(!doc){
                returned = db.insert({...cardInfo, quantity : 1},function (err,newDoc) {
                    if(newDoc) {
                        console.log('inserted');
                        return true;
                    }

                    if(err) return false;
                });
            }else{
                returned = db.update({_id:doc._id}, {$set: {quantity: (doc.quantity+1)}},function (err,newDoc) {
                    if(newDoc) {
                        console.log('updated');
                        return true;
                    }

                    if(err) return false;
                });
            }
            return returned;
        });
    }

    export  function retrieveCard (cardId){
        db.findOne({_id: cardId},function(err,doc){
            return doc;
        });
    }

    export async function retrieveAll (){
        var list= []
        await db.find({}, function (err, docs) {
            if(docs){
                list = docs;
            }
        });
        return list;
    }

    export  function removeCard (cardId){
        db.findOne({_id: cardId},function(err,doc){
            if(doc){
                if(doc.quantity>1){
                    db.update({_id:doc._id}, {$set: {quantity: (doc.quantity-1)}});
                }else{
                    removeAllCopies(cardId);
                }
            }
        });
    }

    export  function removeAllCopies (cardId){
        db.remove({_id: cardId},{});
    }

    export function removeAll() {
        db.remove({}, { multi: true }, function (err, numRemoved) {
        });
    }

