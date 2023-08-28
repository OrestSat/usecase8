import React from 'react';

//own 
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import styles from './Users.module.css';

const Users = () => {
  return (
    <div className={styles.root}>
      <UserForm />
      <UserList />
    </div>
  );
}

export default Users;
