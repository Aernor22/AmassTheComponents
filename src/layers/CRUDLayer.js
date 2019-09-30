var Datastore = require('react-native-local-mongodb');
var db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

    export function addCard (cardInfo){
       console.log("Trying to store "+ cardInfo.name);
       db.findOne({name : cardInfo.name}, function(err,doc){ //mudar para ID
            if(!doc){
                db.insert({...cardInfo, quantity : 1},function (err,newDoc) {
                    if(newDoc) console.log('inserted');
                    if(err) console.log(err);
                });
            }else{
                db.update({_id:doc._id}, {$set: {quantity: (doc.quantity+1)}},function (err,newDoc) {
                    if(newDoc) console.log('updated');
                    if(err) console.log(err);
                });
            }
        });
    }

    export function retrieveCard (cardId){
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

    export function removeCard (cardId){
        console.log("Trying to delete "+ cardId);
        db.findOne({_id: cardId},function(err,doc){
            if(doc){
                console.log("found!");
                if(doc.quantity>1){
                    console.log("updated.");
                    db.update({_id:doc._id}, {$set: {quantity: (doc.quantity-1)}});
                }else{
                    console.log("full remove");
                    removeAllCopies(cardId);
                }
            }
        });
    }

    export function removeAllCopies (cardId){
        db.remove({_id: cardId},{});
    }

    export function removeAll() {
        db.remove({}, { multi: true }, function (err, numRemoved) {
        });
    }

