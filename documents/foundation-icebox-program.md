# 基金会LRC锁仓计划（草稿v0.1）

路印基金会（Loopring Founation）拥有LRC代币总量的20%。我们之前承诺：这部分LRC分四年释放，每年25%。今天我们进一步向社区承诺：**基金会的LRC前两年完全锁定，之后的两年内按每月1/24释放；该承诺通过智能合约实现。**

## 关于路印协议
路印协议（Loopring Protocol）是一个可在多条公有链上落地、代币间交易的去中心化撮合协议。其核心思想是订单生成、传播、和撮合发生在链外；交易验证和结算通过智能合约发生在链上。路印协议也引入了去中心化撮合者这个重要的生态角色，并将提供撮合挖矿软件。同时，路印协议提出了创新性的环路撮合概念，用来改善流动性和优化交易价格。路印协议的目标是真正匿名的去中心化交易，具有安全，透明，高流动性等特点。如需了解更多信息，请访问我们的官网[https://loopring.org](https://loopring.org)。


## 合约
该计划通过以太坊智能合约（smart-contract）实现，合约地址为：

    0x239dE3a0D6ca5f21601f83327eA2174225eB7156

该地址对应的ENS地址为：[icebox.lrctoken.eth](https://etherscan.io/address/icebox.lrctoken.eth)。我们的合约经过[etherscan.io](https://etherscan.io/address/icebox.lrctoken.eth#code)做了[源代码认证](https://etherscan.io/address/icebox.lrctoken.eth#code)，我们期待社区做进一步review。**由于智能合约的强制限制，这部分20%的LRC没有任何可能被提前释放流通。**

### 查看锁仓的LRC额度

您可以通过这个URL查看当前被锁仓的基金会LRC额度：[https://etherscan.io/token/0xEF68e7C694F40c8202821eDF525dE3782458639f?a=0x239dE3a0D6ca5f21601f83327eA2174225eB7156](https://etherscan.io/token/0xEF68e7C694F40c8202821eDF525dE3782458639f?a=0x239dE3a0D6ca5f21601f83327eA2174225eB7156)。

