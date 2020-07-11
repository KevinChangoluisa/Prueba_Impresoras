const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let impresoraSchema = new Schema({
    marca: {
        type: String,
        required: [true, 'El nombre de la marca es requerido']
    },
    modelo: {
        type: String,
        required: [true, 'El nombre del modelo es requerido']
    },
    serie: {
        type: Number,
        required: [true, 'El numero de serie es requerido'],
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} debe ser entero'
        }
    },
    color: {
        type: Boolean,
        default: false
    },
    ip: {
        type: String,
        required: true
    },
    contador: {
        type: Number,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{PATH} debe ser entero.'

        }
    },
    precio: {
        type: Number,
        required: true
    }
});

impresoraSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico.' });
impresoraSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.contador;
    return userObject
}

module.exports = mongoose.model('impresora', impresoraSchema);