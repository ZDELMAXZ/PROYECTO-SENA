const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema({
    Nombre: { type: String, required: true },
    Apellido: { type: String, required: true },
    Tipo_Documento: {
        type: String, required: true, default: 'CEDULA_DE_CIUDADANIA', enum: ['CEDULA_DE_CIUDADANIA',
            'TARJETA_DE_IDENTIDAD', 'CEDULA_DE_EXTRANJERIA', 'PEP', 'PERMISO_DE_PROTECCION_TEMPORAL']
    },
    Num_Documento: { type: String, required: true, unique: true },
    Email: {
        type: String, required: true, unique: true, validate: {
            validator: (Email) => {
                const expreRegular = /^\w+(\.\w+)?@(soy\.sena\.edu\.co)$/; // Se genero ajuste solo para que funcione el dominio de (Soy.Sena)
                return expreRegular.test(Email);
            },
            message: 'Email is not valid, dominio soy.sena.edu.co',
        },
    },
    Password: { type: String, required: true },
    Rol: { type: String, required: true, enum: ['ADMINISTRADOR', 'INSTRUCTOR', 'FUNCIONARIO'] },
    Active: { type: Boolean, default: true } // se cambio la activacion false por true
});

const UserModel = mongoose.model('user', userShema);
module.exports = UserModel;
