import request from 'supertest';
import { app } from '../app';
import { describe, expect, test, afterAll, afterEach } from '@jest/globals';
import prisma from '../../src/prisma';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import Koa from 'koa';

const sampleRecipients = [
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '111.222.333-45', pixKey: '111.222.333-45', pixKeyType: 'CPF', email: 'example@email.com' }
];

function isUuidV4(uuid: string) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4
}

async function createRecipient(app: Koa<any>, data: Object) {
  return await request(app.callback())
    .post('/recipients')
    .send({
      name: 'Maricleydison Silva',
      federalId: '111.222.333-45',
      pixKey: '111.222.333-45',
      pixKeyType: 'CPF',
      email: 'example@email.com'
    })
    .set('Accept', 'application/json');
}

describe('enroll recipients', () => {
  test('create recipient and retrieve unique recipient by uuid', async () => {
    const createdResponse = await createRecipient(app, {
      name: 'Maricleydison Silva',
      federalId: '111.222.333-45',
      pixKey: '111.222.333-45',
      pixKeyType: 'CPF',
      email: 'example@email.com'
    });
    const id = createdResponse.body.recipient.id;
    expect(createdResponse.status).toBe(201);

    const findResponse = await request(app.callback())
      .get('/recipients/' + id)
      .set('Accept', 'application/json');
    expect(findResponse.status).toBe(200);
    expect(isUuidV4(findResponse.body.recipient.id)).toBeTruthy();
    expect(findResponse.body.recipient.id).toEqual(id);
    expect(findResponse.body.recipient.deleted).toBeFalsy();
    expect(findResponse.body.recipient.createdAt).toBeDefined();
    expect(findResponse.body.recipient.updatedAt).toBeDefined();
    expect(findResponse.body.recipient.name).toEqual('Maricleydison Silva');
    expect(findResponse.body.recipient.federalId).toEqual('111.222.333-45');
    expect(findResponse.body.recipient.pixKey).toEqual('111.222.333-45');
    expect(findResponse.body.recipient.pixKeyType).toEqual('CPF');
    expect(findResponse.body.recipient.email).toEqual('example@email.com');
  })

  test('create recipient and retrieves in list with one page', async () => {
    const createdResponse = await createRecipient(app, {
      name: 'Maricleydison Silva',
      federalId: '111.222.333-45',
      pixKey: '111.222.333-45',
      pixKeyType: 'CPF',
      email: 'example@email.com'
    });
    expect(createdResponse.status).toBe(201);

    const listResponse = await request(app.callback())
      .get('/recipients?page=1')
      .set('Accept', 'application/json');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.recipients).toHaveLength(1);
    expect(listResponse.body.totalRows).toEqual(1);
    expect(listResponse.body.totalPages).toEqual(1);
    expect(isUuidV4(listResponse.body.recipients[0].id)).toBeTruthy();
    expect(listResponse.body.recipients[0].deleted).toBeFalsy();
    expect(listResponse.body.recipients[0].createdAt).toBeDefined();
    expect(listResponse.body.recipients[0].updatedAt).toBeDefined();
    expect(listResponse.body.recipients[0].name).toEqual('Maricleydison Silva');
    expect(listResponse.body.recipients[0].federalId).toEqual('111.222.333-45');
    expect(listResponse.body.recipients[0].pixKey).toEqual('111.222.333-45');
    expect(listResponse.body.recipients[0].pixKeyType).toEqual('CPF');
    expect(listResponse.body.recipients[0].email).toEqual('example@email.com');
  });

  test('create recipients and retrieves in list with two pages', async () => {
    await Promise.all(sampleRecipients.map(recipient => {
      return createRecipient(app, recipient);
    }));
    
    const listResponsePage1 = await request(app.callback())
      .get('/recipients?page=1')
      .set('Accept', 'application/json');
    expect(listResponsePage1.status).toBe(200);
    expect(listResponsePage1.body.recipients).toHaveLength(10);
    expect(listResponsePage1.body.totalRows).toEqual(11);
    expect(listResponsePage1.body.totalPages).toEqual(2);

    const listResponsePage2 = await request(app.callback())
      .get('/recipients?page=2')
      .set('Accept', 'application/json');
    expect(listResponsePage2.status).toBe(200);
    expect(listResponsePage2.body.recipients).toHaveLength(1);
    expect(listResponsePage2.body.totalRows).toEqual(11);
    expect(listResponsePage2.body.totalPages).toEqual(2);
  });

  test('deletes a recipient', async () => {
    const createdResponse = await createRecipient(app, {
      name: 'Maricleydison Silva',
      federalId: '111.222.333-45',
      pixKey: '111.222.333-45',
      pixKeyType: 'CPF',
      email: 'example@email.com'
    });
    const id = createdResponse.body.recipient.id;
    expect(createdResponse.status).toBe(201);

    let listResponse = await request(app.callback())
      .get('/recipients?page=1')
      .set('Accept', 'application/json');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.recipients).toHaveLength(1);
    expect(listResponse.body.totalRows).toEqual(1);
    expect(listResponse.body.totalPages).toEqual(1);

    const deleteResponse = await request(app.callback())
      .delete('/recipients/' + id)
      .set('Accept', 'application/json');
    expect(deleteResponse.status).toBe(200);

    listResponse = await request(app.callback())
      .get('/recipients?page=1')
      .set('Accept', 'application/json');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.recipients).toHaveLength(0);
    expect(listResponse.body.totalRows).toEqual(0);
    expect(listResponse.body.totalPages).toEqual(0);

    const recipientsInDatabase = await prisma.recipient.findMany();
    expect(recipientsInDatabase).toHaveLength(1);
    expect(recipientsInDatabase[0].deleted).toBeTruthy();
  });

  test('batch deletes recipients', async () => {
    const createdResponse1 = await createRecipient(app, sampleRecipients[0]);
    const createdResponse2 = await createRecipient(app, sampleRecipients[1]);
    const id1 = createdResponse1.body.recipient.id;
    const id2 = createdResponse2.body.recipient.id;
    expect(createdResponse1.status).toBe(201);
    expect(createdResponse2.status).toBe(201);

    let listResponse = await request(app.callback())
      .get('/recipients?page=1')
      .set('Accept', 'application/json');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.recipients).toHaveLength(2);
    expect(listResponse.body.totalRows).toEqual(2);
    expect(listResponse.body.totalPages).toEqual(1);

    const batchDeleteResponse = await request(app.callback())
      .post('/recipients/batch-delete')
      .send({
        ids: [id1, id2]
      })
      .set('Accept', 'application/json');
    expect(batchDeleteResponse.status).toBe(200);

    listResponse = await request(app.callback())
      .get('/recipients?page=1')
      .set('Accept', 'application/json');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.recipients).toHaveLength(0);
    expect(listResponse.body.totalRows).toEqual(0);
    expect(listResponse.body.totalPages).toEqual(0);

    const recipientsInDatabase = await prisma.recipient.findMany();
    expect(recipientsInDatabase).toHaveLength(2);
    expect(recipientsInDatabase[0].deleted).toBeTruthy();
    expect(recipientsInDatabase[0].deleted).toBeTruthy();
  });



  afterEach(async () => {
    await prisma.recipient.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

/*

Cenários importantes testes de integração:

- cadastrar sem campos obrigatórios e tomar erro
- cadastrar, forçar status validado no prisma, e tentar editar além do campo email e tomar erro
- cadastrar, forçar status validado no prisma, editar apenas email
- filtrar listagem por cada parâmetro possível
- tentar find, list, delete, delete-batch, edit com uuid inválido

*/