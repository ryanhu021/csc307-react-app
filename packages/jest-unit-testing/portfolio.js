/* eslint-disable max-classes-per-file */
export class ShareSaleException extends Error {
  constructor(message) {
    super(message);
    this.name = "ShareSaleException";
  }
}

export default class Portfolio {
  constructor() {
    this.stocks = new Map();
  }

  purchase = (symbol, shares) => {
    if (this.stocks.has(symbol)) {
      this.stocks.set(symbol, this.stocks.get(symbol) + shares);
    } else {
      this.stocks.set(symbol, shares);
    }
  };

  sell = (symbol, shares) => {
    if (!this.stocks.has(symbol) || this.stocks.get(symbol) < shares) {
      throw new ShareSaleException(`Not enough shares to sell ${symbol}`);
    }
    if (this.stocks.get(symbol) === shares) {
      this.stocks.delete(symbol);
      return;
    }
    this.stocks.set(symbol, this.stocks.get(symbol) - shares);
  };

  getShares = (symbol) =>
    this.stocks.has(symbol) ? this.stocks.get(symbol) : 0;

  isEmpty = () => this.stocks.size === 0;

  getSymbolCount = () => this.stocks.size;
}
