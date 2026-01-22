import { auth } from '../src/utils/auth.js'

setupDuplicateAccount()

/**
 * Insert a new user.
 */
async function setupDuplicateAccount () {
  try {
    const data = await auth.api.signUpEmail({
      body: {
        email: 'duplicate@domain.com',
        name: 'Foo',
        password: 'superSecret1234',
        username: 'foo1',
        displayUsername: 'foo1'
      }
    })
    if (!data.user.id) {
      throw new Error('Could not insert user.')
    }
    console.log(`Inserted user with id ${data.user.id}`)
  } catch (err) {
    console.error(err)
  }
}
