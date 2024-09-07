```
def euler(a):
    res = a
    i = 2
    while i * i <= a:
        if a % i == 0:
            res = res // i * (i - 1)
            while a % i == 0:
                a //= i
        i += 1
    if a > 1:
        res = res // a * (a - 1)
    return res


def mod_inverse(a, m):
    m0, x0, x1 = m, 0, 1
    if m == 1:
        return 0
    while a > 1:
        q = a // m
        m, a = a % m, m
        x0, x1 = x1 - q * x0, x0
    if x1 < 0:
        x1 += m0
    return x1


p = 11
q = 13
n = p * q
print(n)
phi = euler(n)
print(phi)
e = 17
d = mod_inverse(e, (p - 1) * (q - 1))
# d = e^-1 mod (p-1)*(q-1)

m = 141
print("m原文：", m)
C = pow(m, e, n)
print("m加密后的密文：", C)

M = pow(C, d, n)
print("C解密后的明文：", M)
```
