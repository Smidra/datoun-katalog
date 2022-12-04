# DATOUN Katalog
"DAtabáze TOváren U Nás" is an opensource database of Czech factories. It's goal is to provide simple search interface for those searching for products made in Czechia.

All contributions welcome ❤️

## Tech stack
The whole project consists of 3 parts, all licensed under the MIT license.

- Datoun admin [admin.datoun.cz](https://admin.datoun.cz) + [REPO](https://github.com/Smidra/datoun-admin)
  - Vue3 app for inserting new companies into the database
- Datoun katalog [datoun.cz](https://datoun.cz) + [REPO](https://github.com/Smidra/datoun-katalog)
  - Vue3 + instantsearch app for browsing the database.
- Algolia backend

## Installation
```
git clone git@github.com:Smidra/datoun-admin.git
npm install
npm run dev
```
CD pipeline build every version in main and pushes it to production.

## UI kit
For UI components we try to use [NaiveUI](https://www.naiveui.com) where possible. Datoun strives to be a serious website, so the design should not be too playfull and over the head filled with animations. Naive UI is a nice alternative to the sterile IBM design system, Google is too fun, and Fluent does not have a library for Vue3.

## Database
* Algolia ID
  * S27OT8U78J
* Bearer token
  * Authorization:Bearer 39e5cf3041647ce2f68c09b8e477eb8c
* Index
  * firmy

## Mockup JSON
| Key           | Validation           | Description  |
| :------------- |:-------------| :-----|
| id |              |  Seconds since Epoch  |
| jmeno_firmy   |   |  Name of the company  |
| aliasy  |         |  [Array of sitrings] Brands from the company, aliases...  |
| popisek_firmy  |  |  Short description filled with keywords. Preferably from the company website.  |
| poznamky_k_vyrobe  |   |  Do they make everything in Czechia? Are there exceptions?  |
| eshop  |          |  URL where to buy products from the company  |
| logo  |           |  URL of a logo of the company  |
| funguje  |        |  [Boolean] Is the company still operating?  |
| vyrobny  |        |  [Array of VYROBNY objects] One for every factory the company has |

### VYROBNY object
| Key        | Validation           | Description  |
| :------------- |:-------------| :-----|
| lokalita  |     |  [OBEC object from obce.json] A town where the factory is  |
| kategorie0  |   |  [ARRAY of strings] Higest level categories of the products made in this factory |
| kategorie1  |   |  [ARRAY of strings] Categories of the products made in this factory 1 level deep |
| kategorie2  |   |  [ARRAY of strings] Categories of the products made in this factory 2 level deep |

```
{
    "id": 1,
    "jmeno_firmy": "Alpa",
    "aliasy": [
      "Francovka",
      "Lesana",
      "Luna",
      "Amica",
      "Apiko",
      "Aviril",
      "Pedik",
      "Sypsi",
      "Batole",
      "Windsor",
      "Farao",
      "Fougere",
      "Chypre",
      "Classique"
    ],
    "popisek_firmy": "Historie společnosti ALPA je historií stabilní a prosperující společnosti. Obliba značky ALPA přetrvala dlouhá desetiletí. Po předválečné etapě výroby v Brně se závod v roce 1948 přestěhoval do Velkého Meziříčí. V roce 1994 proběhla privatizace a společnost ALPA je dnes moderním a perspektivním podnikem. Vlastnictví tradiční české značky a přes 100 let trvající spokojenost našich zákazníků je nejcennějším klenotem, který zdobí značku ALPA.",
    "poznamky_k_vyrobe": "Všechna výroba probíhá v závodu ve Velkém meziříčí.",
    "eshop": "https://www.alpa.cz/cs/e-shop",
    "logo": "https://www.alpa.cz/images/stories/Aktuality/2017/thumbnails/thumbnails/AL_logoALPA_RGB.jpg",
    "funguje": true,
    "vyrobny": [
        {
            "lokalita": {...obec z obce.json...}, 
            "kategorie0": [
                "Drogerie"
            ],
            "kategorie1": [
                "Drogerie > Zubní pasty",
                "Drogerie > Masážní gely",
                "Drogerie > Holení"
            ]
        }
    ]
}
```
