import mut from "./module";

describe("sum function", () => {
  it("integer addition", () => {
    const expected = 30;
    const got = mut.sum(12, 18);
    expect(got).toBe(expected);
  });

  it("float addition", () => {
    const expected = 10.35;
    const got = mut.sum(10, 0.35);
    expect(got).toBeCloseTo(expected);
  });
});

describe("div function", () => {
  it("integer division", () => {
    const expected = 3;
    const got = mut.div(30, 10);
    expect(got).toBe(expected);
  });

  it("float division", () => {
    const expected = 10 / 3;
    const got = mut.div(10, 3);
    expect(got).toBeCloseTo(expected);
  });

  it("divide by zero", () => {
    const expected = Infinity;
    const got = mut.div(30, 0);
    expect(got).toBe(expected);
  });
});

describe("containsNumbers function", () => {
  it("mixed characters", () => {
    const expected = true;
    const got = mut.containsNumbers("abc123");
    expect(got).toBe(expected);
  });

  it("only numbers", () => {
    const expected = true;
    const got = mut.containsNumbers("1234567890");
    expect(got).toBe(expected);
  });

  it("only letters", () => {
    const expected = false;
    const got = mut.containsNumbers("abcdefghijklmnopqrstuvwxyz");
    expect(got).toBe(expected);
  });

  it("special characters", () => {
    const expected = false;
    const got = mut.containsNumbers("!@#$%^&*()_+-=[]{};':\",./<>?");
    expect(got).toBe(expected);
  });

  // it("space", () => {
  //   const expected = false;
  //   const got = mut.containsNumbers(" ");
  //   expect(got).toBe(expected);
  // });

  it("empty string", () => {
    const expected = false;
    const got = mut.containsNumbers("");
    expect(got).toBe(expected);
  });

  it("space", () => {
    const expected = false;
    const got = mut.containsNumbers(" ");
    expect(got).toBe(expected);
  });

  it("infinity", () => {
    const expected = false;
    const got = mut.containsNumbers("Infinity");
    expect(got).toBe(expected);
  });

  it("NaN", () => {
    const expected = false;
    const got = mut.containsNumbers("NaN");
    expect(got).toBe(expected);
  });
});
