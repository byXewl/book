可以cc利用链拆成前后的两部分，其中第一部分是**readObject()->transform()**，第二部分是**transform()->命令执行**。将cc利用链拆成两部分，有以下的两点原因：
1. 拆成更短的两条链子，有利于理解和记忆
2. 有助于对不同cc链进行比较

## 1. readObject() -> transform()

> 一共五条利用链
>
> * 四条是通过LazyMap#get()调用transform()
> * 一条是通过TransformingComparator#compare()调用transform()

**cc1/cc3**

* InnatationInvocationHandler#readObject()

  * Map#entrySet()

    * InnatationInvocationHandler#invoke()

      * **LazyMap#get()**

        * Transformer#transform()

**cc5**

* BadAttributeValueException#readObject

  * TiedMapEntry#toString()

    * TiedMapEntry#getValue()

      * **LazyMap#get()**

        * Transformer#transform()

**cc6**

* HashSet#readObject()

  * HashMap#put()

    * HashMap#hash()

      * TiedMapEntry#hashCode()

        * TiedMapEntry#getValue()

          * **LazyMap#get()**

            * Transformer#transform()

**cc7**

* HashTable#readObject()

  * reconstitutionPut()

    * AbstractMapDecorator#equals()

      * AbstractMap#equals()

        * **LazyMap#get()**

          * Transformer#transform()

**cc2/cc4**

* PriorityQueue#readObject()

  * PriorityQueue#heapify()

    * PriorityQueue#siftDown()

      * PriorityQueue#siftDownUsingComparator()

        * TransformingComparator#compare()

          * Transformer#transform()

## 2. transform() -> 命令执行

> 总的来看就三条链（这里把cc3那条链归到了cc4中）
>
> * 一条是InvokerTransformer#transform()利用反射
> * 两条是TemplateImpl#defineTransletClasses()利用类加载

**cc1/cc5/cc6/cc7**

* ChainedTransformer#transform()

  * ConstantTransformer#transform()

    * InvokerTransformer#transform()

      * ...

        * InvokerTransformer#transform()

**cc2**

* InvokerTransformer#transform()

  * TemplateImpl#newTransformer()

    * ...

      * TemplateImpl#defineTransletClasses()

**cc4**

* InstanciateTransformer#transform()

  * TrAXFilter#TrAXFilter(Templates)

    * Templates#newTransformer

      * ...

        * TemplateImpl#defineTransletClasses()

**cc3**（其实就是cc4多套了一层）

* ChainedTransformer#transform()

  * ConstantTransformer#transform()

    * InstanciateTransformer#transform()

      * TrAXFilter#TrAXFilter(templates)

        * Templates#newTransformer

          * ...

            * TemplateImpl#defineTransletClasses()

## 3. 更多的cc链?

* 理论上，根据上述的5条`readObject()->transform()`，3条`transform()->命令执行`，使用排列组合最多能够构造出5\*3=15条cc链。

* 除此之外，还能找到其他的链子实现`readObject()->transform()`或者`transform()->命令执行`

* 例如：

  * AnnotationInvocationHandler#readObject()

    * TransformedMap#setValue()

      * TransformedMap#checkSetValue

        * Transformer#transform()

* 亦或者是对原有链子进行改造，例如cc3中的`transform()->命令执行`就是对cc4的链子再套一层。（具体这么改造有没有意义仍待证实。。）

