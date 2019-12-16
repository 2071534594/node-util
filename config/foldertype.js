//文件夹选择
module.exports= {
  promptList:[
    {
      type: 'list',
      name: 'type',
      message: '选择文件夹',
      default: 'component',
      choices: [
        'views',
        'component'
      ]
    }]
};
