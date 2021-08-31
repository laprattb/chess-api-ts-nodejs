import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from './swagger.json';
import bodyParser from 'body-parser'

import * as GameController from './controllers/game';
import * as MoveController from './controllers/move';

const swaggerUiOptions = {
    //customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();
// const jsonParser = bodyParser.json();
// const urlEncodedParser = bodyParser.urlencoded({ extended: true });

// Game routes
router.post('/api/game', GameController.create);
//router.post('/api/game', urlEncodedParser, GameController.create);
//router.get('/api/game', urlEncodedParser, GameController.getState);

// Move routes
// router.post('/api/move', urlEncodedParser, MoveController.move);
// router.get('/api/move', urlEncodedParser, MoveController.getMoves);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));

export default router;