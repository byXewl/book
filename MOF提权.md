MOF 提权是一个有历史的漏洞，基本上在 Windows Server 2003 的环境下才可以成功。提权的原理是 C:/Windows/system32/wbem/mof/ 目录下的 mof 文件每 隔一段时间（几秒钟左右）都会被系统执行，因为这个 MOF 里面有一部分是 VBS 脚本，所以可以利用这个 VBS 脚本来调用 CMD 来执行系统命令，如果 MySQL 有权限操作 mof 目录的话，就可以来执行任意命令了。

^
msf中可利用，成功率不高。
use exploit/windows/mysql/mysql_mof



