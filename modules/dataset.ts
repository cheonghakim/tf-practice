const fs = require("fs");

type FinalDataTp<T> = {
  [P in keyof T]?: T[P];
};

interface IDataSet {
  //date pre-processing
  dataPreprocessing(): void;
  //dataScrapping
  scrap(): void;
}

export default class DataSet implements IDataSet {
  static makeJson() {
    fs.readFile("./excel.xls", "utf8", (err: Error, res: String) => {
      if (err) return new Error(`${err}`);
      const pattern = /(?<=\<td\>)([1-9]|[1-3][0-9]|4[0-5])(?=\<\/td\>)/g;
      const matched = res.matchAll(pattern);
      const result: string[] = [];
      [...matched].forEach((item) => result.push(item[0]));
      let cycle = 1;
      const obj: FinalDataTp<any> = {}; //타입 수정
      const map = new Map();
      for (let i = 0; i < result.length; i += 6) {
        obj[cycle] = result.slice(i, i + 6).map((item) => {
          const int = parseInt(item, 10);
          if (map.has(int)) {
            const oldValue = map.get(int);
            map.set(int, oldValue + 1);
          } else {
            map.set(int, 1);
          }
          return int;
        });
        cycle += 1;
      }
      obj.statistics = [...map];
      fs.writeFile("./output.json", JSON.stringify(obj), (err: Error) => {
        if (err) return new Error(`${err}`);
        console.log("success");
      });
    });
  }
  dataPreprocessing() {}
  scrap() {}
}
