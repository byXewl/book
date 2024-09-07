VSCode内部终端使用的宿主机的终端程序，目的是为了让你能够在编辑代码的同时直接在同一窗口中执行命令、运行脚本等。
但是这个内部终端环境是与操作系统的终端环境分开的，因此PATH变量可以有所不同。
查看当前内置终端的PATH环境变量：
```
$env:PATH   (powershell)
echo $PATH（对于类 Unix 终端）
echo %PATH% (windows的cmd终端)
```
settion.json如何将 VSCode 的内部终端环境的 `PATH` 设置为与系统环境变量相同：
```
{
  "terminal.integrated.env.windows": {
    "PATH": "${env:PATH}"
  },
  "terminal.integrated.env.linux": {
    "PATH": "${env:PATH}"
  },
  "terminal.integrated.env.osx": {
    "PATH": "${env:PATH}"
  }
}
```
这个配置将内部终端环境的 `PATH` 设置为与系统环境变量相同。你可以根据需要设置其他环境变量。请注意，这里使用了 VSCode 的变量 `${env:PATH}` 来获取系统环境变量 `PATH` 的值。

^
不要让vscode会自动还原上一次terminal的环境变量
"terminal.integrated.persistentSessionReviveProcess": "never"
默认情况好像是vscode会自动还原上一次terminal的环境变量
保存这个配置后，VSCode 的内部终端应该会使用相同的环境变量了。

^
还出现找不到npm命令，可能同步path变量错了，手动配置，或者使用外部终端，或者使用npm绝对路径。

