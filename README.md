# Datoun
Datoun (DAtabáze TOváren U Nás) is project that maps all Companies that make stuff in Czechia. It is accessible for everyone for free at [https://datoun.cz](https://datoun.cz).

## Tech stack
Datoun uses Vue3 with Carbon design system ([storybook](https://vue.carbondesignsystem.com/?path=/story/carbon--welcome), [website](https://carbondesignsystem.com/)). Backend is an [Algolia](https://dashboard.algolia.com/) database accessed through [Vue Instantsearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/vue/). 

## CI/CD
Deployment is done through GitHub Actions to GitHub Pages for every commit to the main branch.

## Project setup
```
# Install project
npm install

# Compile and hot-reloads for development
npm run serve

# Compile and minify for production
npm run build

# Lint and fix files
npm run lint
```

## Data JSON format
Data is formatted as the following JSON, here comments are added to all fields.

```
{
  "funguje": true,
  "jmeno_firmy": "Nefrito",
  "semafor": "10",
  "kategorie0": [
    "Zdraví a drogerie"
  ],
  "kategorie1": [
    "Zdraví a drogerie > Drogerie"
  ],
  "kategorie2": [
    "Zdraví a drogerie > Drogerie > Parfémy a voňavky"
  ],
  "aliasy": "",
  "popisek_firmy": "Jsme Čeští výrobci parfémů a voňavek. Když se spojí exotická surovina s poctivou českou výrobou, vznikne něco fantastického. Vznikne parfém NEFRITO. Česky u nás znamená překvapující kvalitou...",
  "vyrobny": [
    {
       // ... shortened
    }
  ],
  "poznamky_k_vyrobe": "Kanceláře v Hradci Králové, podle certifikace český výrobek vyrábí v Praze.",
  "eshop": "https://www.nefrito.cz/",
  "logo": "https://cdn.myshoptet.com/usr/www.nefrito.cz/user/banners/logo.png?60563c4f",
}
```

### funguje
Bool, true if company is still operational.

### jmeno_firmy
String, company name.

### semafor
String (with number). This attribute specifies the degree to which the company makets its stuff in Czechia.
- value="0" [ Nevíme, kde vyrábí ] 
- value="10" [ Nevyrábí v České republice ] 
- value="20" [ Částečně vyrábí v České republice ]
- value="30" [ Vyrábí vše v České republice ] 

### kategorie0, kategorie1, kategorie2
Array of strings. Hierary is composed of strings separated by " > ". Company does not have to belong into only leaf categories (kategorie2). The categories can stop at any level including top level. 

Example of simple allowed hierarchy.
```
"kategorie0": [
    "A1"
    "A2"
],
"kategorie1": [
    "A1 > B1"
    "A1 > B2"
],
"kategorie2": [
    "A1 > B1 > C1"
    "A1 > B1 > C2"
],
```

### aliasy
String. Alternative or old names that are related to the company. For example brand names or old names of company.

### popisek_firmy
String. Company description got from the company website. Usually pretty long. Its there because it contains lots of keywords for the company.

### vyrobny
Array of JSONs. All the geographical locations saved in the company JSON are using records from [**obce**](https://data.cesko.digital/obce/1/obce.json) JSON array created by [Česko digital](https://github.com/cesko-digital/obce). 

Sample record of one "obce".
```
{
    "hezkyNazev": "Borohrádek",
    "eDeskyID": "549",
    "souradnice": [
    50.09505054163067,
    16.089249722106842
    ],
    "zkratka": "BOROHRADEK",
    "ICO": "00274739",
    "nazev": "MĚSTO BOROHRÁDEK",
    "datovaSchrankaID": "jyybfef",
    "pravniForma": {
    "type": 801,
    "label": "Obec"
    },
    "mail": [
    "podatelna@mestoborohradek.cz"
    ],
    "adresaUradu": {
    "ulice": "Husova",
    "cisloDomovni": "240",
    "cisloOrientacni": null,
    "obec": "Borohrádek",
    "obecKod": "576131",
    "PSC": "51724",
    "castObce": "Borohrádek",
    "kraj": "Královéhradecký",
    "adresniBod": "21511888"
    }
},
```
### poznamky_k_vyrobe
String. Short, very important string which is custom written to give speciffic information about where the company is manufacturing its products. This is displayed in the tile.

### eshop
String with URL. Link to the company eshop/website.

### logo
String with URL. Link to the company logo.


## Help develop Datoun
All contributions welcome, join us at our [Discord server](https://discord.gg/aDbAabNUeJ).