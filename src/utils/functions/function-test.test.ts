const sum = (a: number, b: number): number => {
  return a + b;
};

describe("Sample Test", () => {
  it("should pass", () => {
    expect(sum(1, 3)).toBe(4);
  });
});
