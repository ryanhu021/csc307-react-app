import Portfolio, { ShareSaleException } from "./portfolio";

describe("Stock Portfolio", () => {
  it("creates empty portfolio on initialization", () => {
    const portfolio = new Portfolio();
    expect(portfolio.stocks.size).toEqual(0);
  });

  it("checks if portfolio is empty", () => {
    const portfolio = new Portfolio();
    expect(portfolio.isEmpty()).toEqual(true);
  });

  it("returns count of symbols in portfolio", () => {
    const portfolio = new Portfolio();
    portfolio.stocks.set("GME", 5);
    portfolio.stocks.set("RBLX", 10);
    expect(portfolio.getSymbolCount()).toEqual(2);
  });

  describe("purchases", () => {
    it("adds new stock", () => {
      const portfolio = new Portfolio();
      portfolio.purchase("GME", 5);
      expect(portfolio.stocks.get("GME")).toEqual(5);
    });

    it("adds shares to existing stock", () => {
      const portfolio = new Portfolio();
      portfolio.stocks.set("GME", 5);
      portfolio.purchase("GME", 5);
      expect(portfolio.stocks.get("GME")).toEqual(10);
    });
  });

  describe("sales", () => {
    it("subtracts shares from existing stock", () => {
      const portfolio = new Portfolio();
      portfolio.stocks.set("GME", 5);
      portfolio.sell("GME", 3);
      expect(portfolio.stocks.get("GME")).toEqual(2);
    });

    it("removes stock when all shares are sold", () => {
      const portfolio = new Portfolio();
      portfolio.stocks.set("GME", 5);
      portfolio.sell("GME", 5);
      expect(portfolio.stocks.has("GME")).toBeFalsy();
    });

    it("throws error when selling more shares than owned", () => {
      const portfolio = new Portfolio();
      portfolio.stocks.set("GME", 5);
      expect(() => portfolio.sell("GME", 10)).toThrow(
        new ShareSaleException("Not enough shares to sell GME"),
      );
    });

    it("throws error when selling shares of a stock not owned", () => {
      const portfolio = new Portfolio();
      expect(() => portfolio.sell("GME", 10)).toThrow(
        new ShareSaleException("Not enough shares to sell GME"),
      );
    });
  });

  it("gets shares for a symbol", () => {
    const portfolio = new Portfolio();
    portfolio.stocks.set("GME", 5);
    expect(portfolio.getShares("GME")).toEqual(5);
  });

  it("returns 0 shares for a symbol not owned", () => {
    const portfolio = new Portfolio();
    expect(portfolio.getShares("GME")).toEqual(0);
  });
});
