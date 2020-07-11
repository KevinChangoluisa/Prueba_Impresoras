// ==================================================
// Puerto
// ==================================================

process.env.PORT = process.env.PORT || 3000;

// ==================================================
// Entorno
// ==================================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ==================================================
// base de datos
// ==================================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/impresorasDB';
} else {
    urlDB = 'mongodb+srv://impresoras-user:171812@impresorasdb.pthis.mongodb.net/impresorasDB'
}
process.env.URLDB = urlDB;