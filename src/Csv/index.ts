export default class CSV extends Array<Array<string | number>> {
  maxCol = 0;

  /**
   * Create a CSV object
   * @param header - The header of the CSV
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   */
  constructor({ header }: { header: string[] }) {
    super(new Array<string>(1));
    if (header) this.setHeader(header);
  }

  /**
   * Set the header of the CSV
   * @param head - The header of the CSV
   */
  setHeader(head: string[]) {
    this[0] = head;
    this.maxCol = head.length;
  }

  /**
   * Get the header of the CSV
   * @returns The header of the CSV
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   * csv.getHeaders(); // Output: ['First Name', 'Last Name']
   */
  getHeaders() {
    return this[0];
  }

  /**
   * Get the lines of the CSV
   * @returns The lines of the CSV
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   * csv.addLine(['John', 'Doe']);
   * csv.addLine(['Jane', 'Doe']);
   * csv.getLines(); // Output: [['John', 'Doe'], ['Jane', 'Doe']]
   */
  getLines() {
    return this.slice(1);
  }

  /**
   * Convert the CSV to an array of objects
   * @param UpperCaseAfterSapce - If true, the first letter after a space will be upper case
   * @returns An array of objects
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   * csv.addLine(['John', 'Doe']);
   * csv.addLine(['Jane', 'Doe']);
   * csv.toObject(); // Output: [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Jane', lastName: 'Doe' }]
   */
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

  /**
   * Work like Array.forEach
   * @param header - If true, the header will be included (default: false)
   * @param callbackfn - A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
   * @param thisArg - An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   * csv.addLine(['John', 'Doe']);
   * csv.addLine(['Jane', 'Doe']);
   * csv.each((line, index) => {
   *  console.log(line); // Output: ['John', 'Doe'] and ['Jane', 'Doe']
   * });
   */
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

  /**
   *
   * @param line - The line to add
   * @param smallerConsideredAsError - If true, the line length must be equal to the header length (default: true)
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   * csv.addLine(['John', 'Doe']);
   * csv.addLine(['Jane', 'Doe'], false); // No error
   * csv.addLine(['Jane', 'Doe', 'Doe']); // Error
   */
  addLine(line: Array<string | number>, smallerConsideredAsError = true) {
    if (line.length !== this.maxCol && smallerConsideredAsError) {
      throw new Error(
        `CSV: Line length is not equal to header length (line: ${line.length} header: ${this.maxCol})`,
      );
    }
    line.length = this.maxCol;
    this.push(line);
  }

  /**
   * Add a string or number to the CSV sequentially
   * @param s - The string or number to add
   * @returns The added string or number
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   * csv.addSequentially('John');
   * csv.addSequentially('Doe');
   * csv.addSequentially('Jane');
   * csv.addSequentially('Doe');
   * csv.toObject(); // Output: [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Jane', lastName: 'Doe' }]
   */
  addSequentially(s: string | number): string | number {
    const lastLine = this[this.length - 1];
    if (lastLine.length >= this.maxCol || this.length === 1) {
      this.push(new Array(0));
      return this.addSequentially(s);
    }
    return lastLine.push(s);
  }

  /**
   * Convert the CSV to a string with break lines and separators
   * @param separator
   * @param header
   * @returns A string
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   * csv.addLine(['John', 'Doe']);
   * csv.addLine(['Jane', 'Doe']);
   * csv.toString(); // Output: "First Name";"Last Name"\r\n"John";"Doe"\r\n"Jane";"Doe"
   */

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

  /**
   * Convert the CSV to a string with break lines and separators
   * @param separator
   * @param rules - An array of rules to apply to the CSV
   * @returns A string
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   * csv.addLine(['John', 'Doe']);
   * csv.toStringEncoded(';', [{ from: ' ', to: '_' }]); // Output: "First_Name";"Last_Name"\r\n"John";"Doe"
   */
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

  /**
   * Clear the CSV (remove all lines) but keep the header
   * @example
   * const csv = new CSV({ header: ['First Name', 'Last Name'] });
   * csv.addLine(['John', 'Doe']);
   * csv.clear();
   * csv.toObject(); // Output: []
   * csv.getHeaders(); // Output: ['First Name', 'Last Name']
   */
  clear() {
    this.splice(1);
  }

  /**
   * Read a CSV string and return a CSV object
   * @param csv - The CSV string
   * @param separator - The separator of the CSV (default: ';')
   * @param headers - Custom headers (default: first line)
   * @param smallerConsideredAsError - If true, the line length must be equal to the header length (default: true)
   * @returns A CSV object
   * @example
   * const csv = CSV.readString('First Name;Last Name\r\nJohn;Doe\r\nJane;Doe');
   * csv.toObject(); // Output: [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Jane', lastName: 'Doe' }]
   * csv.getHeaders(); // Output: ['First Name', 'Last Name']
   */
  static readString(
    csv: string,
    separator = ';',
    headers?: string[],
    smallerConsideredAsError?: boolean,
  ) {
    const lines = csv.split('\r\n').filter((l) => l);
    const csvObj = new CSV({ header: headers || lines[0].split(separator) });
    lines.slice(headers ? 0 : 1).forEach((l) => {
      const line = l.split(separator);
      csvObj.addLine(line, smallerConsideredAsError);
    });
    return csvObj;
  }
}
