const ButtonLoadMore = ({ onClickIncrementPage }) => {
  return (
    <button
      className="buttonLoadMore"
      onClick={onClickIncrementPage}
      type="button"
    >
      Load more
    </button>
  );
};

export { ButtonLoadMore };
