yarn の install

yarn

yarn start localhost:3000

java の install

# 開発に使用したソフトウェア

- Node.js v16.x
- Yarn
- Firebase

# yarn のインストール方法

```
$ npm install -g yarn
```

# Java のインストール方法

[https://java.com/ja/download/help/download_options_ja.html]

# サーバの起動

```
$ git clone https://github.com/kiyo7/chat-app.git
$ yarn global add firebase-tools
$ firebase login
$ firebase use chaaaaat-4e459
$ yarn install
$ yarn build
$ yarn start <- 下記リンクからアクセス出来ます。
```

[http://localhost:3000/]

## Firebase Emulator の起動 デモデータの導入

# Emulator 起動には Java が必要になります。

```
$ firebase emulators:start
$ yarn run seed
```
