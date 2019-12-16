#!/usr/bin/env node
// import {promptList} from './filetype';
const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const path = require('path')
const promptList = require('../config/foldertype').promptList;

module.exports = (name) => {
  inquirer.prompt(promptList).then((answers) => {
    //目标文件夹
    const outputPath = `src/app/` + answers.type + `/${name}`;
    //该文件所在文件夹父级目录
    const abPath = path.resolve(__dirname, '..');
    //获取添加模板所在路径
    const fromPath = abPath + `/template/` + answers.type + `/${name}`;

    if (!fs.existsSync(outputPath)) {
      console.log(symbols.info, `正在生成` + answers.type + `...`);
      if (fs.existsSync(fromPath)) {//复制文件是否存在，模板是否存在
        const spinner = ora('正在生成模板...');
        spinner.start();
        console.log('')
        copyFolder(fromPath, outputPath).then((value) => {
          console.log(symbols.success,value)
          spinner.succeed('生成项目完成');
        }).catch((error) => {
          console.log(symbols.error,error)
          spinner.fail("项目生成异常");
          throw error;
        })
      } else {
        console.log(symbols.error, chalk.red('引用项目路径' + fromPath + '不存在'));
        console.log(symbols.error, chalk.red('生成项目失败'));
      }

    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red('项目已存在'));
    }
  })
};

/**
 * 复制指定目录--同步复制
 * @param from
 * @param to
 * @returns {Promise<*>}
 */
const copyFolder = (from, to) => {        // 复制文件夹到指定目录
  return new Promise(function (resolve, reject) {
    try {
      let files = [];
      if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
        files = fs.readdirSync(from);
        files.forEach(function (file, index) {//抛出异常或错误中段循环
          let targetPath = from + "/" + file;
          let toPath = to + '/' + file;
          if (fs.statSync(targetPath).isDirectory()) { //判断是否是文件夹
            copyFolder(targetPath, toPath).catch((error) => {
              reject(error)
            });
          } else {                                    // 拷贝文件
            console.log(symbols.info,chalk.green("复制文件:"+toPath));
            // if(index==3){ 模拟异常
            //   throw 'error';
            // }
            fs.copyFileSync(targetPath, toPath);
          }
        })
        console.log(symbols.info,from+"文件生成完成");
        resolve("true");

      } else {
        console.log(symbols.info,"生成文件夹"+to);
        fs.mkdirSync(to);
        copyFolder(from, to).then((value)=> resolve("复制"+from+"内容完成")).catch((error) => {
          reject(error)
        });
      }
    } catch (error) {
      reject(error)
    }
  })

};
