import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchPosts, IPostsApi } from "../redux/slices/posts";
import { useTypedSelector } from "../shared/hook/useTypedSelector";
import { fetchUsers } from "../redux/slices/users";
import styled from "styled-components";
import { SearchInput } from "../shared/ui/SearchInput";

export const Table = styled.table`
  border-spacing: 0;
`;
export const Th = styled.th`
  border: 1px solid lightblue;
`;

function Posts() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { postsData } = useTypedSelector((state) => state.posts);
  const { usersData } = useTypedSelector((state) => state.users);

  const replaceUsername = (userId: number) => {
    const user = usersData.find(({ id }) => userId === id);
    return user ? user.name : "";
  };
  const [posts, setPosts] = useState<IPostsApi[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosts(
      postsData.filter((post) =>
        replaceUsername(post.userId)
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
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
            <Th>ID</Th>
            <Th>Имя пользоваля</Th>
            <Th>Заголовок</Th>
            <Th>Текст</Th>
          </tr>
        </thead>
        <tbody>
          {(posts.length ? posts : postsData).map((post) => (
            <tr>
              <Th>{post.id}</Th>
              <Th>{replaceUsername(post.userId)}</Th>
              <Th>{post.title}</Th>
              <Th>{post.body}</Th>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Posts;
