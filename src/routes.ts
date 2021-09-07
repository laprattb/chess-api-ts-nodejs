import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from './swagger.json';
import bodyParser from 'body-parser'
import * as GameController from './controllers';

const router = Router();

// Game routes
router.post('/api/game', GameController.create);
router.get('/api/game/:gameid', GameController.getGame);
router.get('/api/game/:gameid/move', GameController.getMoves);
router.post('/api/game/:gameid/move', GameController.move);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(apiSpec, {}));

export default router;