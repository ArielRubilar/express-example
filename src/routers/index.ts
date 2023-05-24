import express from 'express'
import coursesRouterV1 from './v1/courses-router';

const router = express.Router();

router.use('/', coursesRouterV1)

export default router