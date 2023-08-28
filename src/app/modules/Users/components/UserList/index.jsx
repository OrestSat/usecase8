import React from 'react';
import { useSelector } from 'react-redux';

// own
import { userColumns } from './const';
import styles from './UserList.module.css';

const UserList = () => {
  const users = useSelector(state => state.users);

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>
          <tr>
            {userColumns.map(column => (
              <th key={column.key} >{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={`${user.firstName}-${index}`}>
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
