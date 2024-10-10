场景：
  1、服务端对xml数据进行解析，以及含有xml文件的文件上传进行解析。
  2、关键词：DocumentBuilder、XMLStreamReader、SAXBuilder、SAXParser、SAXReader、XMLReader、SAXSource、TransformerFactory、SAXTransformerFactory、SchemaFactory。
WorkbookFactory(Apache POI库处理Excel文件xlsx时)

危害：造成xml外部实体注入攻击、读取服务器文件等。
防御：使用安全的xml解析器并开启禁用外部实体，过滤关键词“<!DOCTYPE <!ENTITY”和“SYSTEM”等。


## **XML常见接口**
XMLReader和 DocumentBuilder是java自带的用于解析xml的api。

XMLReader基于SAX解析，是一行一行解析，类似的库有jdom。
DocumentBuilder基于树型结构文档树解析，类似的库有dom4j。

## **XMLReader**
XMLReader是SAX（Simple API for XML）的一部分，用于解析XML文档(一行一行解析，不基于dom树)。
XMLReader接口由SAX2定义，它允许应用程序逐行解析XML文档。通常通过SAXParserFactory来创建XMLReader实例
```
public static void XMLReaderTest() throws SAXException, IOException, ParserConfigurationException {

        // 创建XMLReader实例
        XMLReader xmlReader = XMLReaderFactory.createXMLReader();

        // 创建处理器
        DefaultHandler handler = new DefaultHandler() {
            @Override
            public void startElement(String uri, String localName, String qName, Attributes attributes) {
                // 处理开始元素
                System.out.println("Start Element: " + qName);
            }

            @Override
            public void endElement(String uri, String localName, String qName) {
                // 处理结束元素
                System.out.println("End Element: " + qName);
            }

            @Override
            public void characters(char[] ch, int start, int length) {
                // 处理元素内容
                System.out.println("Characters: " + new String(ch, start, length));
            }
        };

        // 将处理器设置为XMLReader的内容处理器
        xmlReader.setContentHandler(handler);


        // 解析XML文档
        File file = new File("E:\\code\\Java代码审计系统学习\\CodeReviewStudy\\day9-XXE\\src\\main\\java\\com\\llu\\baseTest\\example.xml");
        InputSource inputSource = new InputSource(file.toURI().toURL().toString());
        xmlReader.parse(inputSource);


    }
    public static void XmLReaderFixTest() throws Exception {
        // 配置SAXParserFactory以防止XXE攻击
        SAXParserFactory factory = SAXParserFactory.newInstance();
        // 创建XMLReader实例 ，错误的修复方式， 需要先设置setFeature ，在获取 xmlReader
//        XMLReader xmlReader = factory.newSAXParser().getXMLReader();
        factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
        factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
        factory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
        // 正确的修复方式
        XMLReader xmlReader = factory.newSAXParser().getXMLReader();


        // 创建处理器
        DefaultHandler handler = new DefaultHandler() {
            @Override
            public void startElement(String uri, String localName, String qName, Attributes attributes) {
                System.out.println("Start Element: " + qName);
            }

            @Override
            public void endElement(String uri, String localName, String qName) {
                System.out.println("End Element: " + qName);
            }

            @Override
            public void characters(char[] ch, int start, int length) {
                System.out.println("Characters: " + new String(ch, start, length));
            }
        };

        // 将处理器设置为XMLReader的内容处理器
        xmlReader.setContentHandler(handler);

        // 解析XML文档
        File file = new File("E:\\code\\Java代码审计系统学习\\CodeReviewStudy\\day9-XXE\\src\\main\\java\\com\\llu\\baseTest\\example.xml");
        InputSource inputSource = new InputSource(file.toURI().toURL().toString());
        xmlReader.parse(inputSource);

    }
```
## **DocumentBuilderFactory 和 DocumentBuilder**
DocumentBuilderFactory类在javax.xml.parsers包中。它是Java的标准库之一，用于创建用于解析XML文档的DocumentBuilder实例。
许多Java项目和框架使用DocumentBuilderFactory来解析XML数据。以下是一些常见的使用场景和项目：
    Spring Framework
    Apache Tomcat

```
public static void vul() throws Exception {
       /**
     * 创建一个 DocumentBuilderFactory 实例来解析 XML 文档
     */
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

    /**
     * 使用 DocumentBuilderFactory 创建一个 DocumentBuilder 实例
     */
    DocumentBuilder builder = factory.newDocumentBuilder();

    /**
     * 解析 example.xml 文件并获取一个 Document 对象
     */
    Document document = builder.parse(new File("E:\\code\\Java代码审计系统学习\\CodeReviewStudy\\day9-XXE\\src\\main\\java\\com\\llu\\baseTest\\example.xml"));

    /**
     * 输出文档根元素的内容
     * 这里处理文档
     */
    System.out.println(document.getDocumentElement().getTextContent());


    }

    /**
     * DocumentBuilder builder = dbf.newDocumentBuilder();这行代码需要在dbf.setFeature()之后才能够生效；
     */

    public static void fix() throws Exception {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        // 错误的修改方式 DocumentBuilder builder = dbf.newDocumentBuilder();这行代码需要在dbf.setFeature()之后才能够生效；
        // DocumentBuilder builder = dbf.newDocumentBuilder();
        String FEATURE = null;
        FEATURE = "http://javax.xml.XMLConstants/feature/secure-processing";
        dbf.setFeature(FEATURE, true);
        FEATURE = "http://apache.org/xml/features/disallow-doctype-decl";
        dbf.setFeature(FEATURE, true);
        FEATURE = "http://xml.org/sax/features/external-parameter-entities";
        dbf.setFeature(FEATURE, false);
        FEATURE = "http://xml.org/sax/features/external-general-entities";
        dbf.setFeature(FEATURE, false);
        FEATURE = "http://apache.org/xml/features/nonvalidating/load-external-dtd";
        dbf.setFeature(FEATURE, false);
        dbf.setXIncludeAware(false);
        dbf.setExpandEntityReferences(false);
        // 正确的修复方式
        DocumentBuilder builder = dbf.newDocumentBuilder();
        /**
         * 解析 example.xml 文件并获取一个 Document 对象
         */
        Document document = builder.parse(new File("E:\\code\\Java代码审计系统学习\\CodeReviewStudy\\day9-XXE\\src\\main\\java\\com\\llu\\baseTest\\example.xml"));

        /**
         * 输出文档根元素的内容
         * 这里处理文档
         */
        System.out.println(document.getDocumentElement().getTextContent());
    }


```


^
## **XXE防御，禁用外部实体**


## Java常见的XXE漏洞

* <https://blog.spoock.com/2018/10/23/java-xxe/>
* <https://xz.aliyun.com/t/10774?time__1311=CqjxRDuDgADtD%3DD%2FD0ex2QQ7uDWuMhEgbD>

## **XXE案例**
```
@RestController(value = "/xxe")
public class XXEController {

    @RequestMapping(value = "/one")
    public String one(@RequestParam(value = "xml_str") String xmlStr) throws Exception {
        DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        InputStream stream = new ByteArrayInputStream(xmlStr.getBytes("UTF-8"));
        org.w3c.dom.Document doc = documentBuilder.parse(stream);
        doc.getDocumentElement().normalize();
        return "Hello World";
    }
}
```



^
## **Apache POI库解析xlsx文件的XXE**
ApachePOI版本<=4.1.0，3.10版本中可能存在XXE漏洞

Apache POI库和Java自带的XML解析API（如XMLReader和DocumentBuilder）服务于不同的目的，但它们在处理文件和数据格式方面可以有交集。
```
Apache POI库：
专门用于处理Microsoft Office文档，如Excel（.xls, .xlsx）、Word（.doc, .docx）和PowerPoint（.ppt, .pptx）文件。
支持文件的读取、创建、编辑和写入。
对于Excel文件，提供了对单元格、行、工作表等元素的访问和操作。
主要用于Java应用程序中的文档处理和报表生成。

Java XML解析API：
用于解析和生成XML文件。
XMLReader是SAX（Simple API for XML）解析器的一部分，用于事件驱动的XML解析。
DocumentBuilder是DOM（Document Object Model）解析器的一部分，用于将XML文档加载到内存中以便进行随机访问。
可以用于任何需要处理XML数据的场景，如配置文件、数据交换等。
```
关系：
文件格式：Excel文件（特别是.xlsx）本质上是压缩的XML文件集合。这意味着虽然你可以使用Apache POI来操作Excel文件，但在某些情况下，也可以使用XML解析API来直接处理Excel文件的XML内容。
互操作性：如果你需要从Excel文件中提取XML数据或将XML数据写入Excel文件，你可能需要同时使用Apache POI和XML解析API。
数据处理：在处理Office文档中的XML数据时，Apache POI提供了更高层次的抽象，而XML解析API提供了对XML数据的底层访问。
在实际应用中，你通常会根据需求选择合适的工具。如果你的主要任务是处理Excel文件，那么Apache POI是更合适的选择。但如果你只需要处理Excel文件中的XML数据片段，或者你有XML解析的特定需求，那么可能会使用Java的XML解析API。

案例：
对一个xlsx文件解析，调用`Sheet`对象的`getFirstRowNum()`方法打印出第一行的行号。在Excel中，行号是从0开始计数的，所以`getFirstRowNum()`方法返回的是工作表中第一行的索引。
```
if (filename.startsWith("excel-") && "xlsx".equals(fileExtName)) {
    try {
        Workbook wb1 = WorkbookFactory.create(in);
        Sheet sheet = wb1.getSheetAt(0);
        System.out.println(sheet.getFirstRowNum());
    } catch (InvalidFormatException var20) {
        System.err.println("poi-ooxml-3.10 has something wrong");
        var20.printStackTrace();
    }
}
```
