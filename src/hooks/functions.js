export const handleCheckAuth = () => {
  const token = handleGetUserToken();
  if (!token) {
    return false;
  }

  return true;
};

export const handleGetUserToken = () => {
  if (localStorage.getItem('tokenId')) {
    return localStorage.getItem('tokenId');
  } else {
    return null;
  }
};
