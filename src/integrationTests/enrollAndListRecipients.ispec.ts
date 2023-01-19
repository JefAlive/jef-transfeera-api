import request from 'supertest';
import { app } from '../app';
import { describe, expect, test, afterAll, afterEach } from '@jest/globals';
import prisma from '../../src/prisma';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import Koa from 'koa';

const sampleRecipients = [
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' },
  { name: 'Maricleydison Silva', federalId: '893.512.450-80', pixKey: '893.512.450-80', pixKeyType: 'CPF', email: 'example@email.com' }
];

function isUuidV4(uuid: string) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4
}

async function createRecipient(app: Koa<any>, data: Object) {
  return await request(app.callback())
    .post('/recipients')
    .send(data)
    .set('Accept', 'application/json');
}

describe('enroll recipients', () => {
  test('create recipient and retrieve unique recipient by uuid', async () => {
    const createdResponse = await createRecipient(app, {
      name: 'Maricleydison Silva Business LTDA',
      federalId: '48.686.965/0001-06',
      pixKey: '893.512.450-80',
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
    expect(findResponse.body.recipient.name).toEqual('Maricleydison Silva Business LTDA');
    expect(findResponse.body.recipient.federalId).toEqual('48.686.965/0001-06');
    expect(findResponse.body.recipient.personNature).toEqual('LEGAL');
    expect(findResponse.body.recipient.pixKey).toEqual('893.512.450-80');
    expect(findResponse.body.recipient.pixKeyType).toEqual('CPF');
    expect(findResponse.body.recipient.email).toEqual('example@email.com');
    expect(findResponse.body.recipient.status).toEqual('RASCUNHO');
  })

  test('create recipient and retrieves in list with one page', async () => {
    const createdResponse = await createRecipient(app, {
      name: 'Maricleydison Silva',
      federalId: '893.512.450-80',
      pixKey: '893.512.450-80',
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
    expect(listResponse.body.recipients[0].federalId).toEqual('893.512.450-80');
    expect(listResponse.body.recipients[0].personNature).toEqual('NATURAL');
    expect(listResponse.body.recipients[0].pixKey).toEqual('893.512.450-80');
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
      federalId: '893.512.450-80',
      pixKey: '893.512.450-80',
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

  test('edits a recipient', async () => {
    const createdResponse = await createRecipient(app, {
      name: 'Maricleydison Silva',
      federalId: '893.512.450-80',
      pixKey: '893.512.450-80',
      pixKeyType: 'CPF',
      email: 'example@email.com'
    });
    const id = createdResponse.body.recipient.id;
    expect(createdResponse.status).toBe(201);

    const editResponse = await request(app.callback())
      .put('/recipients/' + id)
      .send({
        email: 'example2@email.com'
      })
      .set('Accept', 'application/json');
    expect(editResponse.status).toBe(200);

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
    expect(findResponse.body.recipient.federalId).toEqual('893.512.450-80');
    expect(findResponse.body.recipient.personNature).toEqual('NATURAL');
    expect(findResponse.body.recipient.pixKey).toEqual('893.512.450-80');
    expect(findResponse.body.recipient.pixKeyType).toEqual('CPF');
    expect(findResponse.body.recipient.email).toEqual('example2@email.com');
    expect(findResponse.body.recipient.status).toEqual('RASCUNHO');
  });

  test('edits a validated recipient allows to change email', async () => {
    const createdResponse = await createRecipient(app, {
      name: 'Maricleydison Silva',
      federalId: '893.512.450-80',
      pixKey: '893.512.450-80',
      pixKeyType: 'CPF',
      email: 'example@email.com'
    });
    const id = createdResponse.body.recipient.id;
    expect(createdResponse.status).toBe(201);

    await prisma.recipient.update({
      where: {
        id: id
      },
      data: {
        status: 'VALIDADO'
      }
    });

    const editResponse = await request(app.callback())
      .put('/recipients/' + id)
      .send({
        email: 'example2@email.com'
      })
      .set('Accept', 'application/json');
    expect(editResponse.status).toBe(200);

    const findResponse = await request(app.callback())
      .get('/recipients/' + id)
      .set('Accept', 'application/json');
    expect(findResponse.status).toBe(200);
    expect(findResponse.body.recipient.id).toEqual(id);
    expect(findResponse.body.recipient.email).toEqual('example2@email.com');
    expect(findResponse.body.recipient.status).toEqual('VALIDADO');
  });

  test('edits a validated recipient throws error when try to change other fields', async () => {
    const createdResponse = await createRecipient(app, {
      name: 'Maricleydison Silva',
      federalId: '893.512.450-80',
      pixKey: '893.512.450-80',
      pixKeyType: 'CPF',
      email: 'example@email.com'
    });
    const id = createdResponse.body.recipient.id;
    expect(createdResponse.status).toBe(201);

    await prisma.recipient.update({
      where: {
        id: id
      },
      data: {
        status: 'VALIDADO'
      }
    });

    const editResponse1 = await request(app.callback())
      .put('/recipients/' + id)
      .send({
        name: 'Zequinha'
      })
      .set('Accept', 'application/json');
    expect(editResponse1.status).toEqual(400);

    const editResponse2 = await request(app.callback())
      .put('/recipients/' + id)
      .send({
        federalId: '236.289.590-47'
      })
      .set('Accept', 'application/json');
    expect(editResponse2.status).toEqual(400);

    const editResponse3 = await request(app.callback())
      .put('/recipients/' + id)
      .send({
        pixKey: '236.289.590-47'
      })
      .set('Accept', 'application/json');
    expect(editResponse3.status).toEqual(400);

    const editResponse4 = await request(app.callback())
      .put('/recipients/' + id)
      .send({
        pixKeyType: 'CHAVE_ALEATORIA'
      })
      .set('Accept', 'application/json');
    expect(editResponse4.status).toEqual(400);

    const findResponse = await request(app.callback())
      .get('/recipients/' + id)
      .set('Accept', 'application/json');
    expect(findResponse.status).toBe(200);
    expect(findResponse.body.recipient.id).toEqual(id);
    expect(findResponse.body.recipient.email).toEqual('example@email.com');
    expect(findResponse.body.recipient.status).toEqual('VALIDADO');
  });

  test('', async () => {

  });

  test('', async () => {

  });

  beforeEach(async () => {
    await prisma.recipient.deleteMany();
  });

  afterEach(async () => {
    await prisma.recipient.deleteMany();
  });

  beforeAll(async () => {
    await prisma.$connect();
    app.silent = true;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

/*

Cenários importantes testes de integração:

- cadastrar sem campos obrigatórios e tomar erro
- filtrar listagem por cada parâmetro possível
- tentar find, list, delete, delete-batch, edit com uuid inválido

*/