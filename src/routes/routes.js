const { Router } = require('express');
const UserController = require('../controllers/UserController');
const EventController = require('../controllers/EventController');

const router = Router();

// Rotas de Usuários
router.get('/users/listUsersByAge', UserController.listUsersByAge);
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);

// Rotas de Eventos
router.get('/users/getUserEvents/:id', UserController.getUserEvents);
router.get('/events/getMostRatedEvents/:id', 
								EventController.getMostRatedEvents);
router.get('/events/searchEventByTitle', EventController.searchEventByTitle);
router.get('/events', EventController.index);
router.get('/events/:id', EventController.show);
router.post('/events', EventController.create);
router.put('/events/:id', EventController.update);
router.delete('/events/:id', EventController.destroy)

module.exports = router;