#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');//对文件进行重写或者内容添加
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const initInfo =require('../config/initinfo');

module.exports = (name) => {
  if (!fs.existsSync(name)) {
    inquirer.prompt(initInfo.projectinfo).then((answers) => {
      const spinner = ora('正在下载模板...');
      spinner.start();
      download(initInfo.downGitHubUrl, name, {clone: true}, (err) => {
        if (err) {
          spinner.fail();
          console.log(symbols.error, chalk.red(err));
        } else {
          spinner.succeed();
          const fileName = `${name}/package.json`;
          const meta = {
            name,
            description: answers.description,
            author: answers.author
          }
          if (fs.existsSync(fileName)) {
            const content = fs.readFileSync(fileName).toString();
            //重定义文件内容
            let contentGn = JSON.parse(content);
            //新增属性
            contentGn.name = '{{name}}';
            contentGn.author = '{{author}}';
            contentGn.description = '{{description}}';
            //替换对应属性值
            const result = handlebars.compile(JSON.stringify(contentGn,null,2))(meta);
            fs.writeFileSync(fileName, result);
            console.log(symbols.success, chalk.yellowBright("重写package.json"));
          }
          console.log(symbols.success, chalk.green('项目初始化完成'));
        }
      })
    })
  } else {
    console.log(symbols.error, name);
    // 错误提示项目已存在，避免覆盖原有项目
    console.log(symbols.error, chalk.red('项目已存在'));
  }
}
