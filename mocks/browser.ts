import { setupWorker } from 'msw';
import editHandler from './editHandler';
import listPageHandler from './listPageHandler';

export const worker = setupWorker(...editHandler, ...listPageHandler);
