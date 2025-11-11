import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Componente de cuenta atrás
function Countdown({ title, releaseDate, color }) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!releaseDate) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = new Date(releaseDate) - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [releaseDate]);

  // 🎮 Si tiene fecha (PlayStation / Xbox)
  if (releaseDate) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-black/40 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col items-center justify-center text-center border"
        style={{ borderColor: color }}
      >
        {/* CountDown arriba */}
        <div className="grid grid-cols-4 gap-4 text-center mb-6">
          <div>
            <p className="text-5xl font-bold">{timeLeft.days}</p>
            <p className="uppercase text-gray-300 text-sm">Days</p>
          </div>
          <div>
            <p className="text-5xl font-bold">{timeLeft.hours}</p>
            <p className="uppercase text-gray-300 text-sm">Hours</p>
          </div>
          <div>
            <p className="text-5xl font-bold">{timeLeft.minutes}</p>
            <p className="uppercase text-gray-300 text-sm">Min</p>
          </div>
          <div>
            <p className="text-5xl font-bold">{timeLeft.seconds}</p>
            <p className="uppercase text-gray-300 text-sm">Sec</p>
          </div>
        </div>

        {/* Título debajo */}
        <h2
          className="text-3xl font-bold mt-2 drop-shadow-[0_0_15px]"
          style={{ color }}
        >
          {title}
        </h2>
      </motion.div>
    );
  }

  // 🎲 Si no tiene fecha (misteriosa)
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black/40 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col items-center justify-center text-center border"
      style={{ borderColor: color }}
    >
      {/* Caja misteriosa */}
      <div className="relative w-28 h-28 mb-4">
        <div
          className="absolute inset-0 rounded-lg animate-pulse"
          style={{
            background: `radial-gradient(circle, ${color}99, rgba(0,0,0,0.8))`,
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold text-white drop-shadow-[0_0_10px_#fff]">
          ?
        </div>
      </div>

      {/* Título */}
      <h2
        className="text-2xl font-bold drop-shadow-[0_0_10px]"
        style={{ color }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-900 to-fuchsia-900 text-white font-sans relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,128,0.15),rgba(0,0,0,0.9))] animate-pulse"></div>

      <div className="z-10 text-center">
        {/* Título principal */}
        <h1
          className="text-6xl md:text-7xl font-extrabold mb-12 drop-shadow-[0_0_25px_#ff69b4] animate-pulse"
          style={{
            fontFamily: "'Pricedown', 'Orbitron', sans-serif",
            color: "#ff66cc",
          }}
        >
          GTA VI 
        </h1>

        {/* Cajas alineadas horizontalmente */}
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          <Countdown
            title="🎮 PS5"
            releaseDate="2026-11-19T00:00:00"
            color="#0077FF"
          />
          <Countdown
            title="💻 PC"
            releaseDate={null}
            color="#AAAAAA"
          />
          <Countdown
            title="🕹️ Switch 2"
            releaseDate={null}
            color="#FF2B2B"
          />
        </div>

        <p className="mt-12 text-gray-300 text-lg italic">
           The wait is almost over...
        </p>
      </div>
    </div>
  );
}



