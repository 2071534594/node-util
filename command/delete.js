#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const promptList =require('../config/foldertype').promptList;

module.exports = (name) => {
  inquirer.prompt(promptList).then((answers) => {
    //目标文件夹
    const filePath = process.cwd() + `/src/app/` + answers.type + `/${name}`;
    const spinner = ora(`正在删除` + answers.type + `文件夹中的${name} 文件夹...`);
    spinner.start();
    console.log('');
    // console.log(symbols.success, abPath);
    delDir(filePath).then((value)=>{
      console.log(symbols.success,value)
      spinner.succeed("删除项目成功");
    }).catch((error)=>{
      console.log(symbols.error,error)
      spinner.fail("删除项目异常");
      // throw error;
    });
  })
}

/**
 * 删除指定目录--同步
 * @param delPath
 * @returns {Promise<void>}
 */
const delDir = (delPath) => {        // 删除指定目录
  console.log(symbols.info,"删除文件夹:"+delPath);
  return new Promise(function(resolve, reject) {
    try{
      if (!fs.existsSync(delPath)) {// 文件夹是否存在 如果不存则返回
        // 错误提示项目已存在，避免覆盖原有项目
        console.log(symbols.error, chalk.red('删除项目不存在,请注意命令执行路径'));
        reject("err");
      }
      let files = fs.readdirSync(delPath);//获取删除文件夹中的列表
      if(files.length>0){
        files.forEach(function (file, index){
          let targetPath = delPath + "/" + file;
          if (fs.statSync(targetPath).isDirectory()) { //判断是否是文件夹
            delDir(targetPath).catch((err)=>{
              reject(err);
            });
          } else {
            // if(index==2){ 模拟删除失败
            //   throw '删除异常'
            // }
            fs.unlinkSync(targetPath)// 删除文件
          }
        });
        fs.rmdirSync(delPath);
        resolve(delPath+'文件夹删除完成');
      }else{//直接删除文件夹
        fs.rmdirSync(delPath);
        resolve("delete empty folder");
      }
    }catch (e) {
      reject(e) ;
    }
  })
}
