import React from 'react';
import Header from '../components/Header';

class PageProfile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Page-profile</h1>
      </div>
    );
  }
}

export default PageProfile;
