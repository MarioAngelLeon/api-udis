
import { Router } from 'express';
import { udisCreate, udisGet } from '../controllers/udis.controller';

const router = Router();

router.get('/:date', udisGet);

router.post('/', udisCreate);


module.exports = router;
