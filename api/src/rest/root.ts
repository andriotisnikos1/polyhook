import express from 'express';
import dev from './dev/dev.js';

const root = express.Router();

root.use("/dev", dev)

export default root;
