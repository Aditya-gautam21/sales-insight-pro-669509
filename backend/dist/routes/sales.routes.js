import { Hono } from 'hono';
import * as salesController from "../controllers/salesController.js";
import catchAsync from "../utils/catchAsync.js";
const salesRoutes = new Hono();
// Research
salesRoutes.post('/research', catchAsync(salesController.generateResearch));
// History
salesRoutes.get('/history', catchAsync(salesController.getHistory));
salesRoutes.delete('/history/:id', catchAsync(salesController.deleteHistory));
salesRoutes.delete('/history', catchAsync(salesController.clearHistory));
// Templates
salesRoutes.get('/templates', catchAsync(salesController.getTemplates));
salesRoutes.get('/templates/suggest', catchAsync(salesController.suggestTemplate));
salesRoutes.post('/templates', catchAsync(salesController.createTemplate));
salesRoutes.delete('/templates/:id', catchAsync(salesController.deleteTemplate));
salesRoutes.patch('/templates/:id', catchAsync(salesController.updateTemplate));
export default salesRoutes;
