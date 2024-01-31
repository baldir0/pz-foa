# Aplikacja do zamawiania jedzenia online

## Opis aplikacji
Aplikacja do zamawiania jedzenia online, z dodatkową opcją pozwalającą na wygodne zarządzanie restauracją oraz dostępnymi w nich menu przez użytkowników posiadających odpowiednie uprawnienia.

## Spis treści
- [Funkcjonalności](#funkcjonalności)
- [Wymagania](#wymagania)
- [Instalacja](#instalacja)
- [Uruchamianie](#uruchamianie)
- [Struktura projektu](#struktura-projektu)

## Funkcjonalności
* Aplikacja pozwala na zamawianie jedzenia
* Aplikacja pozwala na tworzenie konta użytkownika
* _Aplikacja pozwala na tworzenie profili restauracji_
* Aplikacja pozwala na tworzenie, edycje oraz usuwanie menu dla poszczególnych restauracji
* Aplikacja pozwala na tworzenie, edycje oraz usuwanie produktów dla poszczególnych menu

## Wymagania
* Node/JavaScript - [nodejs.org](https://nodejs.org/en/)
  * Express​
  * npm - node package manager
* MySQL​
* React​
* Vite

## Instalacja
```{bash}
git clone https://github.com/baldir0/pz-foa.git
cd pz-foa
```
Dla front-endu
```{bash}
cd pz-foa-fe/
npm i
```
Dla back-endu
```{bash}
cd pz-foa-be/
npm i
```

## Uruchamianie
1. Uruchom serwer
   ```{bash}
   cd pz-foa-be/
   npm run dev
   ```
2. Uruchom klienta
   ```{bash}
   cd pz-foa-fe/
   npm run dev
   ```

## Struktura projektu
### */pz-foa-be* - back-end
* */src* 

### */pz-foa-fe* - front-end
* */src* - Cześć aplikacji nie widoczna dla użytkownika
* */public* - Cześć aplikacji widoczna dla użytkownika
* */public/assets* - Assety aplikacji
