import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { IRecipientsRepository } from "src/repositories/IRecipientsRepository";
import { BatchDeleteRecipientsUseCase } from "./BatchDeleteRecipientsUseCase";

describe("batch delete recipient use case", () => {
  let repositoryMock: jest.Mocked<IRecipientsRepository>;
  let useCase: BatchDeleteRecipientsUseCase;

  beforeEach(() => {
    repositoryMock = {
      find: jest.fn(),
      list: jest.fn(),
      count: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(async (ids: Array<string>) => {})
    };
    useCase = new BatchDeleteRecipientsUseCase(repositoryMock);
  });

  test("batch delete a recipient", async () => {
    await useCase.execute({
      ids: ["0750f176-e301-47c5-b592-414b90275872"]
    });

    expect(repositoryMock.deleteMany).toHaveBeenCalledWith(["0750f176-e301-47c5-b592-414b90275872"]);
  });

  test("batch delete many recipients", async () => {
    await useCase.execute({
      ids: [
        "0750f176-e301-47c5-b592-414b90275872",
        "5cc79132-01e1-4a0d-85ea-e84b2671b0aa",
        "9eb6c65e-c897-4977-b0ef-f9f1cdaf81e5"
      ]
    });

    expect(repositoryMock.deleteMany).toHaveBeenCalledWith(expect.arrayContaining([
      "0750f176-e301-47c5-b592-414b90275872",
      "5cc79132-01e1-4a0d-85ea-e84b2671b0aa",
      "9eb6c65e-c897-4977-b0ef-f9f1cdaf81e5"
    ]));
  });

  test("requires valid uuid", async () => {
    const call = async () => {
      await useCase.execute({
        ids: [
          "0750f176-e301-47c5-b592-414b902",
          "5cc79132-01e1-4a0d-85ea-e84b2671b0aa",
          "9eb6c65e-c897-4977-b0ef-f9f1cdaf81e5"
        ]
      });
    };

    await expect(call).rejects.toThrowError("invalid uuid");
    expect(repositoryMock.deleteMany).not.toHaveBeenCalledWith();
  });
});