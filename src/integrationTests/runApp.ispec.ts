import request from "supertest";
import { app } from "../app";
import { describe, expect, test, afterAll } from "@jest/globals";
import prisma from "../../src/prisma";

describe("run app", () => {
  test("should get status ok", async () => {
    const response = await request(app.callback()).get("/status");

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
  });

  afterAll(async () => {
    await prisma.recipient.deleteMany();
    await prisma.$disconnect();
  });
});