## Návrh Výukového Serveru pro Teoretickou Informatiku

V rámci diplomových a bakalářských prací vzniká výukový server pro předměty teoretické informatiky. Server se skládá ze sady dynamických webových stránek, které studentům umožňují pochopení různých typů úloh a problémů. Na rozdíl od běžných výukových textů s omezeným počtem ukázkových příkladů tyto stránky dokážou generovat libovolný počet ukázek na základě vstupů od uživatele. Cílem této konkrétní bakalářské práce je vytvořit komponentu pro pochopení počítání složitosti algoritmů, zejména s využitím tzv. amortizované složitosti.

### Funkce webových stránek

Dynamické webové stránky budou umožňovat uživateli následující funkce:

1. **Simulace běhu algoritmů**  
   Zobrazit simulaci běhu alespoň tří různých algoritmů, u kterých je vhodné složitost analyzovat pomocí amortizované složitosti.

2. **Možnosti zadávání vstupů pro algoritmy**
   - **Ručně**: Uživatel zadá vstup uživatelsky přívětivým způsobem.
   - **Náhodný generátor**: Vstup lze generovat zcela náhodně na základě nastavených parametrů.
   - **Ukázkové vstupy**: Možnost vygenerování různě velkých ukázkových vstupů, např. nejhorší nebo nejlepší případ.

3. **Zobrazení informací při simulaci algoritmů**
   - **Aktuální stav výpočtu**: Informace o obsahu různých datových struktur apod.
   - **Počet provedených kroků**.
   - **Aktuální hodnota potenciálu nebo naspořených mincí**: Zobrazení buď potenciálové metody, nebo účetní metody.

4. **Odvození složitosti**
   Ke každému algoritmu bude přímo na stránce zobrazena statická stránka s odvozením jeho složitosti.

### Spolupráce mezi studenty

Studenti řešící toto zadání s rozdílným číslem v názvu mohou (ale nemusí) spolupracovat tak, aby výsledek obsahoval společné uživatelské rozhraní. Každý student však bude implementovat odlišné tři algoritmy.
