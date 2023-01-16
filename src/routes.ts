import Router from "@koa/router";

import { batchDeleteRecipientsController } from './useCases/Recipients/BatchDeleteRecipients';
import { createRecipientController } from './useCases/Recipients/CreateRecipient';
import { deleteRecipientController } from './useCases/Recipients/DeleteRecipient';
import { editRecipientController } from './useCases/Recipients/EditRecipient';
import { findRecipientController } from './useCases/Recipients/FindRecipient';
import { listRecipientsController } from './useCases/Recipients/ListRecipients';

const router = new Router({
  prefix: '/recipients'
})
  .get('/', listRecipientsController.handle)
  .get('/:id', findRecipientController.handle)
  .post('/', createRecipientController.handle)
  .put('/:id', editRecipientController.handle)
  .del('/:id', deleteRecipientController.handle)
  .del('/batch:ids', batchDeleteRecipientsController.handle);

export { router };