// @ts-nocheck
import { test, expect, beforeEach, afterEach, vi } from "vitest";
import { fakeFetch } from "./req.js";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("responds with data", async () => {
  const responsePromise = fakeFetch("http://bbc.co.uk");
  const fakeFunction = vi.fn();
  fakeFunction.mockReturnValue("Hello");
  fakeFunction();
  expect(fakeFunction).toHaveBeenCalled();
  vi.runAllTimers();
  const response = await responsePromise;
  expect(Buffer.isBuffer(response)).toBe(true);
  expect(response.toString()).toMatchInlineSnapshot(`"some other data!!!"`);
});

test("unhappy path for fakeFetch", async () => {
  const responsePromise = fakeFetch("http://error.com");

  vi.runAllTimers();
  await expect(responsePromise).rejects.toThrow();
  try {
    const responsePromise = fakeFetch("http://error.com");
    vi.runAllTimers();
    await expect(responsePromise).rejects.toThrow("network error");
    vi.runAllTimers();
    const response = await responsePromise;
  } catch (error) {
    expect(error).toBeDefined();
    expect(error).toMatchInlineSnapshot(`[Error: network error]`);
  }
});
