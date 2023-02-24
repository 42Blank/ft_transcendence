export const Cancle2FA = () => {
  function handleClickCancleButton() {
    alert('hi');
  }

  return (
    <div>
      <button type="button" onClick={handleClickCancleButton}>
        <span>cancle 2FA button</span>
      </button>
    </div>
  );
};
