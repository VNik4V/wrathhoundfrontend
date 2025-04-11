# Wrath Hound
## A projektről

>A Wrath Hound egy 2D indie fejlesztésű kalandjáték, amely a régi klasszikusok hangulatát ötvözi egy friss és izgalmas élménnyel. A játékosokat egy sötét fantasy világba vezeti, ahol démonokkal és rejtett titkokkal teli helyszínek várják őket. A dinamikus harcrendszer és a lenyűgöző pixel art grafika egy felejthetetlen kalandot kínál. Fedezd fel a világot, harcolj szörnyekkel és gyűjts erősebb fegyvereket, miközben a kaland izgalmas kihívásokat tartogat.

---

## Készítette
- Vörösmarti Mónika
- Tóth Áron
- [GitHub repo](https://github.com/VNik4V/wrathhoundfrontend)
- [Demo](https://wrathhound.netlify.app)

---
### Fejlesztési környezet
- HTML5
- CSS3
- Vanilla Javascript

## Adatbázis
![kép az adatbáziskapcsolatokról](https://i.snipboard.io/hSX4QR.jpg)
>[adatbázis diagram](https://drawsql.app/teams/dszc-baross-2/diagrams/wrathhound)

## Backend

A backend Node.js alapú, Express keretrendszerrel, és MySQL adatbázissal működik. Feladata kommunikációs hidat létesíteni a frontend (játék + weboldal) és az adatbázis között.

- [GitHub repo](https://github.com/VNik4V/wrathhound)

## Frontend

A frontend html, natív css és javascript alapú webes alkalmazás. Feladata kommunikációs hidat létesíteni a felhasználó és a backend között.

### Design
![Design](https://i.snipboard.io/Xd8oPB.jpg)
>[Figma terv](https://www.figma.com/design/vwIB6tSVklWLWYwD9zewmk/Szipi-szupi-nagy-projekt?node-id=183-46&p=f&t=CVBCjGyRJfZdLlQy-0)

### Fájlok
- html
    - csatlakozz.html
    - csj.html
    - forum.html
    - login.html
    - newpost.html
    - post.html
    - profile.html
    - reg.html
 - css
    - csatlakozz.css
    - csj.css
    - forum.css
    - login.css
    - main.css
    - newpost.css
    - post.css
    - profile.css
    - register.css
- js
    - csatlakozz.js
    - ebed.js
    - forum.js
    - game.js
    - login.js
    - newpost.js
    - profile.js
    - register.js
    - theme.js

### Fájlok

1. ###  `index.html`
    
    | Fájlnév         | Típus       | Leírás                          |
    |-----------------|-------------|--------------------------------------------------|
    | `main.css`      | ![CSS](https://img.shields.io/badge/-CSS-blue)         | Általános stíluslap                              |
    | `index.css`     | ![CSS](https://img.shields.io/badge/-CSS-blue)          | Főoldalhoz kapcsolódó stíluslap                   |
    | `index.js`      | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)  | Főoldal működéséhez szükséges logika             |
    | `gameindex.js`  | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)  | Játékletöltés gombok működése               |
    | `theme.js`  | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)  | Sötét és világos mód                |
    | `ebed.js`       | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)  | Húsvéti tojás       |

    ![index](https://i.snipboard.io/G7VupQ.jpg)

2. ###  `forum.html`
    | Fájlnév         | Típus       | Leírás                           |
    |-----------------|-------------|--------------------------------------------------|
    | `main.css`      | ![CSS](https://img.shields.io/badge/-CSS-blue)         | Általános stíluslap                              |
    | `forum.css`  | ![CSS](https://img.shields.io/badge/-CSS-blue)  | A fórumhoz tartozó stíluslap |
    | `forum.js` | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow) | A fórum működéséhez szükséges logika |
    | `theme.js`  | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)  | Sötét és világos mód                |
    | `game.js`  | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)  | Játékletöltés gomb működése               |

3. ### `post.html`

    | Fájlnév         | Típus       | Leírás                           |
    |-----------------|-------------|--------------------------------------------------|
    | `main.css`      | ![CSS](https://img.shields.io/badge/-CSS-blue)         | Általános stíluslap                              |
    | `post.css`  | ![CSS](https://img.shields.io/badge/-CSS-blue)  | A fórumhoz tartozó stíluslap |
    | `post.js` | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow) | A fórum működéséhez szükséges logika |
    | `theme.js`  | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)  | Sötét és világos mód                |
    | `game.js`  | ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)  | Játékletöltés gomb működése               |

    ![post](https://i.snipboard.io/pQC1oA.jpg)

4. ###  `csatlakozz.html`
    ![csatlakozz](https://i.snipboard.io/VWMx6J.jpg)

5. ### `reg.html`
    ![regisztráció](https://i.snipboard.io/eWzSp8.jpg)

6. ### `login.html`
    ![bejelentkezés](https://i.snipboard.io/Vwg7mf.jpg)

7. ### `profile.html`
    ![profil](https://i.snipboard.io/6T71Uz.jpg)

8. ### `newpost.html`
    ![új poszt](https://i.snipboard.io/15JUWs.jpg)