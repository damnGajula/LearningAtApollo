import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const tableHeaders = ["ID", "Email", "First Name", "Last Name", "Avatar"];
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const totalPagesRef = useRef(1);
  const usersCache = useRef({});


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        if (usersCache.current[page]) {
          setUsers(usersCache.current[page]);
        } else {
          const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=6`);
          const fetchedUsers = response.data.data;
          usersCache.current[page] = fetchedUsers;
          setUsers(fetchedUsers);
          totalPagesRef.current = response.data.total_pages;
        }
      } catch (error) {
        console.error('Error fetching users: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPagesRef.current) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (loading) {
      return <div>Loading...</div>;
  }



  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
            <tr>
                {tableHeaders.map(item => (
                <th>{item}</th>
                ))}
            </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td><img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousClick} disabled={page <= 1}>Previous</button>
        <button onClick={handleNextClick} disabled={page >= totalPagesRef.current}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
