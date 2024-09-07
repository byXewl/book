## **settings.json文件是 VSCode 中的配置文件**
它存储了用户自定义的设置，包括编辑器的外观、主题、字体、缩进、语言、内部终端环境相关的设置等。这个文件本质上是一个JSON格式的文本文件，可以手动编辑，也可以通过VSCode的用户界面进行设置。
用户可以通过修改settings.json来改变编辑器的行为。

^
## **工作区配置文件和用户区全局配置文件**
一个项目中可以在当前目录加一个优先级高的.vscode/settings.json，即工作区配置。
否则使用默认用户区的配置，在C盘的%APPDATA%\Code\User\settings.json
可以使用命令：code .vscode/settings.json 或者手动加这个工作区的目录和文件。


^
## **设置=图形化改动settings.json文件**
进入设置会打开一个包含用户设置和工作区设置的编辑器。
打开用户区设置（JSON）”会打开全局的 `settings.json` 文件，这里保存了 VSCode 的用户偏好设置。
打开工作区设置（JSON）”会打开工作区的 `settings.json` 文件，如果你正在使用一个工作区，这里保存了该工作区的特定设置。
^
1. **用户区 (`settings.json` 在用户目录下)：**
     * 在 Windows 上，路径可能是类似于 `C:\Users\YourUsername\AppData\Roaming\Code\User\settings.json`。
     * 在 macOS 上，路径可能是 `~/.config/Code/User/settings.json`。
     * 在 Linux 上，路径可能是 `~/.config/Code/User/settings.json` 或 `~/.vscode-server/data/User/settings.json`。

   * **作用：** 用户区域的 `settings.json` 文件保存了全局的 Visual Studio Code 设置，即与用户关联的设置。这包括编辑器外观、主题、键绑定等设置。

2. **工作区 (`settings.json` 在项目目录下)：**
       工作区域的 `settings.json` 文件位于你当前打开的工作区（项目）的根目录下的 `.vscode` 子目录中，文件名为 `settings.json`，第一次打开可能为空。
     * 例如，`/path/to/your/project/.vscode/settings.json`。

   * **作用：** 工作区域的 `settings.json` 文件保存了与当前工作区关联的设置。这包括项目特定的配置，例如文件路径映射、启用的扩展等。





