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
        var findPromise = new Promise((resolve,reject)=>{
            db.find({}, function (err, docs) {
                console.log("inside retrieve");
                if(docs){
                    console.log(docs);
                    resolve(docs);
                }
            });
        });

        return await findPromise;
    }

    export async function removeCard (cardId){
        console.log("Trying to delete "+ cardId);
        await db.findOne({_id: cardId},async function(err,doc){
            if(doc){
                console.log("found!");
                if(doc.quantity>1){
                    console.log("updated.");
                    await db.update({_id:doc._id}, {$set: {quantity: (doc.quantity-1)}});
                }else{
                    console.log("full remove");
                    await removeAllCopies(cardId);
                }
            }
        });
    }

    export async function removeAllCopies (cardId){
        await db.remove({_id: cardId},{});
    }

    export function removeAll() {
        db.remove({}, { multi: true }, function (err, numRemoved) {
        });
    }

