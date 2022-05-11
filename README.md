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