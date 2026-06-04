# 😊 Usuários

Aplicação de login extremamente simples para aprender a integrar `FastAPI`, `Tailwind`, `React` e `MySQL`.

## 💻 Como executar

Para executar essa brincadeira é um pouco complicado, mas vamos lá. Primeiro, é preciso ter o `Python` e o `NodeJS` instalados.

1. **Clone o repositório e acesse-o**

    ```git
    git clone https://github.com/Davi-1903/Usuarios.git
    cd Usuarios
    ```

2. **Instale todas as dependências**
    - **`client/`**

        ```powershell
        npm install --legacy-peer-deps
        ```

    - **`server/`**

        ```powershell
        uv sync
        # ----------- ou -----------
        pip install -r requirements.txt
        ```

3. **Crie um arquivo `.env` na raiz do projeto e adicione**

    ```env
    # ============================= AUTENTICAÇÃO =============================
    SECRET_KEY=<SUA-CHAVE-SUPER-SECRETA>
    REFRESH_TOKEN_EXPIRE_DAYS=<DIAS>
    TOKEN_EXPIRE_MINUTES=<MINUTOS>
    ALGORITHM=HS256

    # ============================ BANCO DE DADOS ============================
    DB_USER=root
    DB_PASSWORD=<SENHA-PARA-O-BANCO-DE-DADOS>
    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=db_users
    ```

4. **Dentro de `server/` inicie o servidor**

    ```powershell
    uvicorn app:app
    ```

5. **Dentro de `client/` inicie o servidor**

    ```powershell
    npm run dev
    ```

> Como baixar o gerenciador `UV`: [tutorial](https://docs.astral.sh/uv/getting-started/installation/)

Se tudo ocorrer bem, a aplicação está rodando em [`http://localhost:3000`](http://localhost:3000)

## 🐋 Deploy com Docker

1. **Clone o repositório e acesse-o**

    ```git
    git clone https://github.com/Davi-1903/Usuarios.git
    cd Usuarios
    ```

2. **Crie um arquivo `.env` na raiz do projeto e adicione**

    ```env
    # ============================= AUTENTICAÇÃO =============================
    SECRET_KEY=<SUA-CHAVE-SUPER-SECRETA>
    REFRESH_TOKEN_EXPIRE_DAYS=<DIAS>
    TOKEN_EXPIRE_MINUTES=<MINUTOS>
    ALGORITHM=HS256

    # ============================ BANCO DE DADOS ============================
    DB_USER=root
    DB_PASSWORD=<SENHA-PARA-O-BANCO-DE-DADOS>
    DB_HOST=database
    DB_PORT=3306
    DB_NAME=db_users
    ```

3. **Crie e inicialize o container**

    ```powershell
    docker compose up -d
    ```

Se tudo ocorrer bem, a aplicação está rodando em [`http://localhost:3000`](http://localhost:3000)

## ⚖️ Licença

Essa aplicação tem como objetivo o estudo do framework `FastAPI` do Python e a sua integração com a biblioteca `React` do JavaScript, além do uso de um banco de dados relacional (`MySQL`) e conteinerização com `Docker`.

- [LICENSE](LICENSE)
