import React from 'react';
import { useSelector } from 'react-redux';

// own
import { userColumns } from './const';
import styles from './UserList.module.css';

const UserList = () => {
  const users = useSelector(state => state.users);

  return (
    <div className={styles.root} data-testid='user-list'>
      <table className={styles.table}>
        <thead>
          <tr data-testid='header-row'>
            {userColumns.map(column => (
              <th key={column.key} >{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={`${user.firstName}-${user.lastName}-${user.email}`} data-testid='data-row' >
              {userColumns.map(column => (
                <td key={column.key}>{user[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
