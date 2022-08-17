# Katalog českých výrobků

Build KATALOGU na testování (tento repozitář):
* https://smidra.github.io/vyrobky-katalog/dist/
* https://github.com/Smidra/vyrobky-katalog (REPO)

Live build ADMIN repozitáře pro vkládání:
* https://smidra.github.io/vyrobky-admin/
* https://github.com/Smidra/vyrobky-admin (REPO)


## TODO
* [ ] Udělat to celé od píky hezky.


## Project setup
**Všechno smazat a vytvořit něco nového, lepšího, funkčního.** Především pak nová věc musí umět:
* Asi je vhodné pro tvorbu použít meilisearch instantsearch
* Vyhledávat plaintextem napříč poli
* Mít menu, (které má i možnost submenu). V menu jsou položky (jako složky) a v těch jsou rozřazené jako listy kategorie. Kategorie (stringy které mají přiřazené továrny) jsou vždy list ve struktuře menu.
  * Při kliknutí na list menu se vyhledají výsledky filtru přes tuto kategorii. (Při kliknutí na "Trička" se vyhledají všechny firmy, které mají alespoň v jedné své továrně kategorii "trička")
  * Při kliknutí na ne-list ve struktuře menu se vyhledají výsledky filtrované kategoriemi všech listů pod tímto ne-listem ve funkci OR. (Při kliknutí na "oblečení" se vyhledá filtr tento >> trička OR kalhoty OR sukně ...)

## Databáze
* Endpoint
  * https://wiki.smid.io
* Bearer token pro vyhledávání
  * Authorization:Bearer 66cad08d67ad93aeb7549e78fe084c755946be1db4a4144c7a6de9ef32eb405f
* Index (jméno schéma)
  * firmy
* Token může v databázi všechno. Zatím. Pro testování doporučuji Postman + Meilisearch https://docs.meilisearch.com/learn/cookbooks/postman_collection.html#postman-collection-for-meilisearch
* Vkládání věcí do databáze lze prohlédnout ve velice alfa stádiu na https://smidra.github.io/vyrobky-admin/ <-- To jenom abyste nemuseli vždy startovat postmana. 

## Současná struktura databáze
```
{
    "id": 1,
    "jmeno_firmy": "Alpa",
    "popisek_firmy": "Historie společnosti ALPA je historií stabilní a prosperující společnosti. Obliba značky ALPA přetrvala dlouhá desetiletí...",
    "eshop": "https://www.alpa.cz/cs/e-shop",
    "vyrobny": [
        {
            "lokalita": "Velké Meziříčí",
            "popisek_vyroby": "Všechna výroba probíhá v závodu ve Velkém meziříčí.",
            "kategorie": [
                "Zubní pasty",
                "Masážní gely",
                "Holení"
            ]
        },
        {
            "lokalita": "Malé Meziříčí",
            "popisek_vyroby": "Žádná výroba se neodehrává v malinké vsi Malé meziříčí",
            "kategorie": [
                "Zubní pasty",
                "Mašinky"
            ]
        }
    ]
}
```
