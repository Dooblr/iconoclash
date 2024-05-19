import { useState, useEffect } from 'react';
import { IconType } from 'react-icons';

interface ProjectileProps {
  id: number;
  x: number;
  y: number;
  rotation: number;
  vx: number;
  vy: number;
  icon: IconType;
  size: string;
}

const Projectile: React.FC<ProjectileProps> = ({ id, x, y, rotation, vx, vy, icon: Icon, size }) => {
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const move = () => {
      setPosition((prev) => ({
        x: prev.x + vx,
        y: prev.y + vy,
      }));
    };

    const interval = setInterval(move, 50);

    return () => clearInterval(interval);
  }, [vx, vy]);

  return (
    <div
      className="projectile"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg)`,
        width: size,
        height: size,
      }}
    >
      <Icon className="projectile-icon" />
    </div>
  );
};

export default Projectile;
