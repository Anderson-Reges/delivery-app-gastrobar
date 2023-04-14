import React, { useEffect, useState } from 'react';
import api from '../../utils/fetch';
import styles from './styles.module.scss';

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    await api('GET', 'user')
      .then((info) => {
        setUsers(info.data);
        setLoading(false);
      });
  };

  const deleteUser = async (id) => {
    await api('DELETE', `user/${id}`)
      .then(() => {
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => getUsers(), [users]);

  return (
    <div className={ styles.tableContainer }>
      <table>
        <thead>
          <tr>
            <th id={ styles.item }>Item</th>
            <th id={ styles.name }>Nome</th>
            <th id={ styles.email }>E-mail</th>
            <th id={ styles.role }>Tipo</th>
            <th id={ styles.removeUser }>Excluir</th>
          </tr>
        </thead>
        {loading ? (<h2>Carregando...</h2>)
          : (
            users.map((user) => (
              <tbody key={ user.id }>
                <tr>
                  <td id={ styles.userId }>
                    { user.id }
                  </td>
                  <td id={ styles.userName }>
                    { user.name }
                  </td>
                  <td id={ styles.userEmail }>
                    { user.email }
                  </td>
                  <td id={ styles.userRole }>
                    { user.role }
                  </td>
                  <td id={ styles.removeUserButton }>
                    <button
                      type="button"
                      onClick={ () => deleteUser(user.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          )}
      </table>
    </div>
  );
}
