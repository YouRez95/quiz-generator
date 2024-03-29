import React, { useContext } from "react";
import { UserContext } from "../store/user-context";
import { deleteNotification } from "../api/index";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function DashboardNotifications() {
  const { notifications, token, setNotifications } = useContext(UserContext);

  async function handleClearNotification(notificationId) {
    const response = await deleteNotification(notificationId, token);
    if (response.ok) {
      setNotifications((prev) =>
        prev.filter((noti) => noti._id !== notificationId)
      );
    }
  }

  return (
    <div className="pt-20 grid gap-10">
      <h1 className="text-dark font-secondary text-xl font-bold">
        Dashboard Notifications
      </h1>
      <div className="mx-6">
        {notifications.length === 0 && <p>No notification yet...</p>}
        {notifications.length > 0 &&
          notifications.map((notification, index) => (
            <div
              key={notification.quizName + index}
              className={`flex items-center justify-between  bg-white p-3 border-b ${
                index !== notifications.length - 1
                  ? "border-dark-3"
                  : "border-white"
              }`}
            >
              <div className="flex gap-4 items-center">
                <div className="size-[3rem]">
                  <img
                    src={`${BASE_URL}/avatars/${notification.userAvatar}.png`}
                    alt=""
                  />
                </div>
                <p>
                  {notification.action === "like" && (
                    <>
                      <span className="font-bold text-medium font-secondary">
                        {notification.username}{" "}
                      </span>
                      liked your quiz{" "}
                      <span className="font-bold text-medium font-secondary">
                        {notification.quizName}
                      </span>
                    </>
                  )}
                  {notification.action === "Comment" && (
                    <>
                      <span className="font-bold text-medium font-secondary">
                        {notification.username}{" "}
                      </span>
                      commented your quiz{" "}
                      <span className="font-bold text-medium font-secondary">
                        {notification.quizName}
                      </span>
                      <span className="block border-[.5px]  px-2 py-1 rounded-full">
                        says:{" "}
                        <span className="font-bold ml-2 font-secondary">
                          {notification.text}
                        </span>
                      </span>
                    </>
                  )}
                </p>
              </div>

              <button
                className="bg-dark px-3 py-1 text-light font-secondary"
                onClick={() => handleClearNotification(notification._id)}
              >
                Clear
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

// action
// :
// "Comment"
// quizName
// :
// "Operations ✖️➕➖✖️➕"
// text
// :
// "great"
// userAvatar
// :
// "avatar11"
