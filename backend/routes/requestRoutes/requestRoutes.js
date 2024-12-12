import express from 'express';
import {sendRequest, acceptRequest, rejectRequest, getRequest} from '../../controllers/requestControllers/requestController.js';

const router = express.Router();

router.post('/new-request', sendRequest);
router.post('/accept-request', acceptRequest);
router.post('/reject-request', rejectRequest);
router.get('/get-allrequest', getRequest);

export default router;