# Configuração do Projeto TypeScript

Este projeto utiliza TypeScript e várias ferramentas associadas para desenvolvimento e teste. Siga as instruções abaixo para configurar o ambiente.

## Instalação

1. **Instalar o TypeScript como dependência de desenvolvimento:**

    ```bash
    npm i typescript --save-dev
    ```

2. **Instalar o pacote `node-typescript`:**

    ```bash
    sudo apt install node-typescript
    ```

3. **Inicializar o projeto TypeScript:**

    ```bash
    npx tsc --init
    ```

4. **Compilar o código TypeScript (opcional):**

    ```bash
    npm tsc
    ```

5. **Instalar `ts-node-dev` para desenvolvimento:**

    ```bash
    npm install ts-node-dev --save-dev
    ```

6. **Instalar `tslint` para linting:**

    ```bash
    npm i tslint --save-dev
    ```

7. **Inicializar configuração do TSLint:**

    ```bash
    npx tslint --init
    ```

8. **Compilar o código TypeScript (opcional):**

    ```bash
    npx tsc
    ```

9. **Executar o projeto com `ts-node-dev`:**

    ```bash
    npx ts-node-dev src/index.ts
    ```

10. **Executar o linting em todos os arquivos TypeScript:**

    ```bash
    npx tslint -c tslint.json 'src/**/*.ts'
    ```

11. **Instalar SQLite3:**

    ```bash
    npm i sqlite3
    ```

12. **Instalar Sequelize e suas dependências:**

    ```bash
    npm i sequelize reflect-metadata sequelize-typescript
    ```

13. **Instalar UUID e seus tipos:**

    ```bash
    npm i uuid @types/uuid
    ```

14. **Instalar Jest e suas dependências para testes:**

    ```bash
    npm i -D jest @types/jest ts-node --save-dev
    ```

15. **Instalar SWC para otimização do Jest:**

    ```bash
    npm i -D @swc/jest @swc/cli @swc/core
    ```

## Scripts

Adicione os seguintes scripts ao seu `package.json`:

```json
"scripts": {
  "test": "npm run tsc -- --noEmit && jest",
  "tsc": "tsc"
}
```

- `test`: Compila o código TypeScript e executa os testes com Jest.
- `tsc`: Compila o código TypeScript.

## Utilização

- Para compilar o código TypeScript, use:

    ```bash
    npm run tsc
    ```

- Para executar o projeto com `ts-node-dev`, use:

    ```bash
    npx ts-node-dev src/index.ts
    ```

- Para executar os testes, use:

    ```bash
    npm test
    ```

- Para executar o linting, use:

    ```bash
    npx tslint -c tslint.json 'src/**/*.ts'
    ```

Siga estas etapas para configurar seu ambiente de desenvolvimento TypeScript com suporte a linting, testes e outras ferramentas importantes.

Este arquivo README.md oferece uma visão geral das etapas necessárias para configurar o seu ambiente de desenvolvimento, incluindo a instalação das dependências e a configuração dos scripts no `package.json`. Se precisar de mais informações ou ajustes, sinta-se à vontade para me avisar!
