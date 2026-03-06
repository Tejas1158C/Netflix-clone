import React from "react";
import "./Notifications.css";

const Notifications = ({ notifications, onMarkAllRead, onMarkRead }) => {
    return (
        <div className="notifications-panel">
            <div className="notifications-header">
                <h4>Notifications</h4>
                {notifications.some(n => n.unread) && (
                    <button className="mark-all-read" onClick={onMarkAllRead}>
                        Mark all as read
                    </button>
                )}
            </div>

            <div className="notifications-list">
                {notifications.length > 0 ? (
                    notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`notification-item ${notif.unread ? "unread" : ""}`}
                            onClick={() => onMarkRead(notif.id)}
                        >
                            {notif.image && (
                                <div className="notif-image-container">
                                    <img src={notif.image} alt="" className="notif-image" />
                                </div>
                            )}
                            <div className="notif-content">
                                <p className="notif-message">{notif.message}</p>
                                <span className="notif-time">{notif.time}</span>
                            </div>
                            {notif.unread && <span className="unread-dot"></span>}
                        </div>
                    ))
                ) : (
                    <div className="no-notifications">No new notifications</div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
