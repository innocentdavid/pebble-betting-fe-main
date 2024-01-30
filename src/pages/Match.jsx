import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import clsx from "clsx";

import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
// import * as anchor from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
// import { useUserSOLBalanceStore } from '../wallet/useUserSOLBalanceStore';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useRouter } from "../hooks/use-router";
import { transferSol } from "../contract/bean";
import LiveChat from "../components/LiveChat/LiveChat";
import { Button } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import axios from "axios";

const MARBLES = [
  {
    icon: "/icons/tokyo-circle.svg",
    name: "Tokyo",
    color: "#EB5757",
    winner: true,
  },
  {
    icon: "/icons/moscow-circle.svg",
    name: "Moscow",
    color: "#D7D7D7",
    winner: false,
  },
  {
    icon: "/icons/cairo-circle.svg",
    name: "Cairo",
    color: "#634CF2",
    winner: false,
  },
  {
    icon: "/icons/newyork-circle.svg",
    name: "NewYork",
    color: "#F2C94C",
    winner: false,
  },
  {
    icon: "/icons/capetown-circle.svg",
    name: "CapeTown",
    color: "#BF2FED",
    winner: false,
  },
  {
    icon: "/icons/riodejaneiro-circle.svg",
    name: "RiodeJaneiro",
    color: "#2F80ED",
    winner: false,
  },
  {
    icon: "/icons/paris-circle.svg",
    name: "Paris",
    color: "#27AE60",
    winner: false,
  },
  {
    icon: "/icons/sydney-circle.svg",
    name: "Sydney",
    color: "#AE6027",
    winner: false,
  },
];

const HEMSTARS = [
  {
    icon: "/icons/hem_red.png",
    name: "Luna",
    color: "#CB031A",
    winner: true,
  },
  {
    icon: "/icons/hem_green.png",
    name: "Oliver",
    color: "#0EE520",
    winner: false,
  },
  {
    // id: 1,
    icon: "/icons/hem_blue.png",
    name: "Peanut",
    color: "#04E6EA",
    winner: false,
  },
  {
    // id: 4,
    icon: "/icons/hem_yellow.png",
    name: "Daisy",
    color: "#F4BF04",
    winner: false,
  },
];

const Match = () => {
  const router = useRouter();
  const { matchId } = useParams();

  // const connection = useConnection();
  const [solValue, setSolValue] = useState(4.2);
  const [walletBalance, setWalletBalance] = useState(6.5);
  const [pebbleNumber, setPebble] = useState(1);
  const [isAdmin, setAdmin] = useState(false);
  const [expectWinner, setWinner] = useState(1);
  const [onBetting, setOnBetting] = useState(false);

  const [isMoscow, onMoscowOrder] = useState(1);
  const [isNewYork, onNewYorkOrder] = useState(1);
  const [isParis, onParisOrder] = useState(1);
  const [isCapeTown, onCapeTownOrder] = useState(1);
  const [isRiodeJaneiro, onRiodeJaneiroOrder] = useState(1);
  const [isSydney, onSydneyOrder] = useState(1);
  const [isCairo, onCairoOrder] = useState(1);
  const [isTokyo, onTokyoOrder] = useState(1);

  const [selectedStat, setSelectedStat] = useState(HEMSTARS[0]);
  const [statDetails, setStatDetails] = useState(null);
  // const channel = "bobbypoffgaming";
  const channel = "";
  const [itemsList, setItemsList] = useState([]);
  const [showRightSideBar, setShowRightSideBar] = useState(true);

  useEffect(() => {
    if (!selectedStat) return;

    const fetch = async () => {
      const url = "";
      try {
        const res = await axios.post(url, {
          name: selectedStat.name,
        });
        if (res) {
          console.log(res.data);
          setStatDetails(res.data);
        }
      } catch (error) {
        console.log(error.message);
        // console.log(error);
        // console.log(error.message);
      }
    };
    fetch();
  }, [selectedStat]);

  useEffect(() => {
    if (matchId === "bet") {
      setItemsList(MARBLES);
      setSelectedStat(MARBLES[0]);
    } else {
      setItemsList(HEMSTARS);
      setSelectedStat(HEMSTARS[0]);
    }
  }, [matchId]);

  useEffect(() => {
    console.log(matchId);
  }, [matchId]);

  const [hasFiltered, setHasFiltered] = useState(false);
  useEffect(() => {
    if (hasFiltered) return;
    const initSetting = async () => {
      const url = `https://coingateapi.com/api/init?query=${matchId}`;
      await fetch(url)
        .then((response) => response.text())
        .then((data) => {
          // Do something with the response data
          // console.log(data);
          const data_t = JSON.parse(data);
          console.log(data_t);
          const bettingFlagKey = `betting_${
            matchId === "harybet" ? "hamster" : "marble"
          }_Flag`;
          const bettingFlag = data_t.msg[bettingFlagKey];
          const last_sequence = data_t.msg.last_betting_result;
          console.log("last_sequence");
          console.log(last_sequence);
          console.log("itemsList");
          console.log(itemsList);
          const sortedArray = last_sequence
            .map((name, index) => ({ name, index }))
            .filter((item) => item?.name !== "") // Remove empty strings
            .sort(
              (a, b) =>
                last_sequence.indexOf(a.name) - last_sequence.indexOf(b.name)
            )
            ?.map((item) => itemsList.find((obj) => obj.name === item?.name));
          if (sortedArray?.[0]?.icon) {
            // console.log("sortedArray");
            // console.log(sortedArray);
            // newList = sortedArray;
            setItemsList(sortedArray);
            setSelectedStat(sortedArray[0])
            setHasFiltered(true);

            // console.log(last_sequence[5]);
            onMoscowOrder(last_sequence[0]);
            onNewYorkOrder(last_sequence[1]);
            onParisOrder(last_sequence[2]);
            onCapeTownOrder(last_sequence[3]);
            onRiodeJaneiroOrder(last_sequence[4]);
            onSydneyOrder(last_sequence[5]);
            onCairoOrder(last_sequence[6]);
            onTokyoOrder(last_sequence[7]);
            setOnBetting(bettingFlag);
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error.message);
        });
    };

    initSetting();
  }, [hasFiltered, itemsList, matchId]);

  const PEBBLE_RACE = 8;
  //   let lamportBalance = 10;
  const SOLANA_HOST = clusterApiUrl("devnet");
  //   const connection = new anchor.web3.Connection(SOLANA_HOST);
  const connection = useMemo(() => new Connection(SOLANA_HOST), [SOLANA_HOST]);
  const wallet = useWallet();
  const admin_wallet = "3dQpUZtmujzzCZdRXyveTdBS2w6ykncdXG5JjtDbHU7f";

  useEffect(() => {
    if (wallet.publicKey == admin_wallet) {
      setAdmin(true);
    }
  }, [wallet]);

  //   const fetchBalance = async () => {
  //     const balance1 = await connection.getBalance(wallet.publicKey);
  //     console.log("balance == " + balance1 / LAMPORTS_PER_SOL);
  //     setWalletBalance(balance1 / LAMPORTS_PER_SOL);
  //   };

  const fetchBalance = useCallback(async () => {
    try {
      const balance1 = await connection.getBalance(wallet.publicKey);
      console.log("balance == " + balance1 / LAMPORTS_PER_SOL);
      setWalletBalance(balance1 / LAMPORTS_PER_SOL);
    } catch (error) {
      // Handle errors appropriately
      console.error("Error fetching balance:", error.message);
    }
  }, [connection, wallet]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const onInputSol = (e) => {
    e.preventDefault();
    setSolValue(e.target.value);
  };

  // const onMoscow = () => {
  //   console.log(pebbleNumber);
  //   setPebble(1);
  // };
  // const onNewYork = () => {
  //   setPebble(2);
  // };
  // const onParis = () => {
  //   setPebble(3);
  // };
  // const onCapTown = () => {
  //   setPebble(4);
  // };
  // const onRioDeJaneiro = () => {
  //   setPebble(5);
  // };
  // const onSydney = () => {
  //   setPebble(6);
  // };
  // const onCario = () => {
  //   setPebble(7);
  // };
  // const onTokyo = () => {
  //   setPebble(8);
  // };

  const onClickPlus = () => {
    let curValue;
    try {
      curValue = parseFloat(solValue);
      if (isNaN(curValue)) curValue = 0;
    } catch (e) {
      curValue = 0;
    }
    if (curValue + 1 > walletBalance) {
      setSolValue(walletBalance);
    } else {
      setSolValue(curValue + 1);
    }
  };

  const onClickMinus = () => {
    let curValue;
    try {
      curValue = parseFloat(solValue);
      if (isNaN(curValue)) curValue = 0;
    } catch (e) {
      curValue = 0;
    }
    if (curValue < 1) {
      setSolValue(curValue);
    } else {
      setSolValue(curValue - 1);
    }
  };

  const onSelectWinner = (e) => {
    e.preventDefault();
    setWinner(e.target.value);
  };

  const onMoscowOrderSet = (e) => {
    e.preventDefault();
    onMoscowOrder(e.target.value);
  };

  const onNewYorkOrderSet = (e) => {
    e.preventDefault();
    onNewYorkOrder(e.target.value);
  };

  const onParisOrderSet = (e) => {
    e.preventDefault();
    onParisOrder(e.target.value);
  };

  const onCapeTownOrderSet = (e) => {
    e.preventDefault();
    onCapeTownOrder(e.target.value);
  };

  const onRiodeJaneiroOrderSet = (e) => {
    e.preventDefault();
    onRiodeJaneiroOrder(e.target.value);
  };

  const onSydneyOrderSet = (e) => {
    e.preventDefault();
    onSydneyOrder(e.target.value);
  };

  const onCairoOrderSet = (e) => {
    e.preventDefault();
    onCairoOrder(e.target.value);
  };

  const onTokyoOrderSet = (e) => {
    e.preventDefault();
    onTokyoOrder(e.target.value);
  };

  const getExpectWinner = () => {
    fetch("https://coingateapi.com/api/expetwinner")
      .then((response) => response.text())
      .then((data) => {
        // Do something with the response data
        console.log(data);
        var data_t = JSON.parse(data);
        if (data_t.status == "success") {
          console.log(data_t.msg);
          setWinner(data_t.msg);
          console.log(expectWinner);
          alert("Expected Winner Number Get!!! "); //, data_t.msg
        } else {
          alert("Invalid Betting Time!!!");
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const onPlaceBet = async () => {
    let ref = admin_wallet;

    let depositSol = parseFloat(solValue);
    let pebbleNum = parseInt(pebbleNumber);

    if (depositSol === null || depositSol < 0.1) {
      alert("Invalid Deposit Value!!!\nMinimum Deposit Value is 0.1 SOL.");
      return;
    }
    console.log(depositSol);

    try {
      // Make a request to the backend endpoint using fetch or axios page=${page}
      fetch(
        `https://coingateapi.com/api/deposit?query=${depositSol}&pebble=${pebbleNum}&bettor=${wallet.publicKey}`
      )
        .then((response) => response.text())
        .then(async (data) => {
          console.log(data);
          var data_t = JSON.parse(data);
          if (data_t.status == "success") {
            let tx = await transferSol(wallet, ref, depositSol);
            console.log(tx);
            alert("Betting Success!!!");
            console.log(data_t.msg);
            setWinner(data_t.msg);
            console.log(expectWinner);
          } else {
            alert("Invalid Betting Time!!!");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
      // refreshPage();
    } catch (err) {
      console.error(err);
      return;
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  function onViewState(pebble_number_detail) {
    fetch(
      `https://coingateapi.com/api/onViewStat?query=${pebble_number_detail}`
    )
      .then((response) => response.text())
      .then((data) => {
        var data_t = JSON.parse(data);
        // alert("Pebble Detail Result: ", data_t); //, data_t.msg
        // Do something with the response data
        console.log("data, data_t");
        console.log(data);
        console.log(data_t);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }

  const bettingEnd = () => {
    setOnBetting(false);

    // Make a request to the backend endpoint using fetch or axios
    fetch("https://coingateapi.com/api/bettingEnd")
      .then((response) => response.text())
      .then((data) => {
        // var data_t = JSON.parse(data)
        alert("Transactions Finished"); //, data_t.msg
        // Do something with the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const bettingStart = () => {
    setOnBetting(true);

    fetch(`https://coingateapi.com/api/bettingStart`)
      .then((response) => response.text())
      .then((data) => {
        // Do something with the response data
        alert("Betting Start!!!");
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
    refreshPage();
  };

  const decideWinner = () => {
    const sequence = [
      isMoscow,
      isNewYork,
      isParis,
      isCapeTown,
      isRiodeJaneiro,
      isSydney,
      isCairo,
      isTokyo,
    ];
    for (let i = 0; i < PEBBLE_RACE - 1; i++) {
      for (let j = 0; j < PEBBLE_RACE; j++) {
        if (sequence[i] == sequence[j]) {
          alert("Invalid Sequence!!!");
          return;
        }
      }
    }
    fetch(
      `https://coingateapi.com/api/decidewinner?query=${expectWinner}&seq=$${sequence}`
    )
      .then((response) => response.text())
      .then((data) => {
        // Do something with the response data
        console.log(data);
        alert("Set Winner/Sequence of marbles Success!!!");
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col w-full dh-full xl:p-10 p-5 lg:p-7 !pb-0 bg-gradient-to-bl from-[#0B021D] to-[#261A32] lg:h-screen">
      <header className="flex justify-between items-center h-[50px]">
        <div
          className="flex flex-row justify-center items-center cursor-pointer bg-[#383838] h-fit md:h-full py-3 md:px-5 px-3 gap-3 rounded-[12px] border-solid border-[1px] border-[#3637AD]"
          onClick={() => router.push("/")}
        >
          <img
            src="/icons/arrow.svg"
            className="w-[12px] md:w-[20px] h-auto"
          ></img>
          <p className="text-white hidden md:inline">Back</p>
        </div>

        <div className="flex flex-row justify-center items-center bg-[#383838] py-2 px-3 gap-3 rounded-[36px] border-solid border-[1px] border-[#3637AD]">
          <img
            src="/images/wait.png"
            className="w-[17px] md:w-[32px] h-auto"
            // style={{ width: "32px", height: "32px" }}
          ></img>
          <p className="text-white text-[10px] md:text-sm">
            Last <span className="text-[#7F7DF9]">7 seconds</span> to place the
            bet
          </p>
        </div>

        <div className="flex flex-row justify-center items-center cursor-pointer bg-[#383838] h-fit md:h-full py-3 md:px-5 px-3 gap-3 rounded-[12px] border-solid border-[1px] border-[#3637AD]">
          <img
            src="/icons/quit.svg"
            className="w-[13px] md:w-[20px] h-auto"
          ></img>
          <p className="text-white  hidden md:inline">Quit Game</p>
        </div>
      </header>

      <section className="flex gap-5 flex-col-reverse lg:flex-row justify-between mt-5 md:h-[calc(100vh-60px)] md:overflow-hidden">
        <div className="absolute top-[100px] right-1 z-[9999]">
          <Button
            className="w-fit h-fit p-3"
            size="sm"
            onClick={() => {
              setShowRightSideBar(!showRightSideBar);
            }}
          >
            {showRightSideBar ? (
              <FaTimes />
            ) : (
              <MdOutlineMarkUnreadChatAlt fill="green" size={18} />
            )}
          </Button>
        </div>

        <aside className="lg:h-[calc(100vh-100px)] overflow-auto remove-scroll pb-4 md:min-w-[330px] w-full lg:max-w-[330px] mx-auto lg:mx-0">
          <div className="flex flex-col p-5 bg-gradient-to-br from-[#52545A] via-[#373C48] to-[#272E3E] rounded-[18px] h-fit">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="text-white text-[32px] p-0">{itemsList.length}</p>
                <p className="text-[#F2F2F2] p-0">
                  {matchId === "bet" ? "Marbles" : "Hemstars"}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-[#F2F2F2]">Next</p>
                <p className="text-[#F2F2F2]">Betting in</p>
                <div className="flex flex-row">
                  <img src="/icons/refresh.svg"></img>
                  <p className="text-white">23:20:19</p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-row items-center justify-center gap-3">
              <div className="h-[1px] bg-white w-16"></div>
              <p className="text-white">
                Last {matchId === "bet" ? "Marble" : "Hemstars"} Stat
              </p>
              <div className="h-[1px] bg-white w-16"></div>
            </div>
            {/* {matchId === "bet" ? (
              <div className="flex flex-col mt-3 gap-3">
                <div className="flex flex-row items-center">
                  <p className="font-bold text-white mr-3">1</p>
                  <img
                    src="/icons/tokyo-circle.svg"
                    style={{ width: "19px", height: "19px" }}
                    className="mr-3"
                  ></img>
                  <p
                    className="rounded-[13px] py-1 bg-[#EB5757] bg-opacity-20 text-[#EB5757] font-bold px-2 mr-3"
                    onClick={() => {
                      onViewState(1);
                      setSelectedStat("Tokyo");
                    }}
                  >
                    Tokyo
                  </p>
                  <img
                    src="/images/cup.png"
                    style={{ width: "18px", height: "18px" }}
                  ></img>
                  <div className="flex-1" />
                  <p
                    className="text-white text-sm underline ml-3 cursor-pointer select-none"
                    onClick={() => {
                      onViewState(1);
                      setSelectedStat("Tokyo");
                    }}
                  >
                    View stats
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p className="font-bold text-white mr-3">2</p>
                  <img
                    src="/icons/moscow-circle.svg"
                    style={{ width: "19px", height: "19px" }}
                    className="mr-3"
                  ></img>
                  <p className="rounded-[13px] py-1 bg-[#D7D7D7] bg-opacity-20 text-[#D7D7D7] font-bold px-2 mr-3">
                    Moscow
                  </p>
                  <div className="flex-1" />
                  <p className="text-white text-sm underline ml-3 cursor-pointer select-none">
                    View stats
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p className="font-bold text-white mr-3">3</p>
                  <img
                    src="/icons/cairo-circle.svg"
                    style={{ width: "19px", height: "19px" }}
                    className="mr-3"
                  ></img>
                  <p className="rounded-[13px] py-1 bg-[#634CF2] bg-opacity-20 text-[#634CF2] font-bold px-2 mr-3">
                    Cairo
                  </p>
                  <div className="flex-1" />
                  <p className="text-white text-sm underline ml-3 cursor-pointer select-none">
                    View stats
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p className="font-bold text-white mr-3">4</p>
                  <img
                    src="/icons/newyork-circle.svg"
                    style={{ width: "19px", height: "19px" }}
                    className="mr-3"
                  ></img>
                  <p className="rounded-[13px] py-1 bg-[#F2C94C] bg-opacity-20 text-[#F2C94C] font-bold px-2 mr-3">
                    New York
                  </p>
                  <div className="flex-1" />
                  <p className="text-white text-sm underline ml-3 cursor-pointer select-none">
                    View stats
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p className="font-bold text-white mr-3">5</p>
                  <img
                    src="/icons/capetown-circle.svg"
                    style={{ width: "19px", height: "19px" }}
                    className="mr-3"
                  ></img>
                  <p className="rounded-[13px] py-1 bg-[#BF2FED] bg-opacity-20 text-[#BF2FED] font-bold px-2 mr-3">
                    Cape Town
                  </p>
                  <div className="flex-1" />
                  <p className="text-white text-sm underline ml-3 cursor-pointer select-none">
                    View stats
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p className="font-bold text-white mr-3">6</p>
                  <img
                    src="/icons/riodejaneiro-circle.svg"
                    style={{ width: "19px", height: "19px" }}
                    className="mr-3"
                  ></img>
                  <p className="rounded-[13px] py-1 bg-[#2F80ED] bg-opacity-20 text-[#2F80ED] font-bold px-2 mr-3">
                    Rio de Janeiro
                  </p>
                  <div className="flex-1" />
                  <p className="text-white text-sm underline ml-3 cursor-pointer select-none">
                    View stats
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p className="font-bold text-white mr-3">7</p>
                  <img
                    src="/icons/paris-circle.svg"
                    style={{ width: "19px", height: "19px" }}
                    className="mr-3"
                  ></img>
                  <p
                    className="rounded-[13px] py-1 bg-[#27AE60] bg-opacity-20 text-[#27AE60] font-bold px-2 mr-3"
                    onClick={() => {
                      onViewState(7);
                      setSelectedStat("Paris");
                    }}
                  >
                    Paris
                  </p>
                  <div className="flex-1" />
                  <p
                    className="text-white text-sm underline ml-3 cursor-pointer select-none"
                    onClick={() => {
                      onViewState(7);
                      setSelectedStat("Paris");
                    }}
                  >
                    View stats
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p className="font-bold text-white mr-3">8</p>
                  <img
                    src="/icons/sydney-circle.svg"
                    style={{ width: "19px", height: "19px" }}
                    className="mr-3"
                  ></img>
                  <p className="rounded-[13px] py-1 bg-[#AE6027] bg-opacity-20 text-[#AE6027] font-bold px-2 mr-3">
                    Sydney
                  </p>
                  <div className="flex-1" />
                  <p className="text-white text-sm underline ml-3 cursor-pointer select-none">
                    View stats
                  </p>
                </div>
              </div>
            ) : (
            )} */}

            <div className="flex flex-col mt-3 gap-3">
              {itemsList.map((item, i) => {
                return (
                  <div
                    key={`hemstars_${i + 1}`}
                    className="flex flex-row items-center"
                  >
                    <p className="font-bold text-white mr-3">{i + 1}</p>
                    <img
                      src={item?.icon}
                      style={{ width: "19px", height: "19px" }}
                      className="mr-3"
                    ></img>
                    <p
                      className={`rounded-[13px] py-1 !bg-opacity-20 font-bold px-2 mr-3 cursor-pointer`}
                      style={{
                        backgroundColor: `${item?.color}50`,
                        color: item?.color,
                      }}
                      onClick={() => {
                        onViewState(i + 1);
                        setSelectedStat(item);
                      }}
                    >
                      {item?.name}
                    </p>

                    {i === 0 && (
                      <img
                        src="/images/cup.png"
                        style={{ width: "18px", height: "18px" }}
                      ></img>
                    )}
                    <div className="flex-1" />

                    <p
                      className={`${
                        selectedStat.name === item?.name
                          ? "text-white"
                          : "text-gray-600"
                      } text-sm underline ml-3 cursor-pointer select-none`}
                      onClick={() => {
                        onViewState(i + 1);
                        setSelectedStat(item);
                      }}
                    >
                      View stats
                    </p>
                  </div>
                );
              })}
            </div>

            {selectedStat && (
              <div className="">
                <div className="mt-10 flex flex-row items-center justify-center gap-3">
                  <div className="h-[1px] bg-white w-16"></div>
                  <p className="text-white">Detailed Stat</p>
                  {/* <p className="text-xs text-red-600">
                    {!statDetails && "failed to fetch details"}
                  </p> */}
                  <div className="h-[1px] bg-white w-16"></div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-6">
                  <img
                    src={selectedStat?.icon}
                    alt=""
                    className="w-[60px] h-auto"
                  />
                  {/* <img
                    src={
                      matchId === "bet"
                        ? "/icons/marble_ball.png"
                        : selectedStat.icon
                    }
                    alt=""
                    className=""
                  /> */}
                  <div
                    className="rounded-[20px] h-[42px] min-w-[75px] px-4 shadow-[0px_0px_9.9px_0px_rgba(0,_0,_0,_0.30)] grid place-items-center text-[21px] font-bold"
                    style={{
                      backgroundColor: `${selectedStat?.color}20`,
                      color: `${selectedStat?.color}`,
                    }}
                  >
                    {selectedStat.name}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <div className="rounded-[2px] bg-[#262626] p-3 flex justify-between items-center">
                    <div className="">
                      <div className="text-[10px]">Total Wins</div>
                      <div className="font-bold text-xs">$20,012.68</div>
                    </div>
                    <img src="/images/graph.png" alt="" />
                  </div>

                  <div className="flex justify-between gap-2">
                    <div className="rounded-[2px] bg-[#262626] p-3 flex justify-between items-center w-full">
                      <div className="">
                        <div className="text-[10px]">Highest bet</div>
                        <div className="font-bold text-xs">$500</div>
                      </div>
                    </div>

                    <div className="rounded-[2px] bg-[#262626] p-3 flex justify-between items-center w-full">
                      <div className="">
                        <div className="text-[10px]">Total Bets</div>
                        <div className="font-bold text-xs">325</div>
                      </div>
                    </div>

                    <div className="rounded-[2px] bg-[#262626] p-3 flex justify-between items-center w-full">
                      <div className="">
                        <div className="text-[10px]">Win Ratio</div>
                        <div className="font-bold text-xs">0.8</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between gap-2">
                    <div className="rounded-[2px] bg-[#262626] p-3 flex justify-between items-center w-full">
                      <div className="">
                        <div className="text-[10px]">Category</div>
                        <div className="font-bold text-xs">$500</div>
                      </div>
                    </div>

                    <div className="rounded-[2px] bg-[#262626] p-3 flex justify-between items-center w-full">
                      <div className="">
                        <div className="text-[10px]">Category</div>
                        <div className="font-bold text-xs">325</div>
                      </div>
                    </div>

                    <div className="rounded-[2px] bg-[#262626] p-3 flex justify-between items-center w-full">
                      <div className="">
                        <div className="text-[10px]">Category</div>
                        <div className="font-bold text-xs">0.8</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        <div className="flex flex-col xl:flex-row gap-5 lg:h-[calc(100vh-100px)] w-full pb-4 overflow-auto remove-scroll">
          <main className="flex flex-col w-full">
            <ReactTwitchEmbedVideo
              layout="video"
              theme="dark"
              width={"100%"}
              height={520}
              channel={channel}
            />

            {/* <img src="/images/video.png" className="h-[528px] w-[766px]"></img> */}
            <div className="rounded-[12px] bg-gradient-to-br from-[#52545A] via-[#373C48] to-[#272E3E] mt-5 md:px-6 px-3 py-3 flex flex-col justify-between w-full">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col md:w-1/2">
                  <p className="text-white">Choose your marble to bet</p>
                  {/* {matchId === "bet" ? (
                    <div className="mt-2">
                      <button
                        id="moscow"
                        onClick={onMoscow}
                        className={clsx(
                          "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b  from-[#4EAF90]",
                          pebbleNumber === 1 ? "to-[#B2D5B2]" : " bg-black"
                        )}
                      >
                        Moscow
                      </button>
                      <button
                        id="newyork"
                        onClick={onNewYork}
                        className={clsx(
                          "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90]",
                          pebbleNumber === 2 ? " to-[#B2D5B2]" : "bg-black"
                        )}
                      >
                        New York
                      </button>
                      <button
                        id="paris"
                        onClick={onParis}
                        className={clsx(
                          "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90]",
                          pebbleNumber === 3 ? " to-[#B2D5B2]" : "bg-black"
                        )}
                      >
                        Paris
                      </button>
                      <button
                        id="captown"
                        onClick={onCapTown}
                        className={clsx(
                          "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90]",
                          pebbleNumber === 4 ? " to-[#B2D5B2]" : "bg-black"
                        )}
                      >
                        Cape Town
                      </button>
                      <button
                        id="riodejaneiro"
                        onClick={onRioDeJaneiro}
                        className={clsx(
                          "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90]",
                          pebbleNumber === 5 ? " to-[#B2D5B2]" : "bg-black"
                        )}
                      >
                        Rio de Janeiro
                      </button>
                      <button
                        id="sydney"
                        onClick={onSydney}
                        className={clsx(
                          "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90]",
                          pebbleNumber === 6 ? " to-[#B2D5B2]" : "bg-black"
                        )}
                      >
                        Sydney
                      </button>
                      <button
                        id="cario"
                        onClick={onCario}
                        className={clsx(
                          "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90]",
                          pebbleNumber === 7 ? " to-[#B2D5B2]" : "bg-black"
                        )}
                      >
                        Cairo
                      </button>
                      <button
                        id="tokyo"
                        onClick={onTokyo}
                        className={clsx(
                          "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90]",
                          pebbleNumber === 8 ? " to-[#B2D5B2]" : "bg-black"
                        )}
                      >
                        Tokyo
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2">
                      {HEMSTARS.map((item, i) => {
                        return (
                          <button
                            key={`choose_hemstar-${i + 1}`}
                            id={item?.name}
                            onClick={() => {
                              setPebble(i + 1);
                            }}
                            className={clsx(
                              "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b  from-[#4EAF90]",
                              pebbleNumber === i + 1
                                ? "to-[#B2D5B2]"
                                : " bg-black"
                            )}
                          >
                            {item?.name}
                          </button>
                        );
                      })}
                    </div>
                  )} */}
                  {itemsList.map((item, i) => {
                    return (
                      <button
                        key={`choose_hemstar-${i + 1}`}
                        id={item?.name}
                        onClick={() => {
                          setPebble(i + 1);
                        }}
                        className={clsx(
                          "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b  from-[#4EAF90]",
                          pebbleNumber === i + 1 ? "to-[#B2D5B2]" : " bg-black"
                        )}
                      >
                        {item?.name}
                      </button>
                    );
                  })}
                </div>

                <div className="w-[2px] bg-[#A2A1E5] ml-2 mr-4 my-5"></div>

                <div className="flex flex-col md:w-1/2">
                  <p className="text-white">Enter your bet</p>
                  <div className="flex justify-between flex-row my-2">
                    <div className="flex flex-row justify-center gap-2 items-center sol-input">
                      <div className="rounded-full bg-black p-1 h-fit">
                        <img
                          src="/images/solana.png"
                          className="min-w-[24px] w-[24px] h-auto"
                          //   style={{ width: "24px", height: "24px" }}
                        ></img>
                      </div>
                      <input
                        className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent md:w-16 w-14 text-center"
                        value={solValue}
                        onChange={onInputSol}
                      ></input>
                      <p className="font-bold text-md text-white">sol</p>
                    </div>

                    <div className="bg-white rounded-[16px] flex flex-row p-3 gap-3">
                      <img
                        onClick={onClickPlus}
                        className="cursor-pointer min-w-[24px]"
                        src="/images/ic_round-plus.png"
                        style={{ width: "24px", height: "24px" }}
                      ></img>
                      <img
                        onClick={onClickMinus}
                        className="cursor-pointer min-w-[24px]"
                        src="/images/ph_minus-bold.svg"
                        style={{ width: "24px", height: "24px" }}
                      ></img>
                    </div>
                  </div>

                  <div className="flex justify-between flex-row mt-2 items-center flex-wrap gap-2">
                    <div className="flex items-center">
                      <img
                        src="/images/ion_wallet.png"
                        style={{ width: "24px", height: "24px" }}
                      ></img>
                      <div className="flex flex-col mx-2 text-xs">
                        <p className="text-white">Your balance</p>
                        <p className="text-white">Wallet</p>
                      </div>
                    </div>

                    <div className="bg-black rounded-[16px] flex flex-row p-3 gap-1 items-center">
                      <img
                        src="/images/solana.png"
                        style={{ width: "36px", height: "20px" }}
                      ></img>
                      <p className="font-bold text-white">
                        {/* 3.4331214344 */}
                        {walletBalance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={onPlaceBet}
                className="flex justify-center items-center my-7"
              >
                <div className="flex flex-row bg-white rounded-[12px] justify-center items-center py-3 px-7 cursor-pointer">
                  <img
                    src="/icons/check.svg"
                    style={{ width: "22px", height: "22px" }}
                  ></img>
                  <p className="text-[#7F7DF9] ml-3 font-bold">Place Bet</p>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="bg-[#A2A1E5] h-[1px] mx-10 mb-3"></div>
                <p className="text-[#DCDCFD] text-sm">
                  *Lorem ipsum dolor sit amet consectetur. Purus scelerisque
                  habitasse eu scelerisque faucibus proin odio odio.{" "}
                </p>
                <p className="text-[#DCDCFD] text-sm">
                  Porttitor turpis orci consequat ipsum. Et molestie nunc odio
                  amet nisl. Non adipiscing consequat ipsum ipsum.{" "}
                </p>
                <p className="text-[#DCDCFD] text-sm">
                  mauris iaculis euismod. Lorem ipsum dolor sit amet
                  consectetur. *Lorem ipsum dolor sit amet sit amet consec
                </p>
                <p className="text-[#DCDCFD] text-sm">
                  scelerisque habitasse eu scelerisque faucibus proin odio.
                  Porttitor turpis orci consequat ipsum faucibus fauci
                </p>
                <p className="text-[#DCDCFD] text-sm">
                  odio amet nisl. Non adipiscing fermentum arcu varius mauris
                  iaculis euismod. Lorem ipsum dolor dolor dolor{" "}
                </p>
              </div>
            </div>
            <br />
          </main>

          {showRightSideBar && (
            <aside className="xl:min-w-[329px] xl:max-w-[329px]">
              {isAdmin === true ? (
                <div className="flex flex-col ml-5">
                  <button
                    disabled={!onBetting ? false : true}
                    onClick={bettingStart}
                    className={clsx(
                      "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90]",
                      !onBetting ? "to-[#B2D5B2]" : "bg-black"
                    )}
                  >
                    Start
                  </button>
                  <button
                    disabled={!onBetting}
                    onClick={bettingEnd}
                    className={clsx(
                      "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90]",
                      onBetting ? "to-[#B2D5B2]" : "bg-black"
                    )}
                  >
                    End
                  </button>
                  <button
                    disabled={!onBetting}
                    onClick={getExpectWinner}
                    className={clsx(
                      "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90] ",
                      onBetting ? "to-[#B2D5B2]" : "bg-black"
                    )}
                  >
                    Expect Winner
                  </button>
                  <input
                    className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent w-16 text-center"
                    value={expectWinner}
                    onChange={onSelectWinner}
                  ></input>
                  <button
                    disabled={!onBetting}
                    onClick={decideWinner}
                    className={clsx(
                      "mr-2 mb-2 font-bold rounded-[12px] px-2 py-1 text-white bg-gradient-to-b from-[#4EAF90] ",
                      onBetting ? "to-[#B2D5B2]" : "bg-black"
                    )}
                  >
                    Decide Winner
                  </button>
                  <p className="text-white">Moscow</p>
                  <input
                    className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent w-16 text-center"
                    value={isMoscow}
                    onChange={onMoscowOrderSet}
                  ></input>
                  <p className="text-white">New York</p>
                  <input
                    className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent w-16 text-center"
                    value={isNewYork}
                    onChange={onNewYorkOrderSet}
                  ></input>
                  <p className="text-white">Paris</p>
                  <input
                    className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent w-16 text-center"
                    value={isParis}
                    onChange={onParisOrderSet}
                  ></input>
                  <p className="text-white">Cape Town</p>
                  <input
                    className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent w-16 text-center"
                    value={isCapeTown}
                    onChange={onCapeTownOrderSet}
                  ></input>
                  <p className="text-white">Rio de Janeiro</p>
                  <input
                    className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent w-16 text-center"
                    value={isRiodeJaneiro}
                    onChange={onRiodeJaneiroOrderSet}
                  ></input>
                  <p className="text-white">Sydney</p>
                  <input
                    className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent w-16 text-center"
                    value={isSydney}
                    onChange={onSydneyOrderSet}
                  ></input>
                  <p className="text-white">Cairo</p>
                  <input
                    className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent w-16 text-center"
                    value={isCairo}
                    onChange={onCairoOrderSet}
                  ></input>
                  <p className="text-white">Tokyo</p>
                  <input
                    className="py-1 px-2 text-white font-bold text-2xl bg-transparent active:bg-transparent w-16 text-center"
                    value={isTokyo}
                    onChange={onTokyoOrderSet}
                  ></input>
                </div>
              ) : (
                <LiveChat />
              )}
            </aside>
          )}
        </div>
      </section>
    </div>
  );
};

export default Match;
