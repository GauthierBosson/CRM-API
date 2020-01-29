const fs = require('fs');

const Bill = require('../models/billModel');
const Command = require('../models/commandModel');
const base = require('./baseController');
const { createInvoice } = require('../utils/createInvoice');

exports.createBill = async (req, res, next) => {
  try {
    const doc = await Command.findById(req.params.id)

    if (!doc) {
      return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
    }

    const command = doc;

    const items = []
    command.prestations.map(prestation => {
      let obj = {};

      obj.item = prestation.prestation.name;
      obj.description = 'test';
      obj.quantity = prestation.quantity;
      obj.amount = prestation.prestation.price;

      items.push(obj);
    })

    const invoice = {
      shipping: {
        name: command.client.firstname + ' ' + command.client.lastname,
        address: command.client.address.street,
        city: command.client.address.city,
        state: command.client.address.state,
        country: command.client.address.country,
        postal_code: command.client.address.zip_code
      },
      items: items,
      subtotal: 8000,
      paid: 0,
      invoice_nr: 1234
    };

    const file = createInvoice(invoice, 'testinvoice.pdf');
    file.pipe(fs.createWriteStream('testinvoice.pdf'));
    const stat = fs.statSync('testinvoice.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=testinvoice.pdf');
    file.pipe(res);

  } catch (error) {
    next(error);
  }
}
