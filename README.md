# 開発に使用したソフトウェア 🚀

- Node.js v16.13.1
- Yarn
- Firebase

# yarn のインストール方法 🍀

```
$ npm install -g yarn
```

# サーバの起動 🤖

```
$ git clone https://github.com/kiyo7/chat-app.git
$ yarn global add firebase-tools
$ firebase login
$ firebase use chaaaaat-4e459
$ yarn install
$ yarn build
$ yarn start <- 下記リンクからアクセス出来ます。
```

http://localhost:3000/

## FirebaseEmulator の起動とデモデータの導入 🍞

### 🚨Emulator 起動には Java が必要になります。

### Java のインストール方法 🗒

[https://java.com/ja/download/help/download_options_ja.html]

```
$ firebase emulators:start
$ yarn run seed
```
