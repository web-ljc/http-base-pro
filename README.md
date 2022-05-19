# HTTP-BASE-PRO

#### 浏览器从输入网址到页面展示的过程
  - Redirect 跳转
  - AppCache 应用缓存
  - DNS      域名解析 
  - TCP      创建TCP连接
  - Request  发送请求
  - Response 接收响应
  - 浏览器解析渲染页面
  - HTTP请求结束，断开TCP连接

#### 经典五层模型
  1. 应用层
      - 为软件提供了很多服务
      - 构建于TCP协议之上
      - 屏蔽网络传输相关细节

  2. 传输层
      - TCP&IP / UDP
        - TCP链接
          - 三次握手
          - 传输确认 // 发送缓冲区，发送报文，回复确认，切割发送
          - 四次挥手
        - TCP基于链接
          - 稳定可靠
          - 邮件、网页
        - UDP基于非链接
          - 性能损耗少
          - 资源占用少
          - 稳定性弱
          - 速度快
          - 网络电话、视频、隧道网络
      - 向用户提供可靠的端到端服务
      - 传输层向高层屏蔽了下层数据通信的细节

  3. 网络层
    - 为数据在结点之间传输创建逻辑链路。如何寻找服务逻辑

  4. 数据链路层
    - 在通信的实体间建立数据链路连接。软件服务

  5. 物理层
    - 定义物理设备如何传输数据。硬件设备

### HTTP历史
#### HTTP/0.9
  - 只有一个命令GET
  - 没有HEADER等描述数据的信息
  - 服务器发送完毕，就关闭TCP连接 （现在一个TCP不能放多个http请求）
#### HTTP/1。0
  - 增加了很多命令
  - 增加status code和header
  - 多字符集支持、多部分发送、权限、缓存等

#### HTTP/1.1
  - 持久连接 （一个TCP可以放多个HTTP请求）
  - pipeline （同步执行）
  - 增加host和其它一些命令
    - host可以在一台服务器访部署多个web服务

#### HTTP/2
  - 数据以二进制传输（以前是字符串传输）
  - 同一个链接里面发送多个请求不再需要按照顺序来（并行）
  - 头信息压缩、推送等高效率的功能

### TCP三次握手
  - 解决网络延时导致服务器开销
  - client >>>  SYN=1, Seq=X           >>> server
  - client <<<  SYN=1, ACK=X+1, Seq=Y  <<< server
  - client >>>  ACK=Y+1, Seq=Z         >>> server
### URI / URN / URL
  - URI
    - Uniform Resource Identifier / 统一资源标识符
    - 用来唯一标识互联网上的信息资源
    - 包含URL 和 URN
  - URL
    - UniForm Resource Locator  /  统一资源定位器
    - http://www.baidu.com:80/path?query=string#hash
  - URN
    - 永久统一资源定位符
    - 资源移动之后还能被找到
    - 目前还没有非常成熟的解决方案

### HTTP报文格式
  - HTTP方法
    - 用来定义对于资源的操作
    - 常用有GET、POST等
  - HTTP CODE
    - 定义服务器对请求的处理结果
    - 各个区间的CODE有各自的语义

### 查看网站http信息
- curl -v www.jd.com
  ```js
    *   Trying 2409:8c0c:310:2901:8000::3:80...
    * Connected to www.jd.com (2409:8c0c:310:2901:8000::3) port 80 (#0)
    > GET / HTTP/1.1
    > Host: www.jd.com
    > User-Agent: curl/7.79.1
    > Accept: */*
    > 
    * Mark bundle as not supporting multiuse
    < HTTP/1.1 302 Moved Temporarily
    < Server: nginx
    < Date: Wed, 11 May 2022 02:33:13 GMT
    < Content-Type: text/html
    < Content-Length: 138
    < Connection: keep-alive
    < Location: https://www.jd.com/
    < Timing-Allow-Origin: *
    < X-Trace: 302-1652236393652-0-0-0-0-0
    < Strict-Transport-Security: max-age=3600
    < 
    <html>
    <head><title>302 Found</title></head>
    <body>
    <center><h1>302 Found</h1></center>
    <hr><center>nginx</center>
    </body>
    </html>
  ```


### ajax请求
  ```js
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://www.jd.com/api')
  xhr.send()
  xhr.onreadstatechange() {
    if(xhr.readState === 4 && xhr.status === 200) {
      console.info(xhr.response)
    }
  }
  ```
### 解决跨域CORS
  - 响应头部设置参数 Access-Control-Allow-Origin
    1. 设置为 * 通配符，匹配所有网站
    2. 也可以专门设置访问域名
  - 可以引入script标签中，浏览器加载JS文件不受同源策略的限制

  - 跨域预请求,非允许要预请求OPTIONS
    - 允许方法
      - GET、POST、HEAD
    - 允许Content-Type 
      - text/plain
      - mulipart/form-data
      - application/x-www-from-urlencoded
    - 请求头限制
      - Content-Type
  - 跨域预请求配置
    ```js
      'Access-Control-Allow-Origin': '*', // 允许跨域访问ip
      'Access-Control-Allow-Headers': 'X-Test-Cors', // 设置允许预请求头
      'Access-Control-Allow-Methods': 'DELETE', // 设置允许预请求方式
      'Access-Control-Max-Age': 10000 // 设置多久时间内不用预请求
    ```

### 缓存 Cache-Control
  #### 可缓存性
  - public http经过的任何地方都可缓存
  - private 只有客户端有缓存
  - no-cache 强制客户端向服务器发起请求，（禁用强缓存，可用协商缓存）
  #### 到期
  - max-age=<seconds>    多长时间后过期
  - s-maxage=<seconds>   代理服务器中生效
  - max-stale=<seconds>  过期了仍可使用缓存，浏览器端没用
  #### 重新验证
  - must-revalidate      过期重新请求
  - proxy-revalidate     过期请求，服务端
  #### 其他
  - no-store 本地和代理服务器不能有缓存，必须向服务端请求新数据
  - no-transform  代理服务器不允许改动内容
### 资源验证
  - Last-Modified
    - 上次修改时间
    - 配合If-Modified-Since或If-Unmodified-Since使用
  - Etag
    - 数据签名，对比资源的签名判断是否变化
    - 配合If-match或If-Non-match使用

### Cookie
  - 通过Set-Cookie设置
  - 下次请求会自动带上
  - 键值对，可以设置多个
  #### Cookie属性
  - max-age和expires设置过期时间
  - HttpOnly无法通过document.cookie访问
  - Secure只在https的时候发送
  - 可以设置二级域名访问
  - 设置SameSite
    - strict完全禁用第三方cookie，但统一主体运营要重复登录
    - none完全不做限制，不认来源，只看目的
    - lax 某些情况限制三方cookie，a链接、get方式某些情况放行，post、ajax不放行
  
  cookie不等于session。session可以方在cookie里，不一定由cookie实现

### 长链接
  - http1.1的TCP请求是串行的，前边请求完才会请求后边
  - http请求是基于TCP请求的，所以会并发多个TCP请求

### 数据协商
  #### 请求
  - Accept           // 数据类型
  - Accept-Encoding  // 数据压缩
  - Accept-Lanauage  // 语言
  - User-Agent       // Pc/移动
  
  #### 返回
  - Content
  - Content-Type      // 文件类型
  - Content-Encoding  // 数据压缩
  - Content-Language

### redirect
  - 301永久重定向，第二次访问之后，会直接访问跳转路径，从本地读取，会不受控制
  - 302临时重定向，跳转每次访问都会请求下跟路径

### 内容安全策略CSP
  - 限制资源获取
  - 报告资源获取越权

  #### 限制方式
  - default-src 限制全局
  - 根据资源类型进行限制

### HTTPS
  - 加密
    - 私钥
    - 公钥
  - 加密传输相比http更安全
  - 使用不同的链接方式，端口也不同https端口是443

### HTTP2
  - 优势
    - 信道复用
    - 分帧传输
    - Server Push
    - 压缩头部

### HTTPS
  - 网络传输的安全性
  - SSL 和 TLS
    - 传输层安全协议（Transport Layer Security，TLS）以及其前身 安全套接层（Secure Sockets Layer，SSL）是一种安全协议，目的是为了互联网通信，提供安全及数据
    - HTTPS = HTTP + SSL/TLS
    - HTTP - （TLS/SSL） - TCP
    - 信息加密、完整性校验、身份验证
  - HTTPS
    - HTTPS协议的主要功能都依赖于TLS/SSL协议，TLS/SSL的功能实现主要依赖于三类基本算法
      - 散列函数：散列函数验证信息的完整性
      - 对称加密：对称加密算法采用协商的密钥对数据加密 
      - 非对称加密：非对称加密实现身份认证和密钥协商
      
### 加密
  - 加密就是研究如何安全通信
  - 保证数据在传输过程中不会被窃听
  #### 对称加密
    - 描述
      1. 对称加密是最快速，最简单的一种加密方式，加密（encrypt）和解密（decrypt）用的是相同密钥（secret key）
      2. 主流有 `AES` 和 `DES`
    - AES
      - 配置
        - algorithm 用于指定加密算法，如 aes-128-ecb、aes-128-cbc
        - key是用于加密的密钥
        - iv参数用于指定加密所用的向量
      - 如果加密算法是128，对应密钥是16位。加密算法是256，对应密钥是32位
      - createCipheriv('aes-128-cbc', key, iv)
  #### 非对称加密
    - 互联网上没办法安全交换密钥
    1. 单向函数
      - 单向函数顺向计算起来非常的容易，但求逆却非常的困难。
      - 整数分解又称素因数分解，是将一个正整数写成几个约数的乘积
    2. RSA加密算法
    3. RSA加密
      - 公钥加密私钥解，私钥加密公钥解
      - generateKeyPairSync('rsa' {})
  #### 哈希
    1. 哈希函数
      - 哈希函数的作用是给一个任意长度的数据生成出一个固定长度的数据
      - 安全性 可以从固定的数据X计算出哈希值Y，但不能从哈希值Y计算数据X
      - 独一无二，不同的数据产生不同的哈希值
      - 长度固定 不管输入多大的数据，输出长度都是固定
    2. 哈希碰撞
      - 不同的输入得到同一个哈希值，就会发生哈希碰撞
      - 防止哈希碰撞最有效办法，扩大哈希值的取值空间
      - 16进制哈希值碰撞概率是 1/65536 32进制哈希值可以降到 1/43亿左右
    3. 哈希分类
      - 哈希还可以叫 摘要 digest、校验值 chunkSum、指纹 fingerPrint
      - 如果两段数å据完全一样，就可以证明数据是一样的
      - 哈希有2种
        - 普通哈希用来做完整性校验，流行的是MD5
        - 加密哈希用来做加密，流行的加密算法是SHA256系列
      - 哈希使用
        - createHash('sha256')
  
  #### 数字签名
    1. 数字签名的基本原理是用私钥去签名，用公钥去验证签名
      - 私钥加密，公钥解密是用来加密数据
      - 公钥加密，私钥解密是用来数字签名
      - A私钥签名 发送给B B用公钥解密并验证签名
    2. 签名防止篡改文件，验证文件是否被修改过
    3. createSign / createVerify

  #### 数字证书
    1. 数字证书是可信的第三方发出的，用来证明所有人身份以及所有人拥有某个公钥的电子文件
    2. 流程
      - 服务器把公钥注册到 -- 数字认证机构（CA）
      - CA用自己的私钥将服务器的公钥做签名，并颁发数字证书，服务器公钥+CA数字签名，发给服务端
      - 服务端把数字证书发给客户端
      - 客户端拿到服务端的数字证书后使用，CA公钥确认服务器数字证书的真实性 
      - 客户端把数据用服务器公钥加密后发送

  #### Diffie-Hellman算法
    - Diffie-Hellman算法是一种密钥交换协议，他可以让双方在不泄漏密钥的情况下协商出一个密钥来


