import { describe, expect, test, jest, beforeAll } from '@jest/globals';
import { CreateRecipientUseCase } from './CreateRecipientUseCase';
import { PixKeyType } from '../../../../src/entities/Recipient';
import { IRecipientsRepository } from 'src/repositories/IRecipientsRepository';

describe('create recipient use case', () => {
  let repositoryMock: jest.Mocked<IRecipientsRepository>;
  
  beforeEach(() => {
    repositoryMock = {
      find: jest.fn(),
      list: jest.fn(),
      count: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn()
    };
  })

  test('generates uuid', async () => {
    const useCase = new CreateRecipientUseCase(repositoryMock);
    await useCase.execute({
      name: 'José',
      federalId: '033.077.999-01',
      pixKey: '033.077.999-01',
      pixKeyType: PixKeyType.CPF,
      email: 'example@email.com'
    })

    expect(repositoryMock.save).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'José',
      federalId: '033.077.999-01',
      pixKey: '033.077.999-01',
      pixKeyType: PixKeyType.CPF,
      email: 'example@email.com'
    })
  });
})