import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleImagesChanges = event => {
    this.setState({ value: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      Notify.failure('Введите запрос снова');
      return;
    }
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="searchForm-button">
            <span className="searchForm-button-label"> Search</span>
          </button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleImagesChanges}
          />
        </form>
      </header>
    );
  }
}

export { Searchbar };
