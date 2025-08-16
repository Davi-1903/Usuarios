# Flask-React

Aplicação extremamente simples (mal feita kkkk) para aprendar a integrar `Flask` com `React`.

## Como executar

Para executar essa brincadeira é pouco complicado, mas vamos lá. Primeiro, é preciso ter o `Python` e o `NodeJS` instalados.

> [!NOTE]
> O projeto, por mais que use `React`, usa um único servidor, o do `Flask`.

1. **Instale todas as dependências**

    - **`/client`**

        ```powershell
        npm install
        ```

    - **`/server`**

        ```powershell
        python -m venv .venv # Ambiente virtual
        .\.venv\Scripts\activate
        pip install -r requirements.txt
        ```

2. **Dentro de `client/` é preciso gerar o `build`**

    ```powershell
    npm run build
    ```

3. **Ainda dentro de `server/`, execute**

    ```powershell
    python app.py
    ```

Se tudo ocorrer bem, a aplicação está rodando em [`http://localhost:5000`](http://localhost:5000)
