#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const symbols = require('log-symbols');
/**
 * json文件格式化
 * @param folder
 * @param name
 */
module.exports = (folder, name) => {

  const fileName = `${folder}/` + name + `.json`;
  console.log(symbols.success, fileName);
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName).toString();
    let formatter;//=content.replace(/\'/g,"\"")
    formatter = content.replace(/\s*/g, "");
    formatter = formatter.replace(/\'/g, "");
    //添加双引号
    formatter = formatter.replace(/(?<!(https|http)):/g, "\":\"");
    formatter = formatter.replace(/\,/g, "\"\,\"");
    formatter = formatter.replace(/\{(?!\[)/g, "\{\"");
    formatter = formatter.replace(/(?<!\])\}\"*/g, "\"\}");

    //清理连续双引号
    formatter = formatter.replace(/\"+/g, "\"");
    // console.log(symbols.success, formatter);

    //删除双引号
    formatter = formatter.replace(/\"\{/g, "\{");
    formatter = formatter.replace(/\"\[/g, "\[");
    formatter = formatter.replace(/\}\"/g, "\}");
    formatter = formatter.replace(/\]\"/g, "\]");

    formatter = formatter.replace(/\"+/g, "\"");

    // console.log(symbols.success, formatter);
    //解析json
    let contentGn = JSON.parse(formatter);

    //定义展示格式
    const result = JSON.stringify(contentGn, null, 2);
    fs.writeFileSync(fileName, result);
    console.log(symbols.success, chalk.yellowBright("重写json 文件"));
  }
  // })
}
