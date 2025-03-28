import { Router } from 'express';

// import all other routers
import v1Routes from "./v1";

const router = Router();

router.use('/v1', v1Routes);

export default router;
