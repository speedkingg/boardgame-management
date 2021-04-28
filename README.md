# hedgehog-with-boardgame

- ボードゲーム管理 Web アプリ
- レスポンシブ対応。
- Firebase で動作。

## 前提

- `firebase` で本プロジェクト用アプリを作成している

## 使い方

1. `firebase`の`Authentication`で、ログイン プロバイダ：`メール / パスワード`を許可する

   - ユーザを作成しておく（ログインに使用する）

2. Firebase コンソールより、ウェブアプリ用の設定スニペットを入手する
3. `config/firebaseConfig.template.ts` を `firebaseConfig.ts` へリネームし、Firebase の設定スニペットを貼り付ける。

4. ビルドし、デプロイする。

- `firebase init`でのホスティング対象ディレクトリを`dist`に変更する
- `firebase init`で SPA ので設定を有効にする

```
$ firebase init
$ npm run build
$ firebase deploy
```

## スクリーンショット

![image](https://user-images.githubusercontent.com/26742929/102586301-3a387d80-414d-11eb-8c90-3a12cee623f4.png)
![image](https://user-images.githubusercontent.com/26742929/102586390-69e78580-414d-11eb-9ed2-1058d70b216c.png)
![image](https://user-images.githubusercontent.com/26742929/102586411-74098400-414d-11eb-9867-86fa3846b745.png)
![image](https://user-images.githubusercontent.com/26742929/102586436-8388cd00-414d-11eb-9861-c7398aaf4e47.png)
