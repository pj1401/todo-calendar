# Testing

## Run Tests

```bash
npm run test # runs all tests

npm run test:only # runs specific tests

# example:
npm run test:only ToDoRepository
```

## Manual Testing

### TC?.1 Delete ToDo

#### Test steps

 * Start the app
 * Login
 * Create a todo
 * Click the `Edit` button of the todo
 * Redirected to the update page
 * Click the `Delete` button
 * Confirm deletion of todo by clicking the `Delete` button on the dialog box

### TC?.? Try to access ToDo list when not logged in

#### Test steps
 * Start the app
 * Go to `http://localhost:<PORT>`.

#### Expected
 * Redirected to `http://localhost:<PORT>/home`.

### TC?.? 
