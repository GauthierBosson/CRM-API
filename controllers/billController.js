const fs = require('fs');
const replace = require('replace-in-file');

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

    const invoiceNumber = fs.readFileSync('invoiceNum.txt', 'utf-8');

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
      invoice_nr: invoiceNumber
    };

    let invoiceNumberArr = invoiceNumber.split('_');
    invoiceNumberArr[2] = parseInt(invoiceNumberArr[2]) + 1;
    const newInvoiceNumber = invoiceNumberArr.join('_');

    console.log(invoiceNumber);
    console.log(newInvoiceNumber);

    const options = {
      files: 'invoiceNum.txt',
      from: invoiceNumber,
      to: newInvoiceNumber,
    };

    try {
      const results = await replace(options)
      //console.log('Replacement results:', results);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

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
