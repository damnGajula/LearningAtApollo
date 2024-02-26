# User List Component Documentation

Documentation for the `UserList` component, which is responsible for fetching and displaying a list of users from an API endpoint.

## Component Functionality

The `UserList` component performs the following tasks:

1. **State Management**: Manages the state of the user data using the `useState` hook. The `users` state variable holds an array of user objects.

2. **Data Fetching**: Utilizes the `useEffect` hook to perform a side effect, which is fetching the user data from the API when the component mounts. The `fetchUsers` function, used for a GET request to the API endpoint (`https://reqres.in/api/users?page=1&per_page=6`). If successful, it updates the `users` state with the response data.

3. **Pagination**: `page` and `totalPages` manage the current page number and the total number of pages, respectively. Pagination buttons ("Previous" and "Next") were configured to be disabled in certain scenarios:
- The "Previous" button is disabled when the current page is the first page (page number <= 1).
- The "Next" button is disabled when the current page is the last page (page number >= total number of pages).

```jsx
      <div>
        <button onClick={handlePreviousClick} disabled={page <= 1}>Previous</button>
        <button onClick={handleNextClick} disabled={page >= totalPages}>Next</button>
      </div>
```

## Changes Made

### Cause of Api calling twice

As part of React Strict Mode, certain lifecycle functions will be ran twice, such as functions passed to useState, useMemo, or useReducer, or the whole body of a functional component, which might include your useEffect hook. This is done by intentionally double-invoking the following functions:

`Class component constructor, render, and shouldComponentUpdate methods Class component static getDerivedStateFromProps method Function component bodies State updater functions (the first argument to setState) Functions passed to useState, useMemo, or useReducer`

### Caching Solution

caching mechanism to store previously fetched user data and avoid repeating API calls when navigating between pages. Data is being stored in the `usersCache` object with the page number as the key.
The `handlePreviousClick` and `handleNextClick` functions check if the requested page data is already cached. If cached data exists, it is used directly without making an additional API call, improving performance and reducing network overhead.


### Solution: Introducing Loading State

A loading state flag (`loading`) was introduced using the `useState` hook to indicate when an API call is in progress.

```jsx
const [loading, setLoading] = useState(true);
```

```jsx
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://reqres.in/api/users?page=1&per_page=6');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users: ', error);
      } finally {
        setLoading(false);
      }
    };
```
### Update Pagination

Updated get response
```jsx
        const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=6`);
```