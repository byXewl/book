## **git配置代理**
更好推送GitHub。
Git 可以通过配置代理来走本地的代理。在 Git 中，可以使用 `http.proxy` 和 `https.proxy` 配置项来指定 HTTP 和 HTTPS 请求的代理地址。
以下是在 Git 中配置本地代理的步骤：

1. **设置 HTTP 代理：**
   ```
   git config --global http.proxy http://127.0.0.1:10809
   ```
2. **设置 HTTPS 代理：**
   ```
   git config --global https.proxy http://127.0.0.1:10809
   ```
3. **取消代理设置：**
   如果需要取消代理，可以使用以下命令：
   ```
   git config --global --unset http.proxy
   git config --global --unset https.proxy
   ```

   这会将全局配置中的代理设置移除。

这些配置是全局的，它们会影响所有使用 Git 的操作，而不仅仅是在 VSCode 中。
如果只想在某个特定的 Git 仓库中使用代理，可以在该仓库的目录下运行上述命令时不使用 `--global` 选项，或者用如下命令：

   ```
   git config --local http.proxy http://127.0.0.1:10809
   git config --local https.proxy http://127.0.0.1:10809
   ```