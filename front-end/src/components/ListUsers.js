import React, { useEffect, useState } from 'react';
import api from '../utils/fetch';

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
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        {loading ? (<h2>Carregando...</h2>)
          : (
            users.map((user, index) => (
              <tbody key={ user.id }>
                <tr>
                  <td
                    data-testid={
                      `admin_manage__element-user-table-item-number-${index}`
                    }
                  >
                    { user.id }
                  </td>
                  <td
                    data-testid={
                      `admin_manage__element-user-table-name-${index}`
                    }
                  >
                    { user.name }
                  </td>
                  <td
                    data-testid={ `admin_manage__element-user-table-email-${index}` }
                  >
                    { user.email }
                  </td>
                  <td
                    data-testid={ `admin_manage__element-user-table-role-${index}` }
                  >
                    { user.role }
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid={ `admin_manage__element-user-table-remove-${index}` }
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
