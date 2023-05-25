import express from 'express'
import coursesRouterV1 from './v1/courses-router';
import coursesRouterV2 from './v2/courses-router';

const router = express.Router();

router.use('/', coursesRouterV1)

router.use('/', coursesRouterV2)

export default router