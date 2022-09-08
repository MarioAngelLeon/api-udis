
import { Router } from 'express';
import { udisCreate, udisGet } from '../controllers/udis.controller';
import { validateDateMiddleware } from '../middlewares/udi.middleware';

const router = Router();

router.get('/:date', [ validateDateMiddleware ] , udisGet);

router.post('/', udisCreate);


module.exports = router;
