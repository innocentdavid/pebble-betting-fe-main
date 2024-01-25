// import axios from "axios";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io.connect(
  "https://fuzzy-robot-j479479wx74hp9-3000.app.github.dev"
);
const username = "dev_cent";
const room = "main";

export default function LiveChat() {
  const [screen, setScreen] = useState("chat");
  const [message, setMessage] = useState("");
  const [messagesRecieved, setMessagesReceived] = useState([
    {
      message: ``,
      username: "",
      __createdtime__: new Date(),
    },
  ]);
  const messagesColumnRef = useRef(null);

  // setup
  useEffect(() => {
    socket.emit("join_room", { username, room });

    // const ping = async () => {
    //   try {
    //     const res = await axios.post(
    //       "https://fuzzy-robot-j479479wx74hp9-3000.app.github.dev",
    //       {}
    //     );
    //     console.log("res");
    //     console.log(res);
    //   } catch (error) {
    //     console.log("error");
    //     console.log(error);
    //   }
    // };

    // ping();
  }, []);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log("data");
      // console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // last_100_messages
  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on("last_100_messages", (last100Messages) => {
      console.log("Last 100 messages:", JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off("last_100_messages");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // function formatDateFromTimestamp(timestamp) {
  //   const date = new Date(timestamp);
  //   return date.toLocaleString();
  // }

  const handleSubmit = async () => {
    console.log("submitted");
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };
  if (screen === "chat") {
    return (
      <>
        <div className="bg-gradient-to-br from-[#52545A] via-[#373C48] to-[#272E3E] rounded-[12px] py-[calc(65px+20px)] px-4 xl:min-w-[329px] xl:max-w-[329px] w-full relative min-h-[calc(100vh-110px)]">
          <div className="h-[65px] flex items-center justify-between absolute top-0 left-0 w-full z-10 px-4">
            <h1 className="text-[20px] font-[500] select-none">Live Chat</h1>
            <div className="flex items-center gap-2 select-none">
              <div
                className="w-[52px] h-[45px] rounded-[12px] bg-[#29213c] grid place-items-center cursor-pointer"
                onClick={() => setScreen("ranking")}
              >
                <img
                  src={"/icons/ranking.svg"}
                  className="min-w-[28px] min-h-[24px]"
                />
              </div>
              <div
                className="w-[52px] h-[45px] rounded-[12px] grid place-items-center bg-primary-gradient cursor-pointer"
                onClick={() => setScreen("chat")}
              >
                <img
                  src={"/icons/fluent_chat-16-filled.svg"}
                  className="min-w-[27.75px] h-[22px]"
                />
              </div>
            </div>
          </div>

          <div
            id="body"
            ref={messagesColumnRef}
            className="flex flex-col gap-3 max-h-[310px] overflow-auto remove-scroll"
          >
            {messagesRecieved.map((message, i) => {
              // console.log("message");
              // console.log(message);

              if (message?.username) {
                return (
                  <div
                    key={`message_${i}`}
                    className="bg-[#0c031f] rounded-[6px] py-2 px-2"
                  >
                    <span className="font-bold">@{message.username}:</span>{" "}
                    {message.message}
                  </div>
                );
              }
            })}
          </div>

          <form
            className="absolute bottom-0 left-0 w-full z-10 px-4 pb-[16px] pt-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex items-center gap-2 h-[46px] bg-[#0c031f] w-full rounded-[6px] p-[5px]">
              <input
                className="w-full bg-transparent outline-none pl-2"
                placeholder="Type something..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button
                type="submit"
                className="w-[39.69px] h-[36px] rounded-[12px] bg-[#23183a] grid place-items-center cursor-pointer"
              >
                <img
                  src={"/icons/send_btn.svg"}
                  className="min-w-[15.67px] min-h-[15.67px]"
                />
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-gradient-to-br from-[#52545A] via-[#373C48] to-[#272E3E] rounded-[12px] pt-[calc(65px+20px)] px-4 1170:min-w-[329px] 1170:max-w-[329px] relative min-h-[calc(100vh-110px)]">
          <div className="h-[65px] flex items-center justify-between absolute top-0 left-0 w-full z-10 px-4">
            <h1 className="text-[20px] font-[500] select-none">Recent</h1>
            <div className="flex items-center gap-2 select-none">
              <div
                className="w-[52px] h-[45px] rounded-[12px] bg-primary-gradient grid place-items-center cursor-pointer"
                onClick={() => setScreen("ranking")}
              >
                <img
                  src={"/icons/ranking.svg"}
                  className="min-w-[28px] min-h-[24px]"
                />
              </div>
              <div
                className="w-[52px] h-[45px] rounded-[12px] grid place-items-center bg-[#29213c] cursor-pointer"
                onClick={() => setScreen("chat")}
              >
                <img
                  src={"/icons/fluent_chat-16-filled.svg"}
                  className="min-w-[27.75px] h-[22px]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 max-h-[370px] overflow-auto remove-scroll">
            <div className="bg-[#0c031f] rounded-[6px] py-2 px-2 flex items-center justify-between">
              <div className="">HWEO<sub className="text-lg">***</sub></div>
              <div className="">23854</div>
            </div>
            <div className="bg-[#0c031f] rounded-[6px] py-2 px-2 flex items-center justify-between">
              <div className="">HWEO<sub className="text-lg">***</sub></div>
              <div className="">23854</div>
            </div>
            <div className="bg-[#0c031f] rounded-[6px] py-2 px-2 flex items-center justify-between">
              <div className="">HWEO<sub className="text-lg">***</sub></div>
              <div className="">23854</div>
            </div>
            <div className="bg-[#0c031f] rounded-[6px] py-2 px-2 flex items-center justify-between">
              <div className="">HWEO<sub className="text-lg">***</sub></div>
              <div className="">23854</div>
            </div>
            <div className="bg-[#0c031f] rounded-[6px] py-2 px-2 flex items-center justify-between">
              <div className="">HWEO<sub className="text-lg">***</sub></div>
              <div className="">23854</div>
            </div>
            <div className="bg-[#0c031f] rounded-[6px] py-2 px-2 flex items-center justify-between">
              <div className="">HWEO<sub className="text-lg">***</sub></div>
              <div className="">23854</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
