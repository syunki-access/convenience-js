# convenience-js
便利なjavascriptを集めました。

あとフレームワークのお勉強用。

# ローカルでの確認方法（python3が入っている前提）
ターミナルで以下のコマンドを叩きます。  
  
`$ cd 【リポジトリをクローンした場所】`  
`$ python ./convenience-js/simple-server.py -p 5963`  
↑番号は適当です。  
  
ブラウザで下記のURLを開くと表示されます。  
- jQueryでの描画  
http://localhost:5963/convenience-js/html/wikiSampleNoFW.html  
- vue.jsでの描画  
http://localhost:5963/convenience-js/html/wikiSampleVueJs.html  
  
  
# pythonのインストール手順（mac）
## Homebrewのインストール
- https://qiita.com/zaburo/items/29fe23c1ceb6056109fd  
こちらを参考にまず、Homebrewをインストール  

## pyenvを使ったpythonのインストール
- https://zenn.dev/kenghaya/articles/9f07914156fab5  
pythonはバージョンがいっぱいあるので、バージョン管理するためにこちらでインストールしたほうが無難。  

# react版もあり
`wiki-sample-react`のディレクトリ以下がreact版になります。  

## react版の環境構築（備忘録込）
下記のページを参考にしてとりあえずreactを動くところまで構築する  
- https://qiita.com/mk185/items/d40e539caad025bdc987  

### 【2022/04現在】環境構築の注意点
- `$ npm install -g create-react-app` する時に  
`npm install --no-audit --save @testing-library/jest-dom@^5.14.1 @testing-library/react@^12.0.0 @testing-library/user-event@^13.2.1 web-vitals@^2.1.0`  
が実行できないみたいなエラーが出ることがある。その場合は  
`--legacy-peer-deps` というオプションを付けると実行できる。  
具体的には  
`$ cd 【アプリのディレクトリ】`  
`$ npm install --no-audit --save --legacy-peer-deps @testing-library/jest-dom@^5.14.1 @testing-library/react@^12.0.0 @testing-library/user-event@^13.2.1 web-vitals@^2.1.0`  
とすれば多分大丈夫。  

- create-react-app のインストールが終わった後、react react-dom のバージョンをver.17に下げること。  
`$ npm install react@17.0.2`  
`$ npm install react-dom@17.0.2`  
【2022/04現在】ver.18はその他のパッケージの依存関係で不安定らしい  

### ESLintのチェック除外の書き方
- ymlを使う時に外部呼び出しのjavascriptを使っているため、定義していないオブジェクトがある  
そのため、ESLintでエラー表示が出るが、それを回避する方法が下記。  
https://qiita.com/nju33/items/2d0cfea4fffbfdbff87a  
[具体的に使っている場所はここ](https://github.com/syunki-access/convenience-js/blob/db93d8894cb94a452b9799a06547072a1036ee0e/wiki-sample-react/src/contents/common/main_page.js#L18)  

- 基本はコメントアウトで処理すること

## マークダウン記法の書き方
https://gist.github.com/mignonstyle/083c9e1651d7734f84c99b8cf49d57fa  
とりあえずgithubに書いてあるので実際のサンプルも見れるから便利かも。  
