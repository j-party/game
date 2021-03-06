//
// Service for parsing the database text file.
//
export interface DatabaseRow {
  [key: string]: any,
  done?: boolean,
  total?: number,

  // database columns:
  answer?: string,
  categoryId?: string,
  clue?: string,
  id?: string,
  level?: string,
  name?: string,
};

export class DatabaseParser {
  parseList(text: string, callback: Function) {
    let rowCountLine = 0;
    let headerLine = 1;

    // Split it out by rows.
    let rows = text.split(/[\r\n]+/);

    // Send the count.
    let count = rows[rowCountLine];
    callback({ total: count });

    // Parse the rows into columns.
    let parsedRow: DatabaseRow;
    let header = rows[headerLine].split('|');
    for (let i = headerLine + 1; i < rows.length; i++) {
      if (rows[i].indexOf('|') === -1) { continue; }
      parsedRow = {};
      let cols = rows[i].split('|');
      for (let j = 0; j < cols.length; j++) {
        parsedRow[header[j]] = cols[j];
      }
      callback(parsedRow);
    }

    // Send the "done" message.
    callback({ done: true });
  }
};
