const mongoose = require('mongoose');

async function connectBD() {
    const user = "examen";
    const password = "examen";
    const dbName = "examen";

    mongoose.connect('mongodb+srv://albargrrss:u9pa0KMdm5QLnyFu@clusterrelapp.ancnn.mongodb.net/plantillaBD', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Conectado a MongoDB'))
        .catch(err => console.error('Error en la conexión:', err));

}
module.exports = connectBD;
