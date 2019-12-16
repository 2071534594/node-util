# ng-and-cli

主要是一个简单的node.js开发的脚手架

该项目主要是将一个已有的项目架构引用过来，做成一个可以通过简单命令行，生成指定目录结构与内容的脚手架工具

## 脚手架安装
全局安装，方便随时使用对应命令

`
npm i ng-antd-cli -g
`
## 设置环境变量
主要是为了全局识别脚手架的命令：

设置用户变量 NODE_GLOBAL = D:\nodejs\node_global（也可使用其他名称，路径为你全局安装的位置）

然后在path用户变量后面添加 %NODE_GLOBAL%

## 命令名称
命令名称是定义在package.json中的commandName:'tool'

## 查看命名行版本
打开cmd命令行 输入 <commandName> -v,查看脚手架版本，若输出版本信息，则确定生成成功

`
<commandName> -v
`
## 查看相关命令行说明
`
<commandName> -h
`
## 项目初始化
在指定路径下初始化项目：

`
tool init <项目名称>
`
