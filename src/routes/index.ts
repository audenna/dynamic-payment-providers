import { Router } from 'express';

// import all other routers
import routesV1 from "./v1";

const router = Router();

router.use('/v1', routesV1);

export default router;
