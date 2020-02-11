const eventController = require('../controllers/eventController');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({
    path: '../config.env'
});

module.exports = async function attachEvent(req, res, next) {
  const token = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
  const model = req.url.split('/')[3];
  try {
    switch(req.method) {
      case 'POST':
        switch(model) {
          case 'categories':
            await eventController.addEvent({ userId: token.id, description: 'Création d\'une catégorie' }, res, next)
            break;
          case 'users':
            await eventController.addEvent({ userId: token.id, description: 'Création d\'un utilisateur' }, res, next)
            break;
          case 'clients':
            await eventController.addEvent({ userId: token.id, description: 'Création d\'un client' }, res, next)
            break;
          case 'prestations':
            await eventController.addEvent({ userId: token.id, description: 'Création d\'une prestation' }, res, next)
            break;
          case 'commands':
            await eventController.addEvent({ userId: token.id, description: 'Création d\'une commande' }, res, next)
            break;
          case 'appointements':
            await eventController.addEvent({ userId: token.id, description: 'Création d\'un rendez-vous' }, res, next)
            break;
          default:
            break;
        }
        break;
      case 'PATCH':
        switch(model) {
          case 'categories':
            await eventController.addEvent({ userId: token.id, description: 'Modification d\'une catégorie' }, res, next)
            break;
          case 'users':
            await eventController.addEvent({ userId: token.id, description: 'Modification d\'un utilisateur' }, res, next)
            break;
          case 'clients':
            await eventController.addEvent({ userId: token.id, description: 'Modification d\'un client' }, res, next)
            break;
          case 'prestations':
            await eventController.addEvent({ userId: token.id, description: 'Modification d\'une prestation' }, res, next)
            break;
          case 'commands':
            await eventController.addEvent({ userId: token.id, description: 'Modification d\'une commande' }, res, next)
            break;
          case 'appointements':
            await eventController.addEvent({ userId: token.id, description: 'Modification d\'un rendez-vous' }, res, next)
            break;
          default:
            break;
        }
        break;
      case 'DELETE':
        switch(model) {
          case 'categories':
            await eventController.addEvent({ userId: token.id, description: 'Suppression d\'une catégorie' }, res, next)
            break;
          case 'users':
            await eventController.addEvent({ userId: token.id, description: 'Suppression d\'un utilisateur' }, res, next)
            break;
          case 'clients':
            await eventController.addEvent({ userId: token.id, description: 'Suppression d\'un client' }, res, next)
            break;
          case 'prestations':
            await eventController.addEvent({ userId: token.id, description: 'Suppression d\'une prestation' }, res, next)
            break;
          case 'commands':
            await eventController.addEvent({ userId: token.id, description: 'Suppression d\'une commande' }, res, next)
            break;
          case 'appointements':
            await eventController.addEvent({ userId: token.id, description: 'Suppression d\'un rendez-vous' }, res, next)
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  } catch(error) {
    next(error);
  }
}
