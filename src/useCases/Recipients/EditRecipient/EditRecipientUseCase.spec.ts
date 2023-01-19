import { describe, expect, test, jest, beforeAll } from "@jest/globals";
import { EditRecipientUseCase } from "./EditRecipientUseCase";
import { PixKeyType } from "../../../../src/entities/Recipient";
import { IRecipientsRepository } from "src/repositories/IRecipientsRepository";

describe("edit recipient use case", () => {
  let repositoryMock: jest.Mocked<IRecipientsRepository>;
  let useCase: EditRecipientUseCase;

  function mockFindFunction(status: string) {
    repositoryMock.find = jest.fn(async (id: string) => {
      return {
        status: status
      };
    });
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
    useCase = new EditRecipientUseCase(repositoryMock);
  });

  test("updates all fields by uuid", async () => {
    mockFindFunction("RASCUNHO");

    await useCase.execute({
      id: "0750f176-e301-47c5-b592-414b90275872",
      name: "José",
      federalId: "033.077.999-01",
      pixKey: "033.077.999-01",
      pixKeyType: PixKeyType.CPF,
      email: "example@email.com"
    });

    expect(repositoryMock.update).toHaveBeenCalledWith("0750f176-e301-47c5-b592-414b90275872", {
      id: "0750f176-e301-47c5-b592-414b90275872",
      name: "José",
      federalId: "033.077.999-01",
      pixKey: "033.077.999-01",
      pixKeyType: PixKeyType.CPF,
      email: "example@email.com"
    });
  });

  test("requires valid uuid", async () => {
    mockFindFunction("RASCUNHO");

    const call = async () => {
      await useCase.execute({
        id: ""
      });
    };

    await expect(call).rejects.toThrowError("invalid uuid");
    expect(repositoryMock.update).not.toHaveBeenCalledWith();
  });

  test("throws error when trying to update name and already validated", async () => {
    mockFindFunction("VALIDADO");

    const call = async () => {
      await useCase.execute({
        id: "0750f176-e301-47c5-b592-414b90275872",
        name: "José",
      });
    };

    await expect(call).rejects.toThrowError("only allowed to change is email");
    expect(repositoryMock.update).not.toHaveBeenCalledWith();
  });

  test("throws error when trying to update federalId and already validated", async () => {
    mockFindFunction("VALIDADO");

    const call = async () => {
      await useCase.execute({
        id: "0750f176-e301-47c5-b592-414b90275872",
        federalId: "555-444-333-21",
      });
    };

    await expect(call).rejects.toThrowError("only allowed to change is email");
    expect(repositoryMock.update).not.toHaveBeenCalledWith();
  });

  test("throws error when trying to update pixKey and already validated", async () => {
    mockFindFunction("VALIDADO");

    const call = async () => {
      await useCase.execute({
        id: "0750f176-e301-47c5-b592-414b90275872",
        pixKey: "example@email.com",
      });
    };

    await expect(call).rejects.toThrowError("only allowed to change is email");
    expect(repositoryMock.update).not.toHaveBeenCalledWith();
  });

  test("throws error when trying to update pixKeyType and already validated", async () => {
    mockFindFunction("VALIDADO");

    const call = async () => {
      await useCase.execute({
        id: "0750f176-e301-47c5-b592-414b90275872",
        pixKeyType: PixKeyType.CPF,
      });
    };

    await expect(call).rejects.toThrowError("only allowed to change is email");
    expect(repositoryMock.update).not.toHaveBeenCalledWith();
  });

  test("allows updating only email when is already validated", async () => {
    mockFindFunction("VALIDADO");

    await useCase.execute({
      id: "0750f176-e301-47c5-b592-414b90275872",
      email: "example2@email.com",
    });

    expect(repositoryMock.update).toHaveBeenCalledWith("0750f176-e301-47c5-b592-414b90275872", {
      id: "0750f176-e301-47c5-b592-414b90275872",
      email: "example2@email.com",
    });
  });
});