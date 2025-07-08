import React, { useEffect, useState } from 'react';

const FullScreenLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100); // tezligi

    return () => clearInterval(interval);
  }, []);

  const radius = 100;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={styles.backdrop}>
      <svg height={radius * 2 + 20} width={radius * 2 + 20}>
        <circle
          stroke="#eee"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius + 10}
          cy={radius + 10}
        />
        <circle
          stroke="orange"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
          r={normalizedRadius}
          cx={radius + 10}
          cy={radius + 10}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="40px"
          fontWeight="bold"
          fill="orange"
        >
          {progress}%
        </text>
      </svg>
      <p style={styles.text}>Yuklanmoqda...</p>
    </div>
  );
};

const styles = {
  backdrop: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  text: {
    marginTop: 20,
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    color: '#000',
  },
};

export default FullScreenLoader;