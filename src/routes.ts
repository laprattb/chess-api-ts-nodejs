import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from './swagger.json';

import * as GameController from './controllers/game';
import * as MoveController from './controllers/move';

const swaggerUiOptions = {
    //customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Game routes
router.post('/api/game', GameController.create);
router.get('/api/game', GameController.getState);

// Move routes
router.post('/api/move', MoveController.move);
router.get('/api/move', MoveController.getMoves);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));

export default router;