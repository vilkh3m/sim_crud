# Aplikacja CRUD z FastAPI, React i PostgreSQL

## 📖 Co to jest?

To kompletna aplikacja webowa do zarządzania danymi (CRUD - Create, Read, Update, Delete). Projekt pokazuje jak stworzyć pełną aplikację z:
- **Backendem** (FastAPI) - serwer obsługujący logikę biznesową
- **Frontendem** (React) - interfejs użytkownika w przeglądarce
- **Bazą danych** (PostgreSQL) - przechowywanie danych
- **Autentykacją** (JWT) - bezpieczne logowanie użytkowników

Całość uruchamiana jest w Dockerze, co oznacza że działa tak samo na każdym komputerze!

## 🎯 Co nauczysz się z tego projektu?

- Jak stworzyć REST API w FastAPI
- Jak zabezpieczyć aplikację (JWT, hashowanie haseł)
- Jak połączyć React z backendem
- Jak używać bazy danych PostgreSQL z SQLAlchemy
- Jak uruchomić aplikację w Dockerze
- Jak walidować dane (Pydantic)
- Jak obsługiwać błędy w aplikacji webowej

## 🚀 Funkcje aplikacji

- ✅ **Rejestracja i logowanie** - każdy użytkownik ma swoje konto
- ✅ **Chronione dane** - użytkownik widzi tylko swoje elementy
- ✅ **CRUD** - tworzenie, wyświetlanie, edycja i usuwanie elementów
- ✅ **Walidacja** - sprawdzanie poprawności danych (np. prawidłowy email)
- ✅ **Responsywny interfejs** - ładnie wygląda na każdym urządzeniu
- ✅ **Obsługa błędów** - czytelne komunikaty gdy coś pójdzie nie tak

## 📋 Co jest potrzebne do uruchomienia?

Musisz mieć zainstalowane:
- **Docker** - platforma do uruchamiania kontenerów
- **Docker Compose** - narzędzie do zarządzania wieloma kontenerami

> 💡 **Dla początkujących**: Docker to jak "wirtualne pudełko" w którym możesz uruchomić aplikację z wszystkimi jej zależnościami. Dzięki temu nie musisz instalować Python, Node.js, PostgreSQL itp. - Docker zrobi to za Ciebie!

### Instalacja Docker

**macOS:**
1. Pobierz [Docker Desktop dla Mac](https://www.docker.com/products/docker-desktop)
2. Zainstaluj i uruchom Docker Desktop

**Windows:**
1. Pobierz [Docker Desktop dla Windows](https://www.docker.com/products/docker-desktop)
2. Zainstaluj i uruchom Docker Desktop

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Dodaj siebie do grupy docker (żeby nie używać sudo)
sudo usermod -aG docker $USER
```

## 🛠️ Jak uruchomić aplikację? (Krok po kroku)

### Krok 1: Przejdź do katalogu projektu

Otwórz terminal i przejdź do folderu z projektem:

```bash
cd ścieżka/do/crud_web
```

### Krok 2: Skopiuj plik z ustawieniami

```bash
cp .env.example .env
```

> 💡 **Co to robi?** Plik `.env` zawiera ustawienia aplikacji (np. hasła do bazy). Kopiujemy szablon `.env.example` i tworzymy z niego plik `.env`.

### Krok 3: Wygeneruj bezpieczny klucz (WAŻNE!)

Otwórz plik `.env` w edytorze tekstu i znajdź linię z `SECRET_KEY`. Zamień wartość na nową, wygenerowaną przez:

```bash
openssl rand -hex 32
```

Skopiuj wygenerowany tekst i wklej go jako wartość `SECRET_KEY` w pliku `.env`.

> ⚠️ **Dlaczego to ważne?** Ten klucz służy do szyfrowania tokenów JWT. Bez zmiany domyślnego klucza, twoja aplikacja nie będzie bezpieczna!

### Krok 4: Uruchom aplikację

```bash
docker-compose up --build
```

> 💡 **Co się dzieje?**
> - Docker pobiera potrzebne obrazy (może potrwać przy pierwszym uruchomieniu)
> - Buduje 3 kontenery: bazę danych (PostgreSQL), backend (FastAPI) i frontend (React)
> - Uruchamia wszystkie serwisy

**Pierwsze uruchomienie może potrwać 5-10 minut!** Poczekaj aż zobaczysz komunikat:
```
crud_backend   | INFO:     Application startup complete.
```

### Krok 5: Otwórz aplikację w przeglądarce

Wpisz w przeglądarce: `http://localhost`

Powinieneś zobaczyć stronę logowania! 🎉

## 🎮 Jak korzystać z aplikacji?

### 1. Zarejestruj się

- Kliknij "Nie masz konta? Zarejestruj się"
- Wypełnij formularz:
  - **Email** - wpisz poprawny adres email
  - **Nazwa użytkownika** - min. 3 znaki
  - **Hasło** - min. 6 znaków
  - **Potwierdź hasło** - wpisz to samo hasło
- Kliknij "Zarejestruj się"

### 2. Zaloguj się

- Wpisz swoją nazwę użytkownika i hasło
- Kliknij "Zaloguj się"
- Zostaniesz przekierowany do panelu głównego

### 3. Zarządzaj elementami

- **Dodaj element** - kliknij "Dodaj nowy", wypełnij tytuł i opis
- **Edytuj element** - kliknij "Edytuj" przy elemencie
- **Usuń element** - kliknij "Usuń" (pojawi się potwierdzenie)

### 4. Wyloguj się

Kliknij przycisk "Wyloguj" w prawym górnym rogu

## 📚 Dodatkowe zasoby

### Testowanie API

Możesz przetestować API bezpośrednio w przeglądarce:
- Otwórz: `http://localhost:8000/docs`
- Zobaczysz interaktywną dokumentację Swagger
- Możesz tam testować wszystkie endpointy

### Sprawdzanie logów

Jeśli coś nie działa, sprawdź co się dzieje w kontenerach:

```bash
# Wszystkie logi
docker-compose logs

# Tylko backend
docker-compose logs backend

# Tylko frontend
docker-compose logs frontend

# Tylko baza danych
docker-compose logs postgres

# Logi na żywo (nowe wpisy pokazują się automatycznie)
docker-compose logs -f
```

## 🏗️ Jak zbudowana jest aplikacja?

### Struktura katalogów

```text
crud_web/
├── backend/                 # Serwer FastAPI
│   ├── main.py             # Główny plik - endpointy API
│   ├── models.py           # Modele bazy danych (User, Item)
│   ├── schemas.py          # Schematy walidacji (Pydantic)
│   ├── database.py         # Połączenie z PostgreSQL
│   ├── auth.py             # Logika JWT i hashowanie haseł
│   ├── crud.py             # Funkcje do operacji na bazie
│   ├── config.py           # Ustawienia z pliku .env
│   ├── requirements.txt    # Biblioteki Python
│   ├── Dockerfile          # Jak zbudować kontener backendu
│   └── .env.example        # Przykładowe zmienne środowiskowe
│
├── frontend/               # Aplikacja React
│   ├── src/
│   │   ├── components/     # Komponenty React
│   │   │   ├── Login.js        # Strona logowania
│   │   │   ├── Register.js     # Strona rejestracji
│   │   │   └── Dashboard.js    # Panel główny z CRUD
│   │   ├── App.js          # Główny komponent, routing
│   │   ├── api.js          # Komunikacja z backendem
│   │   ├── AuthContext.js  # Zarządzanie stanem logowania
│   │   ├── App.css         # Style aplikacji
│   │   └── index.js        # Punkt wejścia React
│   ├── public/
│   │   └── index.html      # Szablon HTML
│   ├── package.json        # Zależności Node.js
│   ├── nginx.conf          # Konfiguracja serwera Nginx
│   ├── Dockerfile          # Jak zbudować kontener frontendu
│   └── .env                # URL do backendu
│
├── docker-compose.yml      # Konfiguracja wszystkich kontenerów
├── .env.example            # Przykładowe zmienne środowiskowe
├── .gitignore              # Pliki ignorowane przez Git
└── README.md               # Ten plik!
```

### Jak to działa?

1. **Użytkownik** otwiera przeglądarkę → `http://localhost`
2. **Nginx** (w kontenerze frontend) serwuje pliki React
3. **React** wysyła żądania do → `http://localhost:8000`
4. **FastAPI** (backend) odbiera żądanie, sprawdza JWT token
5. **SQLAlchemy** wykonuje operacje na bazie **PostgreSQL**
6. **FastAPI** zwraca JSON do React
7. **React** wyświetla dane użytkownikowi

### Technologie użyte w projekcie

**Backend:**
- **FastAPI** - szybki framework do tworzenia API
- **SQLAlchemy** - ORM do pracy z bazą danych
- **Pydantic** - walidacja danych
- **python-jose** - tworzenie i weryfikacja tokenów JWT
- **passlib + bcrypt** - hashowanie haseł
- **uvicorn** - serwer ASGI

**Frontend:**
- **React** - biblioteka do budowy interfejsu
- **React Router** - nawigacja między stronami
- **Axios** - wysyłanie zapytań HTTP
- **Context API** - zarządzanie stanem (logowanie)

**Baza danych:**
- **PostgreSQL** - relacyjna baza danych

**DevOps:**
- **Docker** - konteneryzacja aplikacji
- **Docker Compose** - orkiestracja kontenerów
- **Nginx** - serwer HTTP dla frontendu

## 🔐 Bezpieczeństwo - Jak aplikacja chroni Twoje dane?

Ta aplikacja używa profesjonalnych metod zabezpieczeń:

1. **Hashowanie haseł (bcrypt)**
   - Hasła NIE są zapisywane w czystej postaci
   - Używany jest algorytm bcrypt z solą
   - Nawet administrator bazy nie może zobaczyć Twojego hasła

2. **Tokeny JWT (JSON Web Tokens)**
   - Po zalogowaniu dostajesz zaszyfrowany token
   - Token wygasa po 30 minutach (musisz się zalogować ponownie)
   - Token jest wysyłany z każdym żądaniem do API

3. **Autoryzacja**
   - Każdy endpoint sprawdza czy użytkownik jest zalogowany
   - Użytkownik widzi tylko swoje dane
   - Nie można edytować/usuwać cudzych elementów

4. **Walidacja danych (Pydantic)**
   - Email musi być poprawny
   - Hasło min. 6 znaków
   - Wszystkie dane są sprawdzane przed zapisem

5. **CORS (Cross-Origin Resource Sharing)**
   - Tylko zaufane domeny mogą wysyłać żądania
   - Ochrona przed atakami XSS

## 🔧 Zmienne środowiskowe - Co oznaczają?

Plik `.env` zawiera ustawienia aplikacji:

```env
# === BAZA DANYCH ===
POSTGRES_USER=admin              # Użytkownik PostgreSQL
POSTGRES_PASSWORD=admin123       # Hasło do bazy (zmień na produkcji!)
POSTGRES_DB=cruddb              # Nazwa bazy danych

# === BACKEND ===
# URL połączenia z bazą (format: postgresql://user:password@host:port/database)
DATABASE_URL=postgresql://admin:admin123@postgres:5432/cruddb

# Tajny klucz do szyfrowania JWT (KONIECZNIE ZMIEŃ!)
SECRET_KEY=your-super-secret-key-change-this

# Algorytm szyfrowania JWT
ALGORITHM=HS256

# Ile minut token jest ważny (30 = pół godziny)
ACCESS_TOKEN_EXPIRE_MINUTES=30

# === FRONTEND ===
# Gdzie React ma szukać API
REACT_APP_API_URL=http://localhost:8000
```

> ⚠️ **WAŻNE**: W produkcji zmień wszystkie hasła i klucze na bezpieczne!

## 📊 API Endpoints - Lista wszystkich ścieżek

### Autentykacja (publiczne - nie wymagają logowania)

- **`POST /auth/register`** - Załóż nowe konto
  ```json
  {
    "email": "jan@example.com",
    "username": "jan123",
    "password": "mojhaslo"
  }
  ```

- **`POST /auth/login`** - Zaloguj się
  ```json
  {
    "username": "jan123",
    "password": "mojhaslo"
  }
  ```
  Zwraca: `{"access_token": "eyJ...", "token_type": "bearer"}`

- **`GET /auth/me`** - Sprawdź kto jest zalogowany
  Wymaga: Header `Authorization: Bearer {token}`

### Items (chronione - wymagają tokena JWT)

- **`GET /items`** - Pobierz listę swoich elementów
- **`GET /items/{id}`** - Pobierz szczegóły jednego elementu
- **`POST /items`** - Stwórz nowy element
  ```json
  {
    "title": "Mój element",
    "description": "Opis elementu"
  }
  ```
- **`PUT /items/{id}`** - Zaktualizuj element
- **`DELETE /items/{id}`** - Usuń element

> 💡 **Wskazówka**: Wszystkie endpointy Items wymagają nagłówka:
> `Authorization: Bearer {twój_token}`

## 🛑 Zatrzymanie i usuwanie aplikacji

### Zatrzymaj aplikację (dane zostają)

```bash
docker-compose down
```

### Zatrzymaj i usuń wszystkie dane

```bash
docker-compose down -v
```

> ⚠️ Opcja `-v` usuwa volume z bazą danych - **wszystkie dane zostaną utracone!**

## 🔄 Zarządzanie aplikacją

### Restart wszystkich kontenerów

```bash
docker-compose restart
```

### Restart tylko backendu

```bash
docker-compose restart backend
```

### Odbuduj kontenery po zmianach w kodzie

```bash
docker-compose up --build
```

### Uruchom w tle (bez wyświetlania logów)

```bash
docker-compose up -d
```

## 🐛 Częste problemy i rozwiązania

### 1. Problem: "Port is already allocated" (port zajęty)

**Przyczyna**: Inny program używa portu 80 lub 8000

**Rozwiązanie**: Zmień porty w `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "8001:8000"  # Zamiast 8000:8000

  frontend:
    ports:
      - "81:80"      # Zamiast 80:80
```

Teraz frontend będzie na: `http://localhost:81`

### 2. Problem: "database admin does not exist"

**Przyczyna**: Stary volume z bazą danych

**Rozwiązanie**:

```bash
docker-compose down -v          # Usuń stare dane
docker-compose up --build       # Uruchom od nowa
```

### 3. Problem: "Cannot connect to backend"

**Przyczyna**: Backend się nie uruchomił lub jest problem z CORS

**Rozwiązanie**:

```bash
# Sprawdź logi backendu
docker-compose logs backend

# Restart backendu
docker-compose restart backend
```

### 4. Problem: "bcrypt error" lub "password error"

**Przyczyna**: Problem z biblioteką bcrypt

**Rozwiązanie**:

```bash
docker-compose down
docker-compose build --no-cache backend
docker-compose up
```

### 5. Problem: "Cannot read properties of null (reading 'username')"

**Przyczyna**: Token wygasł lub jest nieprawidłowy

**Rozwiązanie**: Wyloguj się i zaloguj ponownie

## 🚀 Tryb deweloperski (dla programistów)

Jeśli chcesz edytować kod i widzieć zmiany na żywo (bez Dockera):

### Backend

```bash
# 1. Przejdź do folderu backend
cd backend

# 2. Stwórz wirtualne środowisko Python
python -m venv venv

# 3. Aktywuj środowisko
source venv/bin/activate        # Linux/Mac
# lub
venv\Scripts\activate           # Windows

# 4. Zainstaluj zależności
pip install -r requirements.txt

# 5. Skopiuj i edytuj .env (zmień localhost w DATABASE_URL)
cp .env.example .env

# 6. Uruchom serwer (auto-reload przy zmianach)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend dostępny: `http://localhost:8000`

### Frontend

```bash
# 1. Przejdź do folderu frontend
cd frontend

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski
npm start
```

Frontend dostępny: `http://localhost:3000`

> 💡 W trybie dev musisz mieć uruchomiony PostgreSQL lokalnie lub w Dockerze!

## 🎓 Następne kroki - Co możesz dodać?

Pomysły na rozszerzenie projektu (świetne do nauki!):

1. **Resetowanie hasła** - email z linkiem do zmiany hasła
2. **Role użytkowników** - admin, user, moderator
3. **Tagi i kategorie** - organizacja elementów
4. **Wyszukiwanie** - filtrowanie po tytule/opisie
5. **Paginacja** - gdy będzie dużo elementów
6. **Avatar użytkownika** - upload zdjęcia profilowego
7. **Export do CSV/JSON** - eksport swoich danych
8. **Ciemny motyw** - przełącznik light/dark mode
9. **Testy jednostkowe** - pytest dla backendu, Jest dla frontendu
10. **CI/CD** - automatyczny deployment na każdy commit

## 📖 Przydatne linki

- [Dokumentacja FastAPI](https://fastapi.tiangolo.com/)
- [Dokumentacja React](https://react.dev/)
- [Dokumentacja SQLAlchemy](https://docs.sqlalchemy.org/)
- [Dokumentacja Docker](https://docs.docker.com/)
- [JWT.io](https://jwt.io/) - debugowanie tokenów JWT
- [Regex101](https://regex101.com/) - testowanie wyrażeń regularnych

## 💬 Potrzebujesz pomocy?

Jeśli coś nie działa:

1. Sprawdź logi: `docker-compose logs`
2. Przeczytaj sekcję "Częste problemy"
3. Sprawdź czy Docker działa: `docker ps`
4. Upewnij się że porty 80, 8000 i 5432 są wolne

## 📄 Licencja

MIT - możesz robić z tym projektem co chcesz!

## 👤 Autor

Dominik Pietrzak

---

**Miłej nauki! 🚀**
