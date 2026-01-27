# Testing

## Run Tests

```bash
npm run test # runs all tests

npm run test:only # runs specific tests

# example:
npm run test:only ToDoRepository
```

## Manuell testning

### TC1.1 Skapa ett konto

Förutsättning: Det bör inte finnas en `todos.sqlite` fil i `server/src/var/db`, radera filen om den finns.

#### Test steg
 * Starta appen
 * Gå till `<root>/home`.
 * Klicka på `Sign up`.
 * Ett formulär visas.
 * Skriv `john.example@domain.com` i `Email`, `John` i `Name`, `john01` i `Username`, och `letmein0987` i `Password`.
 * Klicka på `Sign up` knappen längst ner i formuläret.

#### Förväntat
 * Omdirigerad till `<root>/auth/login`.

### TC1.2 Försök skapa ett konto med en e-postadress som redan används

#### Förutsättningar
 * Det finns en registrerad användare med e-postadressen `duplicate@domain.com` och användarnamnet `foo1`. Kör `npm run test:setup:signup` i `/server` om användaren inte finns.
 * Användaren är inte inloggad.

#### Test steg
 * Starta appen
 * Gå till `<root>/auth/signup`.
 * Ett formulär visas.
 * Skriv `duplicate@domain.com` i `Email`, `Jane` i `Name`, `jane2` i `Username`, och `1234Not0987` i `Password`.
 * Klicka på `Sign up` knappen längst ner i formuläret.

#### Förväntat
 * Ett felmeddelande om att e-postadressen var ogiltig visas.
 * Formuläret visas fortfarande.

### TC1.3 Försök skapa ett konto med ett användarnamn som redan används

#### Förutsättningar
 * Det finns en registrerad användare med användarnamnet `foo1`.
 * Användaren är inte inloggad.

#### Test steg
 * Starta appen
 * Gå till `<root>/auth/signup`.
 * Ett formulär visas.
 * Skriv `foo.example@domain.com` i `Email`, `Jane` i `Name`, `foo1` i `Username`, och `1234Not0987` i `Password`.
 * Klicka på `Sign up` knappen längst ner i formuläret.

#### Förväntat
 * Ett felmeddelande om att användarnamnet var ogiltigt visas.
 * Formuläret visas fortfarande.

### TC2.1 Logga in en användare

Förutsättning: TC1.1 är genomfört.

#### Test steg
 * Starta appen
 * Gå till `<root>/home`.
 * Klicka på `Sign in`.
 * Ett formulär visas.
 * Skriv `john01` i `Username`, och `letmein0987` i `Password`.
 * Klicka på `Sign in` knappen längst ner i formuläret.

#### Förväntat
 * Omdirigerad till `<root>`. Ett formulär för att skapa todos visas.

### TC?.1 Delete ToDo

#### Test steps

 * Start the app
 * Login
 * Create a todo
 * Click the `Edit` button of the todo
 * Redirected to the update page
 * Click the `Delete` button
 * Confirm deletion of todo by clicking the `Delete` button on the dialog box

### TC10.1 Try to access ToDo list when not logged in

#### Test steps
 * Start the app
 * Go to the root of the web application.

#### Expected
 * Redirected to `<root>/home`.

### TC10.2 Try to access login page when logged in

 #### Test steps
 * Start the app
 * Log in.
 * Go to `<root>/auth/login`.

#### Expected
 * `Forbidden` page is shown with HTTP status code 403.

 ### TC10.3 Try to access sign up page when logged in

 #### Test steps
 * Start the app
 * Log in.
 * Go to `<root>/auth/signup`.

#### Expected
 * `Forbidden` page is shown with HTTP status code 403.
