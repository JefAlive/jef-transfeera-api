import { describe, expect, test, jest, beforeAll } from '@jest/globals';
import { EditRecipientUseCase } from './EditRecipientUseCase';
import { PixKeyType } from '../../../../src/entities/Recipient';
import { IRecipientsRepository } from 'src/repositories/IRecipientsRepository';

describe('edit recipient use case', () => {
  let repositoryMock: jest.Mocked<IRecipientsRepository>;
  let useCase: EditRecipientUseCase;
  
  beforeEach(() => {
    repositoryMock = {
      find: jest.fn(async (id: string) => {
        return {
          status: 'RASCUNHO'
        }
      }),
      list: jest.fn(),
      count: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn()
    };
    useCase = new EditRecipientUseCase(repositoryMock);
  })

  test('updates all fields by uuid', async () => {
    await useCase.execute({
      id: '0750f176-e301-47c5-b592-414b90275872',
      name: 'José',
      federalId: '033.077.999-01',
      pixKey: '033.077.999-01',
      pixKeyType: PixKeyType.CPF,
      email: 'example@email.com'
    })

    expect(repositoryMock.update).toHaveBeenCalledWith('0750f176-e301-47c5-b592-414b90275872', {
      id: '0750f176-e301-47c5-b592-414b90275872',
      name: 'José',
      federalId: '033.077.999-01',
      pixKey: '033.077.999-01',
      pixKeyType: PixKeyType.CPF,
      email: 'example@email.com'
    })
  });

  test('requires valid uuid', async () => {
    const call = async () => {
      await useCase.execute({
        id: ''
      });
    };

    await expect(call).rejects.toThrowError('invalid uuid');
    expect(repositoryMock.update).not.toHaveBeenCalledWith();
  })

  test('allows updating only email when is already validated', async () => {
    repositoryMock.find = jest.fn(async (id: string) => {
      return {
        status: 'VALIDADO'
      }
    });

    const call = async () => {
      await useCase.execute({
        id: '0750f176-e301-47c5-b592-414b90275872',
        name: 'José',
      });
    };

    await expect(call).rejects.toThrowError('only allowed to change is email');
    expect(repositoryMock.update).not.toHaveBeenCalledWith();
  })
})