# apage
构建项目？自动化？一份gulp+webpack配置？editorconfig？eslint？pug+sass+babel+react？   

## bower
如：bower install apage   

## 使用：
在命令窗口中进入到apage目录下，  
执行npm install，根据package.json安装所需模块插件。  
然后，执行npm run build运行。   

## 注意：
请根据项目结构情况更改配置。  
gulpfile.js中，如下：  
```
const paths = {
    pug: ['./p/src/pug/**/*.pug', '!./p/src/pug/**/_*.pug'],
    sass: ['./p/src/sass/**/*.scss', '!./p/src/sass/**/_*.scss'],
    js: ['./p/src/es/**/*.js', '!./p/src/es/**/_*.js'],
    image: './p/src/images/**/*'
};
```
有下划线(_)的文件可以规划成公用的文件。   
