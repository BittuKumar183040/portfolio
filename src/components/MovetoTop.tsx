import { useEffect, useState } from 'react'
import onTop from '../assets/onTop.gif'
const MovetoTop = () => {
    const [showOnTop, setShowOnTop] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) {
                setShowOnTop(true);
            } else {
                setShowOnTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    },[])
    return (
        <div 
            className={`h-12 w-22 fixed right-8 bottom-8 filter invert-0 mix-blend-darken z-50 cursor-pointer transition-all duration-300 ease-in-out
                ${showOnTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <img className="h-full w-full rounded-full " src={onTop} alt="up-arrow" />
        </div>
  )
}

export default MovetoTop