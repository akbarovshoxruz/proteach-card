import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/Hero";
import { CiLocationOn } from "react-icons/ci";
import { MdMonetizationOn } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import FullScreenLoader from "./components/loader/loader";

const firebaseConfig = {
  apiKey: "AIzaSyCmB2bXTAyxXVEvumcTE97RpYKMKu94LBA",
  authDomain: "proteach-card.firebaseapp.com",
  databaseURL: "https://proteach-card-default-rtdb.firebaseio.com",
  projectId: "proteach-card",
  storageBucket: "proteach-card.firebasestorage.app",
  messagingSenderId: "848976516816",
  appId: "1:848976516816:web:3088b2817e732a57bff0d5",
  measurementId: "G-LWNLCB13Q6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const App = () => {
  const [GetArray, setGetArray] = useState([]);
  const [Loader, setLoader] = useState(true)
  const cardSectionRef = useRef(null)
  const cardSectionRefLink = useRef(null)


  useEffect(() => {
    const ArrayRef = ref(database, "Users");

    onValue(ArrayRef, (snapshot) => {
      const data = snapshot.val();
      setGetArray(Object.values(data || {}));
    });
  }, []);

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoader(false);
    }, 10800); // 2 soniya kutish

  }, []);


  return (
    <>
      {
        Loader ? <FullScreenLoader /> : ""
      }
      <div>
        <Navbar />
        <Hero scrollToRef={cardSectionRef} />
        <h1 id="natija" className="text-center pt-20 text-3xl font-semibold text-[#000000]">-BITIRUVCHILAR-</h1>

        <div className="flex flex-col w-full items-center px-4 py-5 pt-10">
          {
            GetArray.length > 0 ? (
              GetArray.sort((a, b) => a.id - b.id)
                .map((item, index) => (
                  <div
                    key={index}
                    className={`w-full sm:w-[620px] ${index % 2 === 0 ? "self-start" : "self-end"} mb-10 `}
                  >
                    <div ref={cardSectionRef} className="flex flex-col sm:flex-row w-full max-w-[550px] sm:w-[620px] border border-[#E8E8E8] rounded-[12px] p-3 gap-3">
                      <img
                        className="w-full max-w-[280px] sm:w-[320px] h-[280px] sm:h-[450px] object-cover rounded-[12px]"
                        src={item.image}
                        alt="User"
                      />
                      <div className="flex flex-col text-center justify-between w-full max-w-[280px]">
                        <div className="flex flex-col gap-1 sm:h-[360px] h-auto mt-3 sm:mt-0 px-2">
                          <h2 className="text-2xl font-semibold capitalize">{item.name}</h2>

                          <span className="flex gap-2 justify-center text-[16px] pt-[10px]">
                            <h3><i>{item.age} yosh</i></h3> /
                            <h3><i>{item.job}</i></h3>
                          </span>

                          <p className="text-center sm:text-left break-words whitespace-pre-line text-[#717070]">
                            {item.discription}
                          </p>

                          <div className="mt-4 space-y-2 text-left sm:text-left sm:px-0 px-4">
                            <div className="flex items-center gap-2">
                              <FaLocationDot  className="text-[20px]"/>
                              <h1 className="text-[16px] font-normal">
                                Ish Joyi: <span className="font-bold">{item.workplace}</span>
                              </h1>
                            </div>
                            <div className="flex items-center gap-2">
                              <MdMonetizationOn   className="text-[20px]"/>
                              <h1>
                                Daromadi: <span className="font-bold">{item.price}</span>
                              </h1>
                            </div>
                            <div className="flex items-center gap-2">
                              <TbTargetArrow   className="text-[18px]"/>
                              <h1>
                                Ishga kirdi: <span className="font-bold">{item.eddedData}</span>
                              </h1>
                            </div>
                          </div>
                        </div>

                        <button className="w-[190px] h-[40px] text-[13px] font-normal leading-[32px] rounded-[24px] bg-[#FFC865] font-['Krona_One'] flex items-center justify-center gap-2 mt-6 mx-auto cursor-pointer">
                          Bog’lanish <FaArrowUp className="w-[20px] h-[20px] bg-white p-[3px] text-[12px] rounded-full" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <h1>Ma'lumot yuklanmoqda!</h1>
            )
          }
        </div>
      </div>
    </>
  );
};

export default App;
