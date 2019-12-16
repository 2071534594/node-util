#!/usr/bin/env node
const program = require('commander');
//设置起始命令名称
program.name(require('../package').commandName);

// const commander = require('commander');
// const program = new commander.Command(require('../package').commandName);

//获取package中的版本,设置当前版本 '-v, --version'
program.version(require('../package').version,'-v, --version');

//使用说明
program.usage('<command>|<option> 命令使用规则');


// program
// .option('-i, --init [name]', 'init project,your project name')
// .option('-gn, --generate [name]', 'generate folder')
// .option('-d, --del [name]', 'Tell us you are happy');

//格式化json 文件
program.command('json <folder> <name>')
  .description('formatter json file')//描述
  .action((folder,name) => {
    require('../command/formatterjson')(folder,name);
  });
//
// //生成文件，暂时不支持等待后续完善
// //与固定的项目结构相关
// program.command('generate <name>')
//   .description('add folder & select file type')//描述
//   .alias('gn')//缩写
//   .action((name) => {
//     require('../command/add')(name);
//   });
//
// //删除文件
// //与固定的项目结构相关
// program.command('del <name>')
//   .description('delete command')//描述
//   .alias('d')//缩写
//   .action((name) => {
//     require('../command/delete')(name);
//   });



//当 Node.js 启动时传入的 argv 的原始值的只读副本
program.parse(process.argv);

//当没有输入任何参数时，等同于 <commandName> -h
if(!program.args.length){
  program.help()
  process.exit()
}
