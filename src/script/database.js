import fb from '../index.html';

const db = fb.database().ref();

export function selectDB(from, where) {
    return db.child(from).once('value').then(function(snapshot) {
        console.log(snapshot['node_']['value_']);
    }).catch(e => console.error('MY ERROR: ', e));
};