import { IRecipientsRepository } from "src/repositories/IRecipientsRepository";
import { IListRecipientRequestDTO } from "./ListRecipientsDTO";
import { ListRecipientsUseCase } from "./ListRecipientsUseCase";

describe('list recipients use case', () => {
  let repositoryMock: jest.Mocked<IRecipientsRepository>;
  let useCase: ListRecipientsUseCase;
  function mockPagination(recipients: Array<any>, totalRows: number) {
    repositoryMock.list = jest.fn(
      async (filters: IListRecipientRequestDTO, take: number, skip: number) => {
        return recipients
      }
    );
    repositoryMock.count = jest.fn(
      async (filters: IListRecipientRequestDTO) => {
        return totalRows;
      }
    );
  }

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
    useCase = new ListRecipientsUseCase(repositoryMock);
  })

  test('list recipients > page 1/1, using filters', async () => {
    mockPagination([{}, {}], 2)

    const paginatedRecipients = await useCase.execute({
      page: BigInt(1),
      name: 'José',
      status: 'VALIDADO',
      pixKey: '333.444.555-67',
      pixKeyType: 'CPF'
    });

    expect(repositoryMock.list).toHaveBeenCalledWith({
      page: BigInt(1),
      name: 'José',
      status: 'VALIDADO',
      pixKey: '333.444.555-67',
      pixKeyType: 'CPF'
    }, 10, 0);
    expect(repositoryMock.count).toHaveBeenCalledWith({
      page: BigInt(1),
      name: 'José',
      status: 'VALIDADO',
      pixKey: '333.444.555-67',
      pixKeyType: 'CPF'
    });

    expect(paginatedRecipients.totalRows).toEqual(2);
    expect(paginatedRecipients.totalPages).toEqual(1);
    expect(paginatedRecipients.recipients).toHaveLength(2);
  });

  test('list recipients > page 2/2', async () => {
    mockPagination([{}, {}], 12)

    const paginatedRecipients = await useCase.execute({
      page: BigInt(2)
    });

    expect(repositoryMock.list).toHaveBeenCalledWith({ page: BigInt(2) }, 10, 10);
    expect(repositoryMock.count).toHaveBeenCalledWith({ page: BigInt(2) });

    expect(paginatedRecipients.totalRows).toEqual(12);
    expect(paginatedRecipients.totalPages).toEqual(2);
    expect(paginatedRecipients.recipients).toHaveLength(2);
  });

  test('list recipients > page 1/2', async () => {
    mockPagination([
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    ], 12)

    const paginatedRecipients = await useCase.execute({
      page: BigInt(1)
    });

    expect(repositoryMock.list).toHaveBeenCalledWith({ page: BigInt(1) }, 10, 0);
    expect(repositoryMock.count).toHaveBeenCalledWith({ page: BigInt(1) });

    expect(paginatedRecipients.totalRows).toEqual(12);
    expect(paginatedRecipients.totalPages).toEqual(2);
    expect(paginatedRecipients.recipients).toHaveLength(10);
  });

  test('list recipients > page number zero is invalid', async () => {
    mockPagination([{}], 1)

    const call = async () => {
      await useCase.execute({
        page: BigInt(0)
      });
    }

    await expect(call).rejects.toThrowError('invalid page number, must be at least 1')
    expect(repositoryMock.list).not.toHaveBeenCalled();
    expect(repositoryMock.count).not.toHaveBeenCalled();
  });

  test('list recipients > negative page number is invalid', async () => {
    mockPagination([{}], 1)

    const call = async () => {
      await useCase.execute({
        page: BigInt(-1)
      });
    }

    await expect(call).rejects.toThrowError('invalid page number, must be at least 1')
    expect(repositoryMock.list).not.toHaveBeenCalled();
    expect(repositoryMock.count).not.toHaveBeenCalled();
  });

  test('list recipients > no results', async () => {
    mockPagination([], 0)

    const paginatedRecipients = await useCase.execute({
      page: BigInt(1)
    });

    expect(repositoryMock.list).toHaveBeenCalledWith({ page: BigInt(1) }, 10, 0);
    expect(repositoryMock.count).toHaveBeenCalledWith({ page: BigInt(1) });

    expect(paginatedRecipients.totalRows).toEqual(0);
    expect(paginatedRecipients.totalPages).toEqual(0);
    expect(paginatedRecipients.recipients).toHaveLength(0);
  });

  test('list recipients > exceeded valid page numbers', async () => {
    mockPagination([{}], 49)

    const call = async () => {
      await useCase.execute({
        page: BigInt(6)
      });
    }

    await expect(call).rejects.toThrowError('exceeded valid page numbers, totalPages is 5')
    expect(repositoryMock.count).toHaveBeenCalledWith({ page: BigInt(6) });
    expect(repositoryMock.list).not.toHaveBeenCalled();    
  })
});
