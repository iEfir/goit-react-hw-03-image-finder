import { Component } from 'react';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { ButtonLoadMore } from './buttonLoadMore/ButtonLoadMore';

export class App extends Component {
  state = {
    value: '',
    totalHits: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.setState({ page: 1 });
    }
  }

  handleFormSubmit = value => {
    this.setState({ value });
  };

  handleTotalHits = totalHits => {
    this.setState({ totalHits });
  };

  handleIncrementPage = () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
    }));
  };

  render() {
    const value = this.state.value.toLowerCase();
    const totalHits = this.state.totalHits;
    console.log('totalHits:', totalHits);
    const page = this.state.page;
    console.log('page:', page);

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchQuery={value}
          getTotalHits={this.handleTotalHits}
          currentPage={page}
        />
        {totalHits > 11 && (
          <ButtonLoadMore onClickIncrementPage={this.handleIncrementPage} />
        )}
      </div>
    );
  }
}
