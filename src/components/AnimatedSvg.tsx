import { useState } from 'react';
import MySvg from '../assets/me.svg'; // Import as default React component

const AnimatedSvg: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  return (
    <div>
      <button
        onClick={() => setAnimate(!animate)}
        className="btn btn-primary"
      >
        Animate SVG
      </button>
      <MySvg />
    </div>
  );
};

export default AnimatedSvg;
