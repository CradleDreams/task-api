import { useEffect, useState } from "react";
import { fetchUsers, IUsersApi } from "../redux/slices/users";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../shared/hook/useTypedSelector";
import { Table, Th } from "./Posts";
import { SearchInput } from "../shared/ui/SearchInput";

function Users() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { usersData } = useTypedSelector((state) => state.users);
  const [users, setUsers] = useState<IUsersApi[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsers(
      usersData.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <>
      <center>
        <h1>Поиск по имени</h1>
        <SearchInput onChange={handleChange}></SearchInput>
      </center>
      <Table>
        <thead>
          <tr>
            <Th scope="col">ID</Th>
            <Th scope="col">Имя</Th>
            <Th scope="col">Никнейм</Th>
            <Th scope="col">Почта</Th>
            <Th scope="col">Телефон</Th>
            <Th scope="col">Сайт</Th>

            <Th scope="col">Название Компании</Th>
            <Th scope="col">Слоган</Th>
            <Th scope="col">БС</Th>

            <Th scope="col">Улица</Th>
            <Th scope="col">Дом</Th>
            <Th scope="col">Город</Th>
            <Th scope="col">Индекс</Th>

            <Th scope="col">Широта</Th>
            <Th scope="col">Долгота</Th>
          </tr>
        </thead>
        <tbody>
          {(users.length ? users : usersData).map((user) => (
            <>
              <tr>
                <Th>{user.id}</Th>
                <Th>{user.name}</Th>
                <Th>{user.username}</Th>
                <Th>{user.email}</Th>
                <Th>{user.phone}</Th>
                <Th>{user.website}</Th>

                <Th>{user.company.name}</Th>
                <Th>{user.company.catchPhrase}</Th>
                <Th>{user.company.bs}</Th>

                <Th>{user.address.street}</Th>
                <Th>{user.address.suite}</Th>
                <Th>{user.address.city}</Th>
                <Th>{user.address.zipcode}</Th>

                <Th>{user.address.geo.lat}</Th>
                <Th>{user.address.geo.lng}</Th>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Users;
