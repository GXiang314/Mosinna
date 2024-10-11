import express from 'express'
import emojis from './emojis'
import service from './service'

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/service', service)

export default router;
