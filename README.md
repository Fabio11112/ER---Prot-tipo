
1.Instalação do BackOffice

    1.1-Repositório do github (Abrir a consola do terminal na localização  C:\Users\(seu nome de utilizador associado)\(Herd)
    git clone https://github.com/Fabio11112/BackOffice_ER (branch main)
    //--------------------------------------------
    Abrir o projeto, o ambiente usado foi visual studio, por isso para abrir diretamente fazer:
    cd BackOffice_ER
    code .
    //--------------------------------------------
    Necessário instalar o composer , php, o herd e npm.
    e instalar posteriormente no projeto na consola:
    ->composer install
    ->npm install
    ->herd, tutorial de como instalar: https://www.youtube.com/watch?v=DKnn8TlJ4MA&t=817s&ab_channel=NetNinja
    Posteriormente de estar realizada a instalação destes componentes:
    inserir na consola: 
    qualquer dúvida poderam ver este link, mas para usar o herd realizar os comandos descritos depois do link:
    https://herd.laravel.com/docs/windows/getting-started/sites#linking-an-existing-site
    ->herd link
    ->herd link custom-domain

    Para correr o BackOffice, abrir 2 consolas no mesmo projeto:
    ->npm run dev (uma correrá este comando, onde será para poder correr o vite, associado ao javaScript e ao estilos)
    ->php artisan serve (este gerará um url onde conterá um ip do local host e abrir esse url no browser, essencial ser este para ser possível a comunicação entre a app e o backOffice)

    (caso que o último comando no funcione, executar "php -S 127.0.0.1:8000 -t public/" em lugar de php artisan serve)
 

Nota 1: no ficheiro de variáveis de ambiente (.env) 
atualizar a variavel DB_DATABASE para o seu caminho absoluto:
DB_DATABASE=C:\Users\(para seu nome de user)\Herd\BackOffice_ER\database\database.sqlite

Nota 2: Abrir a página web em 127.0.0.1:8000 e NÃO no link fornecido pelo Herd.

2.Instalação do Titanium
Repositório do github:
    git clone https://github.com/Fabio11112/ER---Prot-tipo (ir para a branch final_final)
    2.1-Instalar o titanium    https://downloads.titaniumsdk.com/
    2.2-Instalar extensão do Titanium no Visual Studio Code
    2.3-Instalar Node.js
    2.3-Instalar o android studio   https://developer.android.com/studio?hl=pt-br
    2.3.1-No Android Studio instalar o SDK Platform Android 14.0 e no SDK Tools o Android Emulatoe
    2.4-instalar o java jdk 17 https://www.oracle.com/java/technologies/downloads/
    2.5-criar as variaveis de ambiente de utilizador e de sistema, as duas com o mesmo nome, "JAVA_JDK" com valor igual ao caminho onde se encontra instalado no nosso caso ("c:\\ProgramFiles\Java\jdk-17"). Estas devem ser dentro do "Path"
    2.6-Executar o comando Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser- (Get-ExecutionPolicy, para verificar se enta em "RemoteSigned")
    (NOTA:existem em anexo videos relativos a instalaçao do Titanium para uma maior compreensão)


    Para verificar o que pode faltar na instalação, na linha de comandos inserir "ti setup". Depois inserir "k" para ver os elementos instalados e faltantes

    https://drive.google.com/file/d/10806LvKXiLRmL5kc05gPl7R4PMW-sPWH/view?usp=sharing -> Video 1
    https://drive.google.com/file/d/1QGpzSRvo6Mfb9Oc4-fi33qAfanoc9UzK/view?usp=sharing -> Video 2
    https://youtu.be/obUsQMa79Wg                                                       -> Video 3 
    
