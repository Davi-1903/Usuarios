# Usuários

Aplicação de login extremamente simples para aprendar a integrar `Flask`, `Tailwind`, `React` e `MySQL`.

## Como executar

Para executar essa brincadeira é um pouco complicado, mas vamos lá. Primeiro, é preciso ter o `Python` e o `NodeJS` instalados.

> [!NOTE]
> O projeto, por mais que use `React`, usa um único servidor, o do `Flask`.

1. **Clone o repositório**

    ```git
    git clone https://github.com/Davi-1903/Usuarios.git
    ```

2. **Instale todas as dependências**

    - **`client/`**

        ```powershell
        npm install
        ```

    - **`server/`**

        ```powershell
        pip install -r requirements.txt
        ```

3. **Dentro de `client/` é preciso gerar o `build`**

    ```powershell
    npm run build
    ```

4. **Crie um arquivo `.env` na raiz do projeto e adicione**

    ```env
    SECRET_KEY='<CHAVE SECRETA>'
    DATABASE_URI='mysql+pymysql://root:<SENHA?>@localhost:<PORTA>/db_users'
    ```

5. **Dentro de `server/`, execute**

    ```powershell
    python app.py
    ```

> [!TIP]
> Use ambiente virtual 😉

Se tudo ocorrer bem, a aplicação está rodando em [`http://localhost:5000`](http://localhost:5000)
