export default class CSV extends Array<Array<string | number>> {
  maxCol = 0;

  constructor({ header }: { header: string[] }) {
    super(new Array<string>(1));
    if (header) this.setHeader(header);
  }

  setHeader(head: string[]) {
    this[0] = head;
    this.maxCol = head.length;
  }

  getHeaders() {
    return this[0];
  }

  getLines() {
    return this.slice(1);
  }

  toObject(UpperCaseAfterSapce = true) {
    const headers = this.getHeaders();
    return this.getLines().map((line) => {
      const obj: { [key: string]: string | number } = {};
      headers.forEach((h, i) => {
        h = h.toString();
        // Replace spaces with camel case
        if (UpperCaseAfterSapce)
          h = h.replace(/(\s)(\w)/g, (m, s, w) => w.toUpperCase());
        obj[h] = line[i];
      });
      return obj;
    });
  }

  each(
    header = false,
    callbackfn: (
      value: (string | number)[],
      index: number,
      array: (string | number)[][],
    ) => void,
    thisArg?: any,
  ): void {
    (header ? this : this.slice(1)).forEach(callbackfn, thisArg);
  }

  addLine(line: Array<string | number>, smallerConsideredAsError = true) {
    if (line.length !== this.maxCol && smallerConsideredAsError) {
      throw new Error(
        `CSV: Line length is not equal to header length (line: ${line.length} header: ${this.maxCol})`,
      );
    }
    line.length = this.maxCol;
    this.push(line);
  }

  addSequentially(s: string | number): string | number {
    const lastLine = this[this.length - 1];
    if (lastLine.length >= this.maxCol || this.length === 1) {
      this.push(new Array(0));
      return this.addSequentially(s);
    }
    return lastLine.push(s);
  }

  toString(separator = ';', header = true): string {
    const copy = this.slice(header ? 0 : 1);
    return copy
      .map((c) =>
        c
          .map((e) => (typeof e === 'string' ? '"' + e.trim() + '"' : e))
          .join(separator),
      )
      .join('\r\n');
  }

  toStringEncoded(
    separator = ';',
    rules: { from: RegExp | string; to: string }[],
  ) {
    return this.map((l) =>
      l
        .map((v) => {
          if (typeof v === 'string') {
            rules.forEach(({ from, to }) => {
              v = (v as string).replaceAll(from, to);
            });
          }
          return v;
        })
        .map((e) => (typeof e === 'string' ? '"' + e.trim() + '"' : e)) // Add trailing around string
        .join(separator),
    ) // Add CSV separator
      .join('\r\n'); // Add break line
  }

  clear() {
    this.splice(1);
  }

  static readString(
    csv: string,
    separator = ';',
    headers?: string[],
    smallerConsideredAsError?: boolean,
  ) {
    const lines = csv.split('\r\n').filter((l) => l);
    const csvObj = new CSV({ header: headers || lines[0].split(separator) });
    lines.slice(headers ? 0 : 1).forEach((l) => {
      const line = l.split(separator).filter((l) => l);
      csvObj.addLine(line, smallerConsideredAsError);
    });
    return csvObj;
  }
}
