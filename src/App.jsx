import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, get, set } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import Hero from "./components/hero/Hero";
import { MdLocationPin } from "react-icons/md";
import { FaChevronRight, FaPhone } from "react-icons/fa6";
import FullScreenLoader from "./components/loader/loader";
import { FaCalendarAlt, FaInstagram } from "react-icons/fa";
import { IoCallOutline, IoLocation } from "react-icons/io5";
import { PiArrowDownRightBold } from "react-icons/pi";
import ParticlesBackground from "./ParticlesBackground";
import { BsCreditCardFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

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
  const cardSectionRef = useRef(null)


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

  // useEffect(() => {
  //   const studentsRef = ref(database, "Users")

  //   get(studentsRef).then((snapshot) => {
  //     const data = snapshot.val()
  //     const students = Object.values(data || []).map((student) => {
  //       const studentref = ref(database, `Users/${student.name}/image`)

  //       set(studentref, "")
  //     })
  //   })
  // }, [])

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
          <navbar className={'navbar p-5 mt-3 w-11/12 m-auto flex items-center justify-between border-[3px] border-[#F7F7F7] rounded-2xl'}>
            <div>
              <h2 className="text-[#FBA406] font-bold text-2xl monospace flex gap-2 items-center tracking-wider">
                PRO
                <span className="text-[#000]">TEACH</span>
              </h2>
            </div>
            <ul className='flex items-center gap-6 greyText '>
              <li>
                <a className='text-xl hover:text-[#000] transition-all' href="#">Bosh sahifa</a>
              </li>
              <li>
                <a className='text-xl hover:text-[#000] transition-all' href="#natija">Natijalar</a>
              </li>
              <li>
                <a className='text-xl hover:text-[#000] transition-all' href="#">Kurslar</a>
              </li>
            </ul>
            <div className='flex items-center justify-center gap-[12px]'>
              <a href="https://www.instagram.com/proteachuz/" target="_blank" className="w-[35px] h-[35px] border border-solid rounded-full flex justify-center items-center cursor-pointer border-gray-400">
                <FaInstagram className="w-[18px] h-[18px]" />
              </a>
              <a href="tel:+998917382266" className="w-[35px] h-[35px] border border-solid rounded-full flex justify-center items-center cursor-pointer border-gray-400">
                <IoCallOutline className="w-[18px] h-[18px]" />
              </a>
            </div>
          </navbar>

          <div className="container">
            <div className='hero'>
              <h4 className='text-lg border border-solid px-8 py-3 rounded-full border-gray-500'>Zamonaviy kasblarni professionallardan o’rganing</h4>
              <h1 className='hero-text montserrat'>Nazariy emas, amaliy natija- <br />O‘quvchilarimiz allaqachon <br /> <span className='text-[#FBA406] font-semibold text-shadow'><i>daromadga</i> </span> chiqqan!</h1>
              <p className='hero-info poppins'>O‘quvchilarimiz oyiga o’rtacha 300$+ daromad qilishmoqda!</p>
              <a href="#natija">
                <button className='button-hero'>Natijalarni ko‘rish <PiArrowDownRightBold className='hero-icon' /></button>
              </a>
            </div>
          </div>


          <div className="flex flex-col w-full px-[60px] pt-10 pb-[80px] relative">
            <h1 id="natija" className="z-20 text-center pb-[50px] text-3xl font-medium text-[#000000] max-sm:mb-[0px] mb-[100px] krona">-BITIRUVCHILAR-</h1>
            <ParticlesBackground />
            {
              GetArray.length > 0 ? (
                GetArray.sort((a, b) => a.id - b.id)
                  .map((item, index) => (
                    console.log(item),
                    <div
                      ref={cardSectionRef}
                      key={index}
                      className={`flex flex-col sm:flex-row w-[600px] max-sm:mt-10 sm:h-[520px] sm:w-[620px] shadow-lg rounded-xl bg-white p-3 gap-3 z-20 ${index % 2 === 0 ? "self-start" : "self-end"} -mt-[50px] hover:-translate-y-3 transition-all`}
                      style={{
                        border: "2px solid #E5E5E5",
                      }}
                    >
                      <img
                        className="w-full max-w-[280px] sm:w-[320px] sm:h-[450px] object-cover rounded-[12px]"
                        src={item.image}
                        alt="User"
                      />
                      <div className="flex flex-col items-center justify-between w-full max-w-[280px] monospace">
                        <div className="flex flex-col items-start justify-start gap-7">
                          {/* Ism */}
                          <h1 className="text-3xl font-semibold tracking-wide">
                            {item.name}
                          </h1>

                          {/* Yosh va Kasb */}
                          <div className="flex gap-1 items-center text-xl font-[600] tracking-wide">
                            <span>{item.age} yosh</span>
                            <span>|</span>
                            <span>{item.job}</span>
                          </div>

                          {/* Ish joyi */}
                          <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
                            <span className="flex items-center gap-2 text-xl font-[600] whitespace-nowrap">
                              <IoLocation />
                              Ish joyi:
                            </span>
                            <span className="text-xl font-[400] tracking-wide break-words">
                              {item.workplace}
                            </span>
                          </div>

                          {/* Daromad */}
                          <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
                            <span className="flex items-center gap-2 text-xl font-[600] whitespace-nowrap">
                              <BsCreditCardFill />
                              Daromadi:
                            </span>
                            <span className="text-xl font-[400] tracking-wide break-words">
                              {item.price}
                            </span>
                          </div>

                          {/* Kirdi */}
                          <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
                            <span className="flex items-center gap-2 text-xl font-[600] whitespace-nowrap">
                              <i className="fa-solid fa-arrows-down-to-people text-base"></i>
                              Kirdi:
                            </span>
                            <span className="text-xl font-[400] tracking-wide break-words">
                              {item.eddedData}
                            </span>
                          </div>

                          {/* Ma'lumot sanasi */}
                          <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
                            <span className="flex items-center gap-2 text-xl font-[600] whitespace-nowrap">
                              <FaCalendarAlt />
                              Ma'lumot sanasi:
                            </span>
                            <span className="text-xl font-[400] tracking-wide break-words">
                              {item.Dateofemployment}
                            </span>
                          </div>
                        </div>

                        {/* Bog‘lanish tugmasi */}
                        <a
                          href="tel:+998916994104"
                          className="w-[190px] h-[40px] text-[13px] font-normal leading-[32px] rounded-[24px] bg-[#FFC865] font-['Krona_One'] flex items-center justify-center gap-2 mt-6 mx-auto cursor-pointer krona"
                        >
                          Bog’lanish{" "}
                          <PiArrowDownRightBold className="w-5 h-5 bg-white p-[2px] text-[12px] rounded-full" />
                        </a>
                      </div>
                    </div>
                  ))
              ) : (
                <h1>Ma'lumot yuklanmoqda!</h1>
              )
            }
          </div>

          <footer className="w-full h-[350px] bg-[#1C1525] px-[150px] py-[50px] flex justify-start items-start gap-[40px] montserrat">
            <div className="flex flex-col items-start justify-start gap-5 text-[#DFDFDF] w-[300px]">
              <h3 className="text-[30px] text-white ">
                Biz haqimizda
              </h3>
              <p className="leading-[28px] text-[17px] font-normal">
                "Pro Teach" o'quv markazi <a href="https://it-park.uz/" target="_blank" className="text-[#7EBA27]">IT Park</a> ga qarashli markaz bo'lib, 2021-yildan beri o'z mijozlariga sifatli ta'lim xizmatlari ko'rsatib kelmoqda.
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-5 text-[#DFDFDF] w-[300px]">
              <h3 className="text-[30px] text-white ">
                Xizmatlar
              </h3>
              <div className="flex flex-col gap-7 justify-start items-start">
                <h3 className="flex gap-2 items-center hover:text-[#1057bd] cursor-pointer transition-all">
                  <FaChevronRight size={15} />
                  <span className="text-[17px] font-normal">Web dasturlash</span>
                </h3>
                <h3 className="flex gap-2 items-center hover:text-[#1057bd] cursor-pointer transition-all">
                  <FaChevronRight size={15} />
                  <span className="text-[17px] font-normal">Grafik dizayn</span>
                </h3>
                <h3 className="flex gap-2 items-center hover:text-[#1057bd] cursor-pointer transition-all">
                  <FaChevronRight size={15} />
                  <span className="text-[17px] font-normal">Kompyuter savodxonlik</span>
                </h3>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-5 text-[#DFDFDF] w-[250px]">
              <h3 className="text-[30px] text-white ">
                Kontakt
              </h3>
              <div className="flex flex-col gap-7 justify-start items-start">
                <a href="https://maps.google.com/maps?q=40.535083,70.925986&ll=40.535083,70.925986&z=16" target="_blank" className="flex gap-2 items-start hover:text-[#1057bd] cursor-pointer transition-all leading-[28px]">
                  <MdLocationPin size={25} />
                  Farg'ona Qo'qon shahar Istiqlol ko'chasi
                </a>
                <h3 className="flex gap-2 items-center hover:text-[#1057bd] cursor-pointer transition-all">
                  <FaPhone size={20} />
                  <span className="text-[17px] font-normal">+998 91 699 41 04</span>
                </h3>
                <h3 className="flex gap-2 items-center hover:text-[#1057bd] cursor-pointer transition-all">
                  <HiOutlineMail size={20} />
                  <span className="text-[17px] font-normal">info@proteach.com</span>
                </h3>
                <a href="https://www.instagram.com/proteachuz/" target="_blank" className="flex gap-2 items-center hover:text-[#1057bd] cursor-pointer transition-all">
                  <FaInstagram size={20} />
                  <span className="text-[17px] font-normal">proteachuz</span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default App;