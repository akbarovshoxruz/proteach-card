import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/Hero";
import { MdMonetizationOn } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import FullScreenLoader from "./components/loader/loader";
import { FaInstagram } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { PiArrowDownRightBold } from "react-icons/pi";
import ParticlesBackground from "./ParticlesBackground";

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

  const [progress, setProgress] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(database, 'Users'); // <- shu yerga to‘g‘ri path yozing

    setProgress(20); // boshlanishda progress 20%

    onValue(dataRef, (snapshot) => {
      setProgress(60); // ma’lumot kelayotganida

      const val = snapshot.val();

      if (val) {
        setProgress(100); // ma’lumot muvaffaqiyatli keldi
        setData(Object.entries(val));
        setTimeout(() => setDataLoaded(true), 300); // animatsiya chiqsin
      } else {
        setProgress(100); // bo‘sh bo‘lsa ham, yuklangan
        setTimeout(() => setDataLoaded(true), 300);
      }
    }, {
      onlyOnce: true // faqat bir marta o‘qilsin
    });
  }, []);

  if (!dataLoaded) return <FullScreenLoader progress={progress} />;


  return (
    <html className="scroll-smooth">
      <head></head>
      <body>
        <div>
          <navbar className={'navbar w-full max-w-[1480px] m-auto flex items-center justify-between pt-[30px]'}>
            <div>
              <img src="/Frame.png" alt="" />
            </div>
            <ul className='flex items-center gap-[20px] text-[#717070] '>
              <li>
                <a className='text-xl hover:text-[#000]' href="#">Bosh sahifa</a>
              </li>
              <li>
                <a className='text-xl hover:text-[#000]' href="#natija">Natijalar</a>
              </li>
              <li>
                <a className='text-xl hover:text-[#000]' href="#">Kurslar</a>
              </li>
            </ul>
            <div className='flex items-center justify-center gap-[12px]'>
              <span className='w-[40px] h-[40px] circle'>
                <FaInstagram />
              </span>
              <span className='w-[40px] h-[40px] circle'>
                <IoCallOutline />
              </span>
            </div>
          </navbar>

          <div className='hero w-full max-w-[1500px] m-auto text-center mt-[50px]'>
            <h4 className='hero-title'>Zamonaviy kasblarni professionallardan o’rganing</h4>
            <h1 className='hero-text'>Nazariy emas, amaliy natija- <br />O‘quvchilarimiz allaqachon <br /> <span className='text-[#FBA406]'><i>daromadga</i> </span> chiqqan!</h1>
            <p className='hero-info'>O‘quvchilarimiz oyiga o’rtacha 300$+ daromad qilishmoqda!</p>
            <button className='button-hero'><a href="#natija">Natijalarni ko‘rish </a><PiArrowDownRightBold className='hero-icon' /></button>
          </div>


          <div className="flex flex-col w-full items-center px-4 py-5 pt-10 relative">
            <h1 id="natija" className="z-20 text-center pt-20 text-3xl font-semibold text-[#000000]">-BITIRUVCHILAR-</h1>
            <ParticlesBackground />
            {
              GetArray.length > 0 ? (
                GetArray.sort((a, b) => a.id - b.id)
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`w-full sm:w-[620px] ${index % 2 === 0 ? "self-start ml-[40px]" : "self-end"} mb-10 z-20`}
                    >
                      <div ref={cardSectionRef} className="flex flex-col sm:flex-row w-full max-w-[550px] h-[520px] sm:w-[620px] border border-[#E8E8E8] rounded-[12px] p-3 gap-3">
                        <img
                          className="w-full max-w-[280px] sm:w-[320px]sm:h-[450px] object-cover rounded-[12px]"
                          src={item.image}
                          alt="User"
                        />
                        <div className="flex flex-col text-center justify-between w-full max-w-[280px]">
                          <div className="flex flex-col gap-1 sm:h-[360px] h-auto mt-3 sm:mt-0 px-2">
                            <h2 className="text-2xl mt-6 font-semibold capitalize">{item.name}</h2>

                            <span className="flex gap-2 justify-center text-[17px] pt-[16px]">
                              <h3 className=""><i>{item.age} yosh</i></h3> /
                              <h3><i>{item.job}</i></h3>
                            </span>

                            <p className="text-center sm:text-left break-words whitespace-pre-line text-[#717070]">
                              {item.discription}
                            </p>

                            <div className="mt-4 space-y-2 text-left sm:text-left sm:px-0 px-4">
                              <div className="flex items-center gap-2">
                                <FaLocationDot className="text-[20px] flex self-start" />
                                <h1 className="text-[16px] font-bold leading-5">
                                  Ish Joyi: <span className="font-normal">{item.workplace}</span>
                                </h1>
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <MdMonetizationOn className="text-[20px]  flex self-start" />
                                <h1 className="font-bold">
                                  Daromadi: <span className="font-normal">{item.price}</span>
                                </h1>
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <TbTargetArrow className="text-[18px]  flex self-start" />
                                <h1 className="font-bold">
                                  Ishga kirdi: <span className="font-normal">{item.eddedData}</span>
                                </h1>
                              </div>
                              <div className="flex items-start gap-2 pt-2">
                                <HiMiniCalendarDateRange className="text-[26px]  flex self-start" />
                                <h1 className="text-[16px] font-bold  leading-6">
                                  Ma'lumot olingan sana: <span className="font-normal">{item.Dateofemployment}</span>
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
      </body>
    </html>
  );
};

export default App;