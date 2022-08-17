# Katalog českých výrobků

Zatím pouze minimal working protoype pro testování vkládání
* Live at > https://smidra.github.io/vyrobky-katalog/dist/ <

Repozitář pro vytváření formuláře na vkládání je k dispozici na
* https://github.com/Smidra/vyrobky-admin

Tato Vue 3 aplikace je od úpravy (především insertu) dat v Meilisearch databázi českých výrobků.
Vyvíjím ve Vue 3 + Formkit + Axios

## TODO
* [x] Zařídit odeslání JSONu do databáze
* [x] Zařídit přidávání a odebírání výroben pomocí plus tlačítka.
* [ ] Potvrdit uživateli odeslání do databáze.
* [ ] Základně nastylovat aby to trošičku vypadalo.
* [ ] Jak se budou přidávat ikonky?
* [ ] Pro jednu výrobnu musí být možno přidat libovolně kategorií
* [ ] Validace polí na frontendu + validace polí na backendu (jasně definovat požadavky na JSON)
* [ ] Jak přesně do databáze přidávat obec - Geotag? Jmono obce, poštovní adresa? Asi by se hodilo našeptávání...
* [ ] Našeptávání -> Tato firma už v databázi je.
* [ ] Našeptávání -> Měli jste na myslí tuto kategorii?
* [ ] ID firem jsou nyní sekundy epochy - to je dirty řešení - nastavil jsem ID jako sortable atribut - lze si vzít nejvyšší použité, ale i při tom může dojít ke kolizi


## Project setup
**Všechno smazat a vytvořit něco nového, lepšího, funkčního.** Především pak nová věc musí umět:
* Vyhledávat plaintextem napříč poli
* Mít menu, (které má i možnost submenu). V menu jsou položky (jako složky) a v těch jsou rozřazené jako listy kategorie. Kategorie (stringy které mají přiřazené továrny) jsou vždy list ve struktuře menu.
  * Při kliknutí na list se vyhledají výsledky filtru přes tuto kategorii. 
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