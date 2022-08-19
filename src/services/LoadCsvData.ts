import * as csv from "csv";
import fs from "fs";
import Logger from "../config/logger";
import { CsvDataSet1 } from "../models";

interface RawData {
  "Region/Country/Area": string;
  Year: string;
  "Percentage of individuals using the internet": string;
  Source: string;
}

class LoadCsvData {
  private filename;
  constructor(filename: string) {
    this.filename = filename;
  }

  read = (): Promise<CsvDataSet1[]> => {
    return new Promise((resolve, reject) => {
      try {
        const fileData = fs.readFileSync(this.filename);

        csv.parse(fileData, { columns: true, trim: true }, (err, rows) => {
          // Your CSV data is in an array of arrys passed to this callback as rows.
          if (err) {
            Logger.error(err);
            reject(err);
          } else {
            resolve(
              rows.map((row: RawData) => {
                const {
                  "Region/Country/Area": Area,
                  Year,
                  "Percentage of individuals using the internet": InternetUsage,
                  Source,
                } = { ...row };

                return { Area, Year, InternetUsage, Source };
              })
            );
          }
        });
      } catch (e) {
        Logger.error(e);
        reject(e);
      }
    });
  };
}

export { LoadCsvData };
