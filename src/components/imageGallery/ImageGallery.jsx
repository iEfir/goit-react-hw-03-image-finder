import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ searchQuery, getTotalHits, currentPage, basePage }) => {
  return (
    <ul className="imageGallery">
      <ImageGalleryItem
        searchQuery={searchQuery}
        getTotalHits={getTotalHits}
        currentPage={currentPage}
      />
    </ul>
  );
};

export { ImageGallery };
