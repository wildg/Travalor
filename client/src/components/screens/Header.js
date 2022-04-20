import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

function Header() {
  // Get the user value from the context
  const { user } = useContext(UserContext);

  // Create the account link depending if a user has logged in
  let accountLink = user === null ? '/login' : '/user';

  return (
    <header>
      <a href="/">
        <img src="/icons/logo.png" alt="Travalor" />
      </a>
      <a href={accountLink} className="account-link">
        <img src="/icons/AccountIcon.png" alt="Account" />
      </a>
    </header>
  );
}

export default Header;
