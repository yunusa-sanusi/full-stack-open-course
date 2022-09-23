const Notification = (props) => {
  const { notificationMessage, notificationStyle } = props;

  return (
    <div className={`notification-container ${notificationStyle}`}>
      <p>{notificationMessage}</p>
    </div>
  );
};

export default Notification;
