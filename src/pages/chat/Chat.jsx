import { useEffect, useState } from 'react';
import UsersList from './UsersList';
import CurrentChat from './CurrentChat';
import { useSelector } from 'react-redux';

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const users = useSelector((state) => state.main?.allUsers);
  const loggedInUser = useSelector((state) => state?.main);

  useEffect(() => {
    if (users && users?.length !== 0 && loggedInUser?.userRole?.id) {
      let list = users?.filter((user) => user?.id !== loggedInUser?.userRole?.id);
      setUsersList(list);
    }
  }, [users]);

  return (
    <>
      <div className="d-flex max-w-100 h_100 flex rounded-2">
        <UsersList users={usersList} currentChat={selectedChat} setCurrentChat={setSelectedChat} />

        <CurrentChat currentUser={selectedChat} />
      </div>
    </>
  );
}
