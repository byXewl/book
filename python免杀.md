python一般是代码脚本执行，需要打包器(pyinstall、py2exe、Nuitka)，打包成可执行文件。


## **Python-打包器选择-Pyinstall&Py2exe&Nuitka**

### Pyinstaller (不推荐，打包内存大，且不好免杀)
-F, –onefile 打包一个单个文件，如果你的代码都写在一个.py 文件的话，可以用这个，如果是多个.py 文件就别用
-D, –onedir 打包多个文件，在 dist 中生成很多依赖文件，适合以框架形式编写工具



### Py2exe （推荐）
python setup.py py2ee

同目录setup.py中配置目标py
```
from distutils.core import setup
import py2exe

INCLUDES = ['hello_test']

options = {
    "py2exe":
        {
            "compressed": 1,  # 0或1,1压缩，0不压缩
            "optimize": 2,  # 0、1、2，文件的优化级别
            "bundle_files": 1,  # 1、2、3,1表示所有文件打包成一个exe文件，2表示除了Python的解释器外都绑定，3表示不绑定
            "includes": INCLUDES,  # 列表，包含其它的一些模块
            "dll_excludes": ['MSVCP90.dll']  # 列表，包含的dll文件不会打包进exe程序
        }
}
setup(
    version='1.0.0',
    options=options,
    description="this is a py2exe test",
    zipfile=None,  # 公用文件的压缩文件名称，默认为“library.zip”；如果没有，则会将这些文件放在最终的exe文件中
    console=[{"script": 'hello_test.py'}]  # 生成一个控制台形式的exe程序，对应的有windows=[]，生成GUI形式的exe程序
)
```

^
效果
![image-20240717142248996](http://cdn.33129999.xyz/mk_img/image-20240717142248996.png)
