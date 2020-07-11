const express = require('express');
const app = express();
const _ = require('underscore')
const Impresora = require('../models/impresora');

app.get('/impresora', (req, res) => {

    Impresora.find({})
        .limit(5)
        .exec((err, impresoras) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                impresoras
            });
        })
});

app.post('/impresora', (req, res) => {
    let body = req.body;
    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        ip: body.ip,
        contador: body.contador,
        precio: body.precio
    });
    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            impresora: impresoraDB
        });
    });
});

app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['modelo', 'color', 'ip', 'precio']);

    Impresora.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!impresoraDB) {
            res.json({
                ok: false,
                err: {
                    message: "Impresora no encontrado"
                }
            })

        } else {
            res.json({
                ok: true,
                impresora: impresoraDB
            });
        }
    })

});

app.delete('/impresora/:id', (req, res) => {
    let id = req.params.id;
    Impresora.findByIdAndDelete(id, (err, impresoraEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!impresoraEliminado) {
            res.json({
                ok: false,
                err: {
                    message: "Impresora no encontrado"
                }
            })

        } else {
            res.json({
                ok: true,
                impresora: impresoraEliminado
            });
        }


    })
});

module.exports = app;