const service = require('../../../services/player-service');
const RestController = require('../../../lib/rest-controller');

module.exports = router => {
  router.get('/', (req, res) => RestController.findPaginated(req, res, service));

  router.get('/all', (req, res) => RestController.findAll(req, res, service));

  router.post('/', (req, res) => RestController.create(req, res, service));

  router.get('/:id', (req, res) => {
    return RestController.findById(req, res, service);
  });

  router.put('/:id', (req, res) => RestController.update(req, res, service));
  router.put('/activate/:id', (req, res) => RestController.activate(req, res, service));

  router.delete('/:id', (req, res) => RestController.delete(req, res, service));
};
