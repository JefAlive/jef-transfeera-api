import { describe, expect, test, jest } from "@jest/globals";
import { IRecipientsRepository } from "src/repositories/IRecipientsRepository";
import { FindRecipientUseCase } from "./FindRecipientUseCase";

describe("find recipient use case", () => {
  let repositoryMock: jest.Mocked<IRecipientsRepository>;
  let useCase: FindRecipientUseCase;

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
    useCase = new FindRecipientUseCase(repositoryMock);
  });

  test("retrieves a recipient", async () => {
    repositoryMock.find = jest.fn(async (id: string) => {
      return {
        id: "0750f176-e301-47c5-b592-414b90275872",
        status: "RASCUNHO",
        email: "exemplo@email.com"
      };
    });

    const recipient = await useCase.execute({
      id: "0750f176-e301-47c5-b592-414b90275872"
    });

    expect(recipient).toEqual({
      id: "0750f176-e301-47c5-b592-414b90275872",
      status: "RASCUNHO",
      email: "exemplo@email.com"
    });
    await expect(repositoryMock.find).toHaveBeenCalledWith("0750f176-e301-47c5-b592-414b90275872");
  });

  test("requires valid uuid", async () => {
    const call = async () => {
      await useCase.execute({
        id: "invalid-uuid-here"
      });
    };

    await expect(call).rejects.toThrowError("invalid uuid");
    expect(repositoryMock.find).not.toHaveBeenCalledWith();
  });
});