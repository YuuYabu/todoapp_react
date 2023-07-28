# TodoApp タスク管理ツール
## このプロジェクトについて

このプロジェクトはバックエンドにSpring Bootを、フロントエンドにReact、Vite、データベースにMySQLを採用したタスク管理SAPサンプルです。

## 機能

- タスク登録機能
- タスク更新機能
- タスク進行機能
- タスク非表示機能
- タスク進行状態一覧機能
- タスク一覧ページネーション
- ライトモード・ダークモード

## 環境構築
このプロジェクトは以下の環境を要求します。

* Docker
* Visual Studio Code
  * Remote Explorer
  * Docker

## 環境構築
以下Visual Studio Codeで操作するのを前提とします。

1. `docker-compose.yml`でdbイメージのパスワードとデータベース名を適宜に変更
   ```yaml
   # ...
   environment:
      MYSQL_ROOT_PASSWORD: {パスワード}
      MYSQL_DATABASE: {データベース名}
   # ...
   ```

3. コンテナを起動します。
    ```bash
    docker-compose up -d
    ```

4. VSCodeのリモートエクスプローラーで`frontend`、`backend`コンテナにアタッチします。
    <img width="538" alt="スクリーンショット 2023-07-28 175156" src="https://github.com/YuuYabu/todoapp_react/assets/25448386/4cf113ba-bd2d-46eb-922f-7d8a2188a4c3">

5. バックエンドの準備
  `backend`コンテナにアタッチしたウインドウで以下の拡張機能をインストールします。
    * Java Extension Pack Auto Config
    
    左のメニューの実行とデバッグを開き、歯車アイコンで `launch.json` を開き、`envFile`の項目を追加します。
    <img width="436" alt="スクリーンショット 2023-07-28 180030" src="https://github.com/YuuYabu/todoapp_react/assets/25448386/715c3ba0-8b1e-4fc0-8256-f8d3b12f43c0">

    ```jsonc
    {
        "configurations": [
            {
                // ...
                "envFile": "${workspaceFolder}/.env"
            }
        ]
    }
    ```

    `build.gradle`と同じ階層に`.env`ファイルを作成し、下記の内容を記入します。
    ```
    # DB URL
    SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/{1.で設定したデータベース名}

    # DB USERNAME
    SPRING_DATASOURCE_USERNAME=root

    # DB PASSWORD
    SPRING_DATASOURCE_PASSWORD={1.で設定したパスワード}
    ```

6. フロントエンドの準備

    `frontend`コンテナにアタッチしたウインドウでターミナルを開きます。

    必要な依存関係をインストールします。
    ```bash
    $ npm install
    ```

## 実行

1. データベース

    ブラウザで http://localhost:9000 に入り、`Adminer`に入ります。
    
    ユーザ名に`root`入力し、パスワードとデータベースには環境構築時に設定したものを入力します。

    SQLコマンドでテーブル作成します。

    ```sql
    SET NAMES utf8;
    SET time_zone = '+00:00';
    SET foreign_key_checks = 0;

    CREATE TABLE `todos` (
      `id` int NOT NULL AUTO_INCREMENT,
      `title` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
      `current_status` int NOT NULL,
      `end_at` datetime NOT NULL,
      `deleted_at` datetime DEFAULT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
    ```

2. バックエンド

    `backend`コンテナにアタッチしたウインドウで左のメニューのSpring Boot Dashboardを開き、`Run`か`Debug`でバックエンドを起動します。
    <img width="auto" alt="image" src="https://github.com/YuuYabu/todoapp_react/assets/25448386/8d987233-0fd2-4d11-8888-9e3a6208301a">


3. フロントエンド

    `frontend`コンテナにアタッチしたウインドウのターミナルを開き、フロントエンドを起動します。
    ```bash
    npm run dev
    ```

ブラウザで http://localhost:5173 を開きます。

## DEMO

### ライトモード
<img width="auto" alt="スクリーンショット 2023-07-28 171720" src="https://github.com/YuuYabu/todoapp_react/assets/25448386/dca5c1bd-590f-4bde-ae69-fc5f541ab8c6">

### ダークモード
<img width="auto" alt="スクリーンショット 2023-07-28 171757" src="https://github.com/YuuYabu/todoapp_react/assets/25448386/8d252f56-8653-44a0-92e4-f9c9d25ec944">
