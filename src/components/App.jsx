import React, { Component } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { fetchImage } from './apiService/Api';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { LoadMoreBtn } from './buttonLoadMore/Button';
import { Loader } from './reactLoader/Loader';
import { Modal } from './Modal/Modal';
import { Container } from './App.styled';
import { ErrorData } from './error/errorData/ErrorData';
import { errorMassage } from './error/errorMessage';

export class App extends Component {
  state = {
    images: null,
    pageNum: 2,
    search: '',
    isLoading: false,
    showModal: false,
    modalImg: null,
    btnVision: true,
    error: null,
    isLoadingSpinner: false,
  };

  acceptSearch = async search => {
    if (this.state.search === search || search === '') {
      return;
    }

    try {
      this.setState({ images: null });
      this.setState({ isLoading: true });
      this.setState({ search: search });
      this.setState({ pageNum: 2 });
      this.setState({ btnVision: true });

      const response = await fetchImage(search);
      this.setState({ images: response.hits });

      if (response.total === 0) {
        this.setState({ error: errorMassage(search) });
      }
    } catch {
      this.setState({ error: ErrorData() });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onClickPageUp = async () => {
    try {
      this.setState({ isLoadingSpinner: true });
      const { pageNum, search } = this.state;
      this.setState(prevState => {
        return { pageNum: prevState.pageNum + 1 };
      });
      const response = await fetchImage(search, pageNum);

      const nextPictures = response.hits;
      if (nextPictures.length < 1) {
        this.setState({ btnVision: false });
        Report.info(
          "That's all",
          "We're sorry, but you've reached the end of search results.",
          'Okay'
        );
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...nextPictures],
      }));
    } catch {
      this.setState({ error: ErrorData() });
    } finally {
      this.setState({ isLoading: false });
      this.setState({ isLoadingSpinner: false });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  updateModalPicture = img => {
    this.setState({ modalImg: img });
  };

  render() {
    const {
      images,
      isLoading,
      showModal,
      modalImg,
      error,
      btnVision,
      isLoadingSpinner,
    } = this.state;

    return (
      <>
        <Container>
          <Searchbar onSubmit={this.acceptSearch} />
          {isLoading && <Loader />}

          {error && error}

          {images && (
            <ImageGallery
              images={images}
              onClick={this.toggleModal}
              onUpdateModalPicture={this.updateModalPicture}
            />
          )}
          {images && images.length > 11 && btnVision && (
            <>
              <LoadMoreBtn
                onLoadMore={this.onClickPageUp}
                isLoadingSpin={isLoadingSpinner}
              />
            </>
          )}

          {showModal && (
            <Modal onClose={this.toggleModal} onGiveImg={modalImg} />
          )}
        </Container>
      </>
    );
  }
}
