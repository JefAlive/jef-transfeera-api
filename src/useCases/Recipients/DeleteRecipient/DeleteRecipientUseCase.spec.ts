import { describe, expect, test, jest } from '@jest/globals';
import { IRecipientsRepository } from 'src/repositories/IRecipientsRepository';
import { DeleteRecipientUseCase } from './DeleteRecipientUseCase';

describe('delete recipient use case', () => {
  let repositoryMock: jest.Mocked<IRecipientsRepository>;
  let useCase: DeleteRecipientUseCase;

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
    useCase = new DeleteRecipientUseCase(repositoryMock);
  })

  test('deletes a recipient', async () => {
    repositoryMock.delete = jest.fn(async (id: string) => {});

    await useCase.execute({
      id: '0750f176-e301-47c5-b592-414b90275872'
    });

    await expect(repositoryMock.delete).toHaveBeenCalledWith('0750f176-e301-47c5-b592-414b90275872');
  });

  test('requires valid uuid', async () => {
    const call = async () => {
      await useCase.execute({
        id: 'invalid-uuid-here'
      });
    };

    await expect(call).rejects.toThrowError('invalid uuid');
    expect(repositoryMock.delete).not.toHaveBeenCalledWith();
  })
});