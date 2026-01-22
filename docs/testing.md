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
 * Skriv `example@domain.com` i `Email`, `Example` i `Name`, `Ex01` i `Username`, och `letmein0987` i `Password`.
 * Klicka på `Sign up` knappen längst ner i formuläret.

#### Förväntat
 * Omdirigerad till `<root>/auth/login`.

### TC1.2 Försök skapa ett konto med en e-postadress som redan används

#### Förutsättningar
 * Det bör inte finnas en `todos.sqlite` fil i `/server/src/var/db`, radera filen om den finns.
 * Kör `npm run test:setup:signup` i `/server`.

#### Test steg
 * Starta appen
 * Gå till `<root>/auth/signup`.
 * Ett formulär visas.
 * Skriv `duplicate@domain.com` i `Email`, `John` i `Name`, `john2` i `Username`, och `1234Not0987` i `Password`.
 * Klicka på `Sign up` knappen längst ner i formuläret.

#### Förväntat
 * Ett felmeddelande om att e-postadressen var ogiltig visas.
 * Formuläret visas fortfarande.

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
