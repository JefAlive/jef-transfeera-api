import request from 'supertest';
import { app } from '../app';
import { describe, expect, test, afterAll, beforeEach } from '@jest/globals';
import prisma from '../../src/prisma';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

function isUuidV4(uuid: string) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4
}

describe('enroll recipients', () => {
  test('create recipient and retrieve in list', async () => {
    const createdResponse = await request(app.callback())
      .post('/recipients')
      .send({
        name: 'Maricleydison Silva',
        federalId: '111.222.333-45',
        pixKey: '111.222.333-45',
        pixKeyType: 'CPF',
        email: 'example@email.com'
      })
      .set('Accept', 'application/json');
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

  afterAll(async () => {
    await prisma.recipient.deleteMany();
    await prisma.$disconnect();
  })
});

/*

Cenários importantes testes de integração:

- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 

*/