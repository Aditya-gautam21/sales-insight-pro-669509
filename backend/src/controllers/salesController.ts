import { Context } from 'hono';
import * as salesService from '../services/salesService.ts';

export const generateResearch = async (c: Context) => {
  const input = await c.req.json();
  const result = await salesService.generateResearch(input);
  return c.json(result);
};

export const getHistory = async (c: Context) => {
  const history = await salesService.getHistory();
  return c.json({ history });
};

export const deleteHistory = async (c: Context) => {
  const id = c.req.param('id');
  await salesService.deleteHistory(id);
  return c.json({ message: 'History entry deleted' });
};

export const clearHistory = async (c: Context) => {
  await salesService.clearHistory();
  return c.json({ message: 'All history cleared' });
};

export const getTemplates = async (c: Context) => {
  const templates = await salesService.getTemplates();
  return c.json({ templates });
};

export const suggestTemplate = async (c: Context) => {
  const template = await salesService.suggestTemplate();
  return c.json(template);
};

export const createTemplate = async (c: Context) => {
  const { name, input } = await c.req.json();
  const template = await salesService.createTemplate(name, input);
  return c.json(template);
};

export const deleteTemplate = async (c: Context) => {
  const id = c.req.param('id');
  await salesService.deleteTemplate(id);
  return c.json({ message: 'Template deleted' });
};

export const updateTemplate = async (c: Context) => {
  const id = c.req.param('id');
  const data = await c.req.json();
  const template = await salesService.updateTemplate(id, data);
  return c.json(template);
};
