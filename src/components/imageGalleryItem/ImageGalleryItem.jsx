import { fetchPictures } from 'components/service/service';
import { Component } from 'react';
import { PacmanLoader } from 'react-spinners';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class ImageGalleryItem extends Component {
  state = {
    items: [],
    totalHits: null,
    // page: 1,
    error: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.props.searchQuery.trim();
    const currentPage = this.props.currentPage;
    console.log('currentPage:', currentPage);

    if (prevProps.searchQuery !== searchQuery) {
      try {
        // this.setState({ page: 1 });
        this.setState({ loading: true });
        const { pictures, totalHitsPictures } = await fetchPictures(
          searchQuery,
          prevProps.currentPage
        );
        if (!totalHitsPictures) {
          return Notify.warning(
            'Nothing finding of your request. Please try again'
          );
        }
        this.setState({ items: pictures, totalHits: totalHitsPictures });
        // this.setState({ page: this.state.page + 1 });
        this.props.getTotalHits(totalHitsPictures);
      } catch {
        this.setState({
          error:
            'Ups, somethings goes wrong, use search field. Please retry one more.',
        });
      } finally {
        this.setState({ loading: false });
      }
    }

    if (prevProps.currentPage !== currentPage) {
      try {
        this.setState({ loading: true });
        if (prevProps.searchQuery !== searchQuery) {
          return;
        } else {
          const { pictures } = await fetchPictures(searchQuery, currentPage);
          this.setState(prevState => ({
            items: [...prevState.items, ...pictures],
          }));
        }

        // if (prevProps.searchQuery !== searchQuery) {
        //   // currentPage = 1;
        //   // this.setState({ page: this.state.page + 1 });
        // } else {
        //   // this.setState({ page: 1 });
        // }
      } catch {
        this.setState({
          error:
            'Ups, somethings goes wrong, use search field. Please retry one more.',
        });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const items = this.state.items;
    console.log('items:', items);

    const error = this.state.error;

    const loading = this.state.loading;

    return (
      error && <div>{error}</div>,
      (<PacmanLoader color="#ffee00" loading={loading} />),
      items &&
        items.map(({ id, webformatURL }) => (
          <li key={id} className="imageGalleryItem">
            <img className="imageGalleryItem-image" src={webformatURL} alt="" />
          </li>
        ))
    );
  }
}

export { ImageGalleryItem };
